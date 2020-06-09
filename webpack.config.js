const path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: './IonManaLib.js',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'manaIonlib',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
};