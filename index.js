// app.js
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpack = require('webpack');
var webpackConf = require('./webpack.config');

var http = require('http');
var koa = require('koa');
var serve = require('koa-static');
var path = require('path');

var router = require('koa-router')();
var routes = require('./routes');

var app = koa();
var debug = process.env.NODE_ENV !== 'production';
// 开发环境和生产环境对应不同的目录
var viewDir = debug ? 'src' : 'assets';

app.use(webpackDevMiddleware(webpack(webpackConf), {
    contentBase: webpackConf.output.path,
    publicPath: webpackConf.output.publicPath,
    hot: true,
    stats: webpackConf.devServer.stats
}));

// 处理静态资源和入口文件
app.use(serve(path.resolve(__dirname, viewDir), {
    maxage: 0
}));

app = http.createServer(app.callback());

routes(router, app);
app.use(router.routes());

app.listen(3005, '0.0.0.0', function() {
    console.log('app listen success.');
});