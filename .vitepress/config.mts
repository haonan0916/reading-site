import { defineConfig } from 'vitepress'
const base = "/reading-site/"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  title: "前端知识库",
  description: "记录前端知识、常见问题、学习记录等",
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: `${base}logo.png` }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    siteTitle: '前端知识库',
    search: {
      provider: 'local'
    },
    outline: {
      level: [1, 6],
      label: '当前页'
    },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '基础',
        items: [
          {
            text: 'HTML5',
            link: '/basic/html5'
          },
          {
            text: 'CSS3',
            link: '/basic/css3'
          },
          {
            text: 'JS',
            link: '/basic/js'
          },
          {
            text: 'TS',
            link: '/basic/ts'
          },
          {
            text: '计算机网络',
            link: '/basic/计算机网络'
          },
          {
            text: '操作系统',
            link: '/basic/操作系统'
          }
        ]
      },
      {
        text: '算法',
        items: [
          {
            text: '算法',
            link: '/algorithm/algorithm'
          }
        ]
      },
      {
        text: '框架',
        items: [
          {
            text: 'Vue',
            link: '/framework/vue'
          },
          {
            text: 'React',
            link: '/framework/react'
          },
          {
            text: 'VitePress',
            link: '/framework/vitepress'
          },
          {
            text: 'Uniapp',
            link: '/framework/uniapp'
          },
          {
            text: '微信小程序',
            link: '/framework/微信小程序'
          }
        ]
      },
      {
        text: '工程化',
        items: [
          {
            text: 'Git',
            link: '/engineering/git'
          },
          {
            text: 'Webpack',
            link: '/engineering/webpack'
          }
        ]
      },
      {
        text: '项目',
        items: [
          {
            text: '小兔鲜儿',
            link: '/project/rabbit-shop'
          },
          {
            text: '人事管理系统（Electron + Vite + Vue3 项目）',
            link: '/project/employee-manage-ystem'
          },
          {
            text: '50days50projects（React18 版）',
            link: '/project/50days50projects'
          },
        ]
      },
      {
        text: '其他',
        items: [
          {
            text: '跨域问题梳理',
            link: '/orther/跨域问题梳理'
          },
          {
            text: '前端项目上线',
            link: '/orther/前端项目上线'
          },
          {
            text: '人工智能',
            link: '/orther/人工智能'
          }
        ]
      },
      { text: '简历', link: '/note/简历文档' },
    ],

    sidebar: [
      {
        text: '基础',
        items: [
          {
            text: 'HTML5',
            link: '/basic/html5'
          },
          {
            text: 'CSS3',
            link: '/basic/css3'
          },
          {
            text: 'JavaScript',
            link: '/basic/js'
          },
          {
            text: 'TypeScript',
            link: '/basic/ts'
          },
          {
            text: '计算机网络',
            link: '/basic/计算机网络'
          },
          {
            text: '操作系统',
            link: '/basic/操作系统'
          }
        ]
      },
      {
        text: '算法',
        items: [
          {
            text: '算法',
            link: '/algorithm/algorithm'
          },
        ]
      },
      {
        text: '框架',
        items: [
          {
            text: 'Vue',
            link: '/framework/vue'
          },
          {
            text: 'React',
            link: '/framework/react'
          },
          {
            text: 'vitepress',
            link: '/framework/vitepress'
          },
          {
            text: 'Uniapp',
            link: '/framework/uniapp'
          },
          {
            text: '微信小程序',
            link: '/framework/微信小程序'
          }
        ]
      },
      {
        text: '工程化',
        items: [
          {
            text: 'Git',
            link: '/engineering/git'
          },
          {
            text: 'Webpack',
            link: '/engineering/webpack'
          }
        ]
      },
      {
        text: '项目',
        items: [
          {
            text: '小兔鲜儿（uni-app + Vue3 + Ts 项目）',
            link: '/project/rabbit-shop'
          },
          {
            text: '人事管理系统（Electron + Vite + Vue3 项目）',
            link: '/project/employee-manage-ystem'
          },
          {
            text: '50days50projects（React18 版）',
            link: '/project/50days50projects'
          },
        ]
      },
      {
        text: '其他',
        items: [
          {
            text: '跨域问题梳理',
            link: '/orther/跨域问题梳理'
          },
          {
            text: '前端项目上线',
            link: '/orther/前端项目上线'
          },
          {
            text: '人工智能',
            link: '/orther/人工智能'
          }
        ]
      },
      {
        text: '简历',
        items: [
          {
            text: '简历文档',
            link: '/note/简历文档'
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/haonan0916' },
      { icon: { svg: '<svg t="1729668403631" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1443" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 992C246.895625 992 32 777.104375 32 512S246.895625 32 512 32s480 214.895625 480 480-214.895625 480-480 480z m242.9521875-533.3278125h-272.56875a23.7121875 23.7121875 0 0 0-23.71125 23.7121875l-0.024375 59.255625c0 13.08 10.6078125 23.7121875 23.6878125 23.7121875h165.96c13.104375 0 23.7121875 10.6078125 23.7121875 23.6878125v11.855625a71.1121875 71.1121875 0 0 1-71.1121875 71.1121875h-225.215625a23.7121875 23.7121875 0 0 1-23.6878125-23.7121875V423.1278125a71.1121875 71.1121875 0 0 1 71.0878125-71.1121875h331.824375a23.7121875 23.7121875 0 0 0 23.6878125-23.71125l0.0721875-59.2565625a23.7121875 23.7121875 0 0 0-23.68875-23.7121875H423.08a177.76875 177.76875 0 0 0-177.76875 177.7921875V754.953125c0 13.1034375 10.60875 23.7121875 23.713125 23.7121875h349.63125a159.984375 159.984375 0 0 0 159.984375-159.984375V482.36a23.7121875 23.7121875 0 0 0-23.7121875-23.6878125z" fill="#C71D23" p-id="1444"></path></svg>' }, link: 'https://gitee.com/haonan0916' }
    ]
  }
})
