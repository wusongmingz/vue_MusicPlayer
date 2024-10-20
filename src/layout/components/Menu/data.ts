export const MenuData = [
  {
    title: '',
    children: [
      { title: '首页', icon: 'solar:home-smile-broken', router: '/' },
      {
        title: '数据大屏',
        icon: 'material-symbols:screen-search-desktop-outline-rounded',
        router: '/dataScreen',
      },
    ],
  },
  {
    title: '发现',
    children: [
      {
        title: '发现',
        icon: 'ph:magnifying-glass',
        router: '/discover',
        shortcut: '⌘+D',
      },
      // { title: "视频", icon: "ph:film-strip", router: "/video", shortcut: '⌘+V' },
      {
        title: '歌单',
        icon: 'streamline:song-recommendation',
        router: '/discover/songlist',
      },
      // { title: "动漫", icon: "tdesign:film", router: "/animation" },
      { title: '工具', icon: 'tdesign:film', router: '/utils' },
      { title: 'UI1', icon: 'ph:test-tube-duotone', router: '/ui1' },
      { title: 'UI2', icon: 'ph:test-tube-duotone', router: '/ui2' },
      { title: 'UI3', icon: 'ph:test-tube-duotone', router: '/ui3' },
    ],
  },
  {
    title: '设置',
    children: [
      { title: '设置', icon: 'hugeicons:settings-03', router: '/setting' },
      { title: 'EQ均衡器', icon: 'ri:equalizer-line', router: '/eq' },
      { title: '文件上传', icon: 'ph:test-tube-duotone', router: '/test' },
      {
        title: '主题',
        icon: 'unjs:theme-colors',
        router: '/theme',
        shortcut: '⌘+Q',
      },
    ],
  },
]
