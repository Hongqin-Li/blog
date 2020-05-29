const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin(
        process.env.NODE_ENV === "production"
          ? { analyzerMode: "disabled" }
          : {}
      )
    ]
  },
  publicPath: process.env.NODE_ENV === "production" ? "/my-blog/" : "/"
};
