import vueplugin from "rollup-plugin-vue";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify-es";
import svgo from "rollup-plugin-svgo";

let baseconfig = format => {
  return {
    input: "./src/index.js",
    output: {
      name: "sm-ui",
      globals: {
        vue: "Vue"
      },
      extend: true,
      format,
      file: format === "iife" ? "dist/sm-ui.js" : `dist/sm-ui.${format}.js`
    },
    external: ["vue"],
    plugins: [
      svgo({
        raw: true
      }),
      uglify(),
      resolve(),
      babel({
        exclude: "node_modules/**" // 只编译我们的源代码
      }),
      vueplugin({ css: true })
    ]
  };
};
export default [baseconfig("esm"), baseconfig("cjs"), baseconfig("iife")];
