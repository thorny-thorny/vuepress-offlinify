module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
    sidebarDepth: 2,
    sidebar: [
      {
        title: 'Group 1',
        collapsable: false,
        children: [
          '/',
          '/example',
        ],
      },
      {
        title: 'Group 2',
        collapsable: false,
        children: [
          '/article-3',
        ],
      },
    ],
  },
}
