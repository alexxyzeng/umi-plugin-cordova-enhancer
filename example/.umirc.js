import { join, resolve } from "path";

export default {
  routes: [{ path: "/", component: "./index" }],
  plugins: [
    [
      join(__dirname, "..", require("../package").main || "index.js"),
      {
        configPath: resolve(__dirname, "config.xml"),
        resPath: __dirname + "/res",
        config: {
          id: "com.dfocus.fmapp",
          version: "1.0.1",
          name: "fmapp",
          description: "fmapp",
          author: {
            email: "xxx@df.com",
            href: "#",
            name: "xxx"
          },
          permissions: [
            {
              type: "camera",
              desc: "use camera"
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
        }
      }
    ]
  ]
};
