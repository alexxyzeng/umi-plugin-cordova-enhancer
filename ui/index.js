import CordovaCommandPanel from "./Command";
import CordovaStatusPanel from "./Status";
import ConfigurationPanel from "./Configuration";
import "./index.css";

export default api => {
  api.addPanel({
    title: "Cordova相关命令",
    path: "/cordova-commands",
    icon: "home",
    component: () => <CordovaCommandPanel api={api} />
  });

  api.addPanel({
    title: "Cordova相关状态",
    path: "/cordova-info",
    icon: "home",
    component: () => <CordovaStatusPanel api={api} />
  });

  api.addPanel({
    title: "Cordova配置",
    path: "/cordova-config",
    component: () => <ConfigurationPanel api={api} />
  });
};
