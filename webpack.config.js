const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

// __dirname:
    // 它是你的根目录--->从电脑的盘指向过来的,是一个绝对路径
    //我们第二节打包用的是 webpack './src/entry.js' 'dist/bundle.js'
    // console.log(__dirname);
    // /Users/mr.yang/Desktop/webpack
var website ={
    publicPath: "http://192.168.191.3:8888/"
}

module.exports = {
    //入口文件配置项
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js'
    },
    output:{
        //输出路径 用了node的语法
        path: path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename: '[name].js',
        publicPath: website.publicPath
    },
    module: {
        //模块：解读CSS,图片如何转换，压缩
        rules: [
            {
                test: /\.(css|less)$/,
                use: extractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader"
                        }, {
                            loader: "less-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:50,
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    plugins: [
            //插件，用于生产模版和各项功能 ---> 有些需要引入,有些是webapck自带的
        //new uglify(); --> 用于生产环境
            //npm run server 用于开发环境
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash:true,  //这是是html 里面的把js文件的引用加上字符串 -->跟js 文件没有半毛钱关系
            template:'./src/index.html'
        }),

        new extractTextPlugin("/css/index.css"),
        new extractTextPlugin("/css/color.less")
        // new extractTextPlugin("/css/color.sass")
    ],
    devServer: {
        //配置webpack开发服务功能 ---> npm run server
        contentBase: path.resolve(__dirname,'dist'),
        //host: '127.0.0.1',
        host: '192.168.191.3',
        compress: true,
        port: 8888,
    },
}
