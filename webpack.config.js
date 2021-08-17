const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/main.ts',
  devtool: 'inline-source-map',
  output: {
    filename: 'snailbait.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: 'css-loader',
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.js'],
  },
};
