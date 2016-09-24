// webpack.config.js
// webpack loaders的配置示例
/*其中entry项是入口文件路径映射表，output项是对输出文件路径和名称的配置，
占位符如[id]、[chunkhash]、[name]等分别代表编译后的模块id、chunk的hashnum值、chunk名等，
可以任意组合决定最终输出的资源格式。hashnum的做法，基本上弱化了版本号的概念，
版本迭代的时候chunk是否更新只取决于chnuk的内容是否发生变化。*/
var chunks = Object.keys(entries);

plugins: [
    new CommonsChunkPlugin({
        name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
        chunks: chunks,
        minChunks: chunks.length // 提取所有entry共同依赖的模块
    })
],
plugins: [
    new HtmlWebpackPlugin({
        template: './src/a.html',
        filename: 'a',
        inject: 'body',
        chunks: ['vendors', 'a']
    })
],
entry: {
    a: './src/js/a.js'
},
output: {
    path: path.resolve(debug ? '__build' : './assets/'),
    filename: debug ? '[name].js' : 'js/[chunkhash:8].[name].min.js',
    chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
		publicPath: debug ? '/__build/' : 'http://cdn.site.com/'
},
resolve: {
    root: [process.cwd() + '/src', process.cwd() + '/node_modules'],
    alias: {},
    extensions: ['', '.js', '.css', '.scss', '.ejs', '.png', '.jpg']
},
loaders: [
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'image?{bypassOnDebug: true, progressive:true, \
                optimizationLevel: 3, pngquant:{quality: "65-80"}}',
            'url?limit=10000&name=img/[hash:8].[name].[ext]',
        ]
    },
    {
        test: /\.(woff|eot|ttf)$/i,
        loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
    },
    {test: /\.(tpl|ejs)$/, loader: 'ejs'},
    {test: /\.js$/, loader: 'jsx'},
    {test: /\.css$/, loader: 'style!css'},
    {test: /\.scss$/, loader: 'style!css!scss'},
]
