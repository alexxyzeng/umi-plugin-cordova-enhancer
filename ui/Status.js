import { useEffect, useState } from "react";
import { Button, Card, Col, message, Row } from "antd";
import { TAG } from "./const";

function CordovaStatusPanel({ api }) {
  const [platforms, setPlatforms] = useState("");
  const [plugins, setPlugins] = useState("");
  useEffect(() => {
    const getInfo = async function() {
      const { data } = await api.callRemote({
        type: `${TAG}.getCordovaInfo`
      });
      const { platforms, plugins } = data;
      setPlatforms(platforms);
      setPlugins(plugins);
    };
    getInfo();
  });
  return (
    <Card title="Cordova状态">
      <Row>
        <h3>Cordova平台状态</h3>
      </Row>
      <Row>
        <div>{platforms}</div>
      </Row>
      <br />
      <Row>
        <h3>Cordova插件状态</h3>
      </Row>
      <Row>
        <div>{plugins}</div>
      </Row>
    </Card>
  );
}

export default CordovaStatusPanel;
