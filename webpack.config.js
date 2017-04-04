const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: './index',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
		library: 'redrover',
		libraryTarget: 'umd'
  },
	module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }],
      },
    ],
  }
};
