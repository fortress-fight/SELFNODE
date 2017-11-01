const path = require('path');
const glob = require('glob');
// loader 不需要引入
// 听说不需要安装
const uglify = require('uglifyjs-webpack-plugin');
// html 打包
const htmlPlugin = require('html-webpack-plugin');
// css 分离
const extractTextPlugin = require('extract-text-webpack-plugin');
// 处理 html 中的 img 标签引入的图片
// const htmlImg = require('html-withimg-loader');

// 去除多余的css
const PurifyCssPlugin = require('purifycss-webpack');

// 引入配置路径
const entry = require('./webpack_config/entry.webpack');

// providePlugin -- webpack 自带插件

const webpack = require('webpack');

const copyWebpack = require('copy-webpack-plugin');

// node 语法
console.log(encodeURIComponent(process.env.type));

if (process.env.type=="build") {
    // 生产环境
    var website = {
        publicPath: 'http://192.168.31.104:1717/'
    };
} else {
    // 开发环境
    var website = {
        publicPath: 'http://192.168.31.104:1717/'
    };
}

module.exports = {
    // 开发调试工具 source-map  | eval-source-map 无需安装插件
    devtool: 'eval-source-map',
    // 输入
    entry: entry.path,
    // 输出
    output: {
        // path 是 Node 中的路径模块
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        // name -- 就是原本文件名
        filename: '[name].js',
        // 在链接前添加路径
        publicPath: website.publicPath
    },
    // 模块
    module: {
        // 控件组
        rules: [
            // 配合插件处理
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            // 如果需要使用额外的loader 需要使用 importLoaders 具体是什么需要查询
                            importLoaders: 1
                        }
                    }, 'postcss-loader']
                })
            },
            // {
            //     // style-loader 将 html 加载
            //     // 正则路径
            //     test: /\.css$/,
            //     // 使用哪些组件处理 css-loader 处理 css
            //     // style-loader 将 css 添加到 style 然后加载到页面中
            //     use: [{
            //         loader: "style-loader",
            //         // 可以在这里添加配置项
            //         // module: true
            //     }, {
            //         loader: "css-loader"
            //     }],
            // },
            {
                test: /\.(png|jpg|git)$/,
                use: [{
                    // url-loader 集成了 file-loader 
                    loader: 'url-loader',
                    // 配置参数
                    options: {
                        // 小于这个参数就会转换成为 64 编码
                        limit: 400,
                        outputPath: 'images/'
                    }
                }]
            }, {
                test: /\.(htm|html)$/i,
                use: ["html-withimg-loader"]
            }, {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    // 使用 css less 处理，然后在 style 处理结束后调用 extract
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }],
                    fallback: 'style-loader'
                })
            }, {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    fallback: 'style-loader'
                })
            },{
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader'
                },
                // 排除打包目录
                exclude: /node_modules/
            }
            // {
            //     test: /\.less$/,
            //     use: [{
            //         loader: 'style-loader'
            //     }, {
            //         loader: 'css-loader'
            //     }, {
            //         loader: 'less-loader'
            //     }]
            // }
            // {
            //     // style-loader 将 html 加载
            //     // 正则路径
            //     test: /\.css$/,
            //     // 使用哪些组件处理 css-loader 处理 css
            //     // style-loader 将 css 添加到 style 然后加载到页面中
            //     use: ['style-loader', 'css-loader'],
            // }

        ]
    },
    // 插件
    plugins: [
        // 抽离 js 文件
        new webpack.optimize.CommonsChunkPlugin({
            // 将入口文件中的 jquery 单独抽离
            // name: 'jquery',
            // filename: 'asserts/js/jquery.min.js',
            // // 最小抽离的文件数，必须参数
            name: ['jquery'],
            filename: 'asserts/js/[name].js',
            minChunks: 2
        }),
        // 引用扩展插件不使用的插件就不会打包到文件中，在文件中单独引用也是可以的，
        // new webpack.ProvidePlugin ({
        //     $:'jquery'
        // }),
        // 对输出的 js 文件进行处理；插件需要 new 出来使用
        // new uglify(),
        // html-pugin 使用
        new htmlPlugin({
            minify: {
                // 去除属性引号
                removeAttributeQuotes: true
            },
            hash: true,
            // 以这个文件作为模板
            template: './src/index.html'
        }),
        // 将抽出插件实例化
        new extractTextPlugin('./css/index.css'),
        new PurifyCssPlugin({
            // 检测的 thml
            paths: glob.sync(path.join(__dirname, './src/*.html'))
        }),
        new webpack.BannerPlugin('打包的文件都具有这句话'),
        new copyWebpack([{

            from: __dirname+'/src/public',
            // 由于是以 dist 路径为输出路径，所以这里拒不需要添加 __dirname
            to: './public'
        }]),
        // 如果热更新失败可以尝试添加这个用于处理
        // new webpack.HotModuleReplacementPlugin()
    ],
    // devServer 供给给 webpack-dev-server(可以代替 live-server)
    // devServer -- uglify 同时使用会报错
    devServer: {
        // 监听的路径
        contentBase: path.resolve(__dirname, 'dist'),
        // localhost -- 如果映射表改变可能会发生链接不到的现象
        // ip 地址
        host: '192.168.31.104',
        // 服务端压缩
        compress: true,
        port: 1717
    },
    watchOptions: {
        // 检测间隔时间
        poll:  1000,
        // 防止重复按键
        aggregeateTimeout: 500,
        // ignored -- 忽略
        ignored: /node-module/

    }

}