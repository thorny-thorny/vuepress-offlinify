module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
    sidebarDepth: 2,
    sidebar: [
      {
        title: 'Theme',
        collapsable: false,
        children: [
          '/hello-there',
          '/example',
        ],
      },
      {
        title: 'Advanced',
        collapsable: false,
        children: [
          '/stuff',
        ],
      },
    ],
  },
}