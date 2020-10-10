import { useEffect, useState } from "react";
import { Button, Card, Col, message, Row } from "antd";
import { TAG } from "./const";

function CordovaStatusPanel({ api }) {
  const [platforms, setPlatforms] = useState([]);
  const [plugins, setPlugins] = useState([]);
  useEffect(() => {
    const getInfo = async function() {
      const { data } = await api.callRemote({
        type: `${TAG}.getCordovaInfo`
      });
      const { platforms, plugins } = data;
      // TODO: 增加对应的解析
      let parsedPlatforms = [];
      let parsedPlugins = [];
      platforms.forEach((item, index) => {
        if (index % 2 === 0) {
          parsedPlatforms.push(`${item.trim()} 版本: ${platforms[index + 1]}`);
        }
      });
      plugins.forEach((item, index) => {
        if (index % 2 === 0) {
          parsedPlugins.push(`${item.trim()}`);
        }
      });
      setPlatforms(parsedPlatforms);
      setPlugins(parsedPlugins);
    };
    getInfo();
  }, []);
  return (
    <Card title="Cordova状态">
      <Row>
        <h3>Cordova平台状态</h3>
      </Row>
      {platforms.map(platform => (
        <Row key={platform} style={{ padding: 4 }}>
          {platform}
        </Row>
      ))}
      <br />
      <Row>
        <h3>Cordova插件状态</h3>
      </Row>
      {plugins.map(plugin => (
        <Row key={plugin} style={{ padding: 4 }}>
          {plugin}
        </Row>
      ))}
    </Card>
  );
}

export default CordovaStatusPanel;
