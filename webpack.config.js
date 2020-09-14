const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  entry: {
    'sliders': __dirname + '/src/pages/sliders.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: __dirname + '/dist'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: __dirname + '/src/pages/sliders.pug',
      filename: 'index.html',
      chunks: ['sliders']
    }),
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js"
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.(jpe?g|gif|jpg|png|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
            outputPath: 'images/'
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  devServer: {  // configuration for webpack-dev-server
      contentBase: './src/pages',  //source of static assets
      port: 7700, // port to run dev-server
  }
}