import { join, resolve } from "path";

export default {
  routes: [{ path: "/", component: "./index" }],
  outputPath: "www",
  plugins: [
    [
      join(__dirname, "..", require("../package").main || "index.js"),
      // "umi-plugin-cordova-enhance",
      {
        // 图片/启动图路径
        resPath: __dirname + "/res",
        // config.xml配置信息
        config: {
          // 应用id
          id: "com.dfocus.fmapp",
          // 应用版本
          version: "1.0.3",
          // 应用名称
          name: "fmapp",
          // 应用描述
          description: "fmapp",
          // 应用作者信息
          author: {
            email: "xxx@df.com",
            href: "#",
            name: "xxx"
          },
          // 允许导航路径
          allowNavigation: "*",
          // 权限信息
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
        // Android打包路径
        apkOutputPath: __dirname + "/apk",
        // Android打包App名称
        apkOutputName: "数据中心"
      }
    ]
  ]
};
