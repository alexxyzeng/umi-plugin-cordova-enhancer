import { join, resolve } from "path";

export default {
  routes: [{ path: "/", component: "./index" }],
  outputPath: "www",
  plugins: [
    [
      join(__dirname, "..", require("../package").main || "index.js"),
      // "umi-plugin-cordova-enhance",
      {
        configPath: resolve(__dirname, "config.xml"),
        resPath: __dirname + "/res",
        config: {
          id: "com.dfocus.fmapp",
          version: "1.0.3",
          name: "fmapp",
          description: "fmapp",
          author: {
            email: "xxx@df.com",
            href: "#",
            name: "xxx"
          },
          allowNavigation: "*",
          permissions: [
            {
              type: "camera",
              desc: "xxxx我们要使用您的相机"
            },
            {
              type: "photo",
              desc: "use photo"
            },
            {
              type: "location",
              desc: "use location"
            },
            {
              type: "microphone",
              desc: "use microphone"
            }
          ]
        },
        apkOutputPath: __dirname + "/apk",
        apkOutputName: "数据中心"
      }
    ]
  ]
};
