const path = require("path");
module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    // {
    //   name: "@storybook/addon-docs",
    //   options: {
    //     // vueDocgenOptions: {
    //     //   alias: {
    //     //     "@": path.resolve(__dirname, "../")
    //     //   }
    //     // }
    //   }
    // },
    "@storybook/addon-notes"
  ]
};
