export default [
  {
    cjs: "babel"
  },
  {
    entry: "ui/index.js",
    umd: {
      name: "umi-plugin-cordova-ui",
      minFile: false
    }
  }
];
