const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map", // helps in matching up error msgs to correct files and lines from our development code (src)
  devServer: { // by default webpack will only watch changes of bundled .js files and ignore html, this changes that.
    watchFiles: ["./src/template.html"],
  },
});