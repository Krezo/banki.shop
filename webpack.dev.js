const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', // Faster than eval-cheap-module-source-map
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: false // Don't write to disk in dev
    },
    client: {
      overlay: {
        errors: true,
        warnings: false
      },
      progress: true
    },
    watchFiles: ['src/**/*'],
    liveReload: true
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  cache: {
    type: 'filesystem', // Enable filesystem caching
    buildDependencies: {
      config: [__filename] // Add config to cache dependencies
    }
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false // Disable minimization in dev
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: false, // Use native file system events
    ignored: /node_modules/
  },
  stats: {
    modules: false,
    children: false
  }
});