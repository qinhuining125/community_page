# vue-learn

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目目录结构
├── dist                       // 打包过后的目录
├── public                     // 静态资源(不用打包的都可以放这个目录,打包后可随时更改)
│   ├── config                 // 全局变量的配置
│   ├── static                 // 静态文件如：图片,json,js,css文件等
├── src                        // 源代码
│   ├── api                    // 所有请求api(封装axios)
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── router                 // 路由及路由配置相关(可以在此查看页面配置路径)
│   ├── store                  // 全局 store管理 vuex
│   ├── utils                  // 全局公用方法
│   ├── views                  // view -- 内容页面
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
└── package.json
└── .editorconfig              // 文件格式化配置文件
└── .env.development           // 开发环境配置(开发中的配置)
└── .env.production            // 生产环境配置(打包后的配置)
└── vue.config.js              // 配置代理文件(vue-cli3)

# 123
