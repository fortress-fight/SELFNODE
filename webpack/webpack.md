依赖插件 live-server  webpack -g



  "scripts": {
    // 如果在全局安装可以直接使用
    "server": "webpack-dev-server"
    // 如果直接使用 webpack 会到全局中查找，如果使用 build 会在项目中 node_modules 进行查找
    // "build": "webpack"
  },

处理 less
--open 开启服务立即打开
"server": "webpack-dev-server --open",

1. 安装 less 和 less-loader
2. 安装 node-sass 和 sass-loader
3. purify-css 和 purifycss-webpack

babel

cnpm i -D babel-core babel-loader babel-preset-es2015

babel-core 核心包
babel-loader  webpack 依赖
<!-- 2015 过时了 -->
babel-preset-es2015 
<!-- 使用 -->
babel-preset-env

babel-preset-react -- jsx


开发调试模式

source-map 慢但是最为详细
cheap-module-source-map 独立 不包含 列信息
eval-source-map 快速，但是存在安全隐患，只能在开发环境中使用
cheap-module-eval-source-map 


开发环境和生产环境并行

dev--开发
dependencies -- 生产依赖

cnpm i jquery

cnpm i module -- 系统依赖
cnpm i --save module -- 线上依赖包
cnpm i  -D module -- 生产环境

cnpm i --production 只安装生产环境中的依赖


在 mac 下

需要使用 export 名称=参数&&命令

在 win 下
需要使用 set 名称=参数&命令

- 模块化

不仅仅是对项目js进行模块化,最好将 webpack.config.js 文件中的方法也通过模块化的思想进行处理;主要应对生产环境和开发环境

- 第三方类库

安装第三方
在文件中引入；

- watch

--watch 监控

- webpack 优化技巧

- 静态资源集中处理

文件夹命名 public ，存放一些项目中不曾使用的文件，比如：设计稿 文档等

copy-webpack-plugin;

- 引入 JSON
var json = require('../config.json');

可以直接使用