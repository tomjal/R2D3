'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const proxy = require('./server/webpack-dev-proxy');
const loaders = require('./webpack/loaders');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');

const baseAppEntries = [
  './src/index.tsx',
];

const devAppEntries = [
  'webpack-hot-middleware/client?reload=true',
];

const appEntries = baseAppEntries
  .concat(process.env.NODE_ENV === 'development' ? devAppEntries : []);

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new SplitByPathPlugin([
    { name: 'vendor', path: [__dirname + '/node_modules/'] },
  ]),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
  }),
];

const devPlugins = [
  new webpack.NoErrorsPlugin(),
  new StyleLintPlugin({
    configFile: './.stylelintrc',
    files: ['src/**/*.css'],
    failOnError: false,
  }),
];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
];

const plugins = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

const postcssBasePlugins = [
  require('postcss-import')({
    addDependencyTo: webpack,
  }),
  require('postcss-cssnext')({
    browsers: ['ie >= 8', 'last 2 versions'],
  }),
];
const postcssDevPlugins = [];
const postcssProdPlugins = [
  require('cssnano')({
    safe: true,
    sourcemap: true,
    autoprefixer: false,
  }),
];

const postcssPlugins = postcssBasePlugins
  .concat(process.env.NODE_ENV === 'production' ? postcssProdPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? postcssDevPlugins : []);

module.exports = {

  entry: {
    app: appEntries,
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.tsx', '.ts', '.js'],
  },

  plugins: plugins,

  devServer: {
    historyApiFallback: { index: '/' },
    proxy: proxy(),
  },

  module: {
    preLoaders: [
      loaders.tslint,
    ],
    loaders: [
      loaders.tsx,
      loaders.html,
      loaders.css,
      //loaders.svg,
      //loaders.eot,
      //loaders.woff,
      //loaders.woff2,
      //loaders.ttf,
    ],
  },

  postcss: () => {
    return postcssPlugins;
  },
};
