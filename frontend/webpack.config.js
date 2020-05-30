module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  cache: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  }
};
