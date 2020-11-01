const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  entry: {
    'sliders': __dirname + '/src/pages/range-sliders.js'
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
      template: __dirname + '/src/pages/range-sliders.pug',
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
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|gif|jpg|png|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
            outputPath: 'images/'
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }],
        exclude: /node_modules/,
      },
    ]
  },
  devServer: {  // configuration for webpack-dev-server
      contentBase: './src/pages',  //source of static assets
      port: 7700, // port to run dev-server
  }
}