const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./examples/main.js",
  output: {
    filename: "index.js",
    chunkFilename: "[name].[hash:8].bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  devServer: {
    port: 8080,
    contentBase: "examples",
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|svg|ttf|eot)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000
          }
        }
      },
      {
        test: /(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"]
      },
      {
        test: /\.(less|css)$/,
        exclude: /(node_modules|bower_components)/,
        use: ["vue-style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "hello",
      inject: true,
      template: "examples/index.html"
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /node_modules/,
          name: "vendor",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100
        },
        common: {
          chunks: "all",
          test: /[\\/]src[\\/]js[\\/]/,
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 60
        },
        // styles: {
        //   name: "styles" + timestamp,
        //   test: /\.(sa|sc|c)ss$/,
        //   chunks: "all",
        //   enforce: true
        // },
        runtimeChunk: {
          name: "manifest"
        }
      }
    }
  }
};
