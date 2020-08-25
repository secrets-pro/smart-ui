const path = require("path");
module.exports = async ({ config, mode }) => {
  // 新加less语法加载器
  config.module.rules.push({
    test: /\.less$/,
    use: [
      "style-loader",
      "css-loader",
      "less-loader",
      {
        loader: "style-resources-loader",
        options: {
          patterns: [
            path.resolve(__dirname, "../src/assets/style/common/mixins.less")
          ]
        }
      }
    ]
  });
  // config.module.rules.push({
  //   // You also can put this loader above, but I recommend to use
  //   // a separeted rule with enforce: 'post' for maintainability
  //   // and simplicity. For example, you can enable the loader only
  //   // for development build.
  //   test: /\.vue$/,
  //   use: "vue-docgen-loader",
  //   enforce: "post"
  // });
  //

  // 新增@别名
  config.resolve.alias = Object.assign(config.resolve.alias, {
    "@": path.resolve(__dirname, "../src")
  });

  // Return the altered config
  return config;
};
