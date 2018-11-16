const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FailOnErrorsPlugin = require('fail-on-errors-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');


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
    mode: 'production',
    output: {
      path: outPath,
      publicPath: '/',
      filename: 'bundle.js',
      chunkFilename: '[id].[chunkhash].js',
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
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        { test: /\.woff$/, use: 'url-loader?limit=10000' },
        {
          test: /\.(eot|svg|ttf)$/,
          use: 'file-loader?name=[name].[ext]?[hash]',
        },
        {
          test: /\.(ttf|eot|svg|woff|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader',
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
    optimization: {
      splitChunks: {
        name: true,
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: -10,
          },
        },
      },
      runtimeChunk: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          include: /(src)/,
          exclude: /[\\/]node_modules[\\/]/,
          terserOptions: {
            warnings: true,
            ie8: false,
            safari10: false,
          },
          warningsFilter: (warning) => {
            if (/Dropping __PURE__ call/i.test(warning)) {
              return false;
            }
            return true;
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    performance: {
      maxEntrypointSize: 250000 * 10, // this are temporary solutions and must be removed after 417 task is done
      maxAssetSize: 250000 * 10, // this are temporary solutions and must be removed after 417 task is done
    },
    plugins: [
      new CleanWebpackPlugin(['www/*'], {
        root: resolve(__dirname, '../'),
      }),
      new CopyWebpackPlugin([
        {
          from: resolve(__dirname, '../public/server.js'),
          to: resolve(__dirname, '../www/server.js'),
        },
      ]),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].[chunkhash].css',
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '../public/template.ejs'),
      }),
      new FailOnErrorsPlugin({
        failOnErrors: true,
        failOnWarnings: true,
      }),
    ],
  };
};
