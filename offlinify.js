const path = require('path')
const fs = require('fs')

const distPath = path.resolve('docs', '.vuepress', 'dist')
const assetsPath = path.resolve(distPath, 'assets')
const stylesPath = path.resolve(assetsPath, 'css')
const scriptsPath = path.resolve(assetsPath, 'js')

const processData = (filePath, process) => {
  const data = fs.readFileSync(filePath, 'utf8')
  const processesdData = process(data)

  fs.writeFileSync(filePath, processesdData, { encoding: 'utf8' })
}

const offlinifyPage = fileName => {
  processData(path.resolve(distPath, fileName), data => {
    // data = data.replace(/(href)="\/"/g, '$1="./index.html"')
    data = data.replace(/(href)="\/(#[^"]*)"/g, '$1="$2"')
    data = data.replace(/(href|src)="(\/[^"]*)"/g, '$1=".$2"')

    return data
  })

  console.log(`Page offlinified: ${fileName}`)
}

const offlinifyStyle = fileName => {
  processData(path.resolve(stylesPath, fileName), data => {
    return data.replace(/url\((\/assets\/[^)]*)\)/g, 'url(../..$1)')
  })

  console.log(`Style offlinified: ${fileName}`)
}

const offlinifyAppScript = fileName => {
  processData(path.resolve(scriptsPath, fileName), data => {
    // Used for scripts path
    data = data.replace(/(\Wa\.p)="\/"(\W)/g, '$1=window.location.href.replace(/\\/[^\\/]*$$/, "/")$2')
    // Initial page path
    data = data.replace(/(\We)=decodeURI\(window\.location\.pathname\)(\W)/g, '$1=decodeURI(window.location.href.replace(/^.*?(\\/[^\\/]*)$$/,"$$1"))$2')
    // Relative href for links overrided by vue router
    data = data.replace(/(\Wc)=(o\.href)(\W)/g, '$1=($2.startsWith("/")?"."+$2:$2)$3')
    // Absolute path for vue router navigation
    data = data.replace(/(function Ki\(t,e\){)/g, '$1t=window.location.href.replace(/\\/[^\\/]*$$/,"")+t;')

    return data
  })

  console.log(`Script offlinified: ${fileName}`)
}

const pages = fs.readdirSync(distPath)
pages.forEach(page => {
  const stats = fs.statSync(path.resolve(distPath, page))
  if (stats.isFile()) {
    offlinifyPage(page)
  }
})

const styles = fs.readdirSync(stylesPath)
styles.forEach(style => offlinifyStyle(style))

const scripts = fs.readdirSync(scriptsPath)
scripts.forEach(script => {
  if (script.startsWith('app.')) {
    offlinifyAppScript(script)
  }
})
