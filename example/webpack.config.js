const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    server: './index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  externals: [nodeExternals()], 
  module: {
    rules: [
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [{loader: "html-loader"}]
      },
      {
        test: /\.njk/,
        oneOf: [
          {
            resourceQuery: /func/, // index.njk?func
            use: [
              // {loader: "html-loader"},
              {
                loader: 'nunjucks-webpack-loader',
                options: {
                  context: {
                    someString: 'some test string'
                  },
                  alias: {
                    common: path.resolve(__dirname, `./template/common/`),
                  },
                  tags: {
                    blockStart: '@{%',
                    blockEnd: '%}',
                    variableStart: '@{{',
                    variableEnd: '}}',
                    commentStart: '{#',
                    commentEnd: '#}'
                  }
                }
              }
            ]
          },
          {
            use: [
              {loader: "html-loader"},
              {
                loader: 'nunjucks-webpack-loader',
                options: {
                  context: {
                    someString: 'some test string'
                  },
                  alias: {
                    common: path.resolve(__dirname, `./template/common/`),
                  },
                  tags: {
                    blockStart: '@{%',
                    blockEnd: '%}',
                    variableStart: '@{{',
                    variableEnd: '}}',
                    commentStart: '{#',
                    commentEnd: '#}'
                  }
                }
              }
            ]
          }
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./template/index.js",
      filename: "./index.html",
      excludeChunks: [ 'server' ]
    })
  ]
};
