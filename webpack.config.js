var webpack = require('webpack');

var DEV = 'true' == process.env.DEV

/**************************************
 * Main config
 **************************************/

config = {
  context: __dirname + '/src',
  entry: {
    app: ['./js/app']
  },
  output: {
    path: './www',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({'DEV': DEV}),
  ],
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel?stage=0'
      }, {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=asset/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=asset/[hash].[ext]&limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=asset/[hash].[ext]&limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=asset/[hash].[ext]'
      }
    ]
  }
};

/**************************************
 * DEV additions
 **************************************/

if (DEV) {
  config.entry.app.unshift('webpack/hot/dev-server');
}

/**************************************
 * Export
 **************************************/

module.exports = config
