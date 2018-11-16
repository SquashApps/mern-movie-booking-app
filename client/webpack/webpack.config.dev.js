const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const path = require('path');

const sourcePath = path.join(__dirname, '../src');
const outPath = path.join(__dirname, '../www');

module.exports = () => {
  return {
    context: sourcePath,
    devtool: 'source-map',
    entry: [
      '@babel/polyfill', resolve(__dirname, '../src'),
    ],
    mode: 'development',
    output: {
      path: outPath,
      publicPath: '/',
      filename: '[name].[chunkhash:6].js',
    },
    resolve: {
      modules: ['src', 'node_modules'],
    },
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react'],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
        {
          test: /\.(jpg|png|gif)$/,
          loaders: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              query: {
                mozjpeg: {
                  progressive: true,
                  optimizationLevel: 7,
                  interlaced: false,
                },
                gifsicle: {
                  progressive: true,
                  optimizationLevel: 7,
                  interlaced: false,
                },
                optipng: {
                  progressive: true,
                  optimizationLevel: 7,
                  interlaced: false,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(['www/*'], {
        root: resolve(__dirname, '../'),
      }),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '../public/template.ejs'),
        inject: 'body',
      }),
    ],
  };
};
