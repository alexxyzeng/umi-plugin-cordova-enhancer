import { useEffect, useState } from "react";
import { Button, Card, message, Row } from "antd";
import CordovaStatusPanel from "./Status";

import { TAG } from "./const";
function CordovaCommandPanel({ api }) {
  return (
    <Card title="Cordova相关配置命令">
      <Row>
        <h3>Cordova安装</h3>
      </Row>
      <Row>
        <Button
          type="primary"
          onClick={async () => {
            try {
              const { data } = await api.callRemote({
                type: `${TAG}.initCordova`
              });
              message.success(data);
            } catch (err) {
              message.error(err.message);
            }
          }}
        >
          初始化Cordova环境
        </Button>
      </Row>
      <br />
      <Row>
        <h3>配置App平台信息</h3>
      </Row>
      <Row>
        <Button
          type="primary"
          onClick={async () => {
            try {
              const { data } = await api.callRemote({
                type: `${TAG}.addIOS`
              });
              message.success(data);
            } catch (err) {
              message.error(err.message);
            }
          }}
        >
          配置iOS平台
        </Button>
        <Button
          type="ghost"
          onClick={async () => {
            try {
              const { data } = await api.callRemote({
                type: `${TAG}.removeIOS`
              });
              message.success(data);
            } catch (err) {
              message.error(err.message);
            }
          }}
        >
          移除iOS平台
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            try {
              const { data } = await api.callRemote({
                type: `${TAG}.addAndroid`
              });
              message.success(data);
            } catch (err) {
              message.error(err.message);
            }
          }}
        >
          配置Android平台
        </Button>
        <Button
          type="ghost"
          onClick={async () => {
            try {
              const { data } = await api.callRemote({
                type: `${TAG}.removeAndroid`
              });
              message.success(data);
            } catch (err) {
              message.error(err.message);
            }
          }}
        >
          移除Android平台
        </Button>
      </Row>
      <br />
      <Row>
        <h3>Cordova其他命令</h3>
      </Row>
      <Row>
        <Button
          type="ghost"
          onClick={async () => {
            try {
              const { data } = await api.callRemote({
                type: `${TAG}.debugIOS`
              });
              message.success(data);
            } catch (err) {
              message.error(err.message);
            }
          }}
        >
          调试iOS
        </Button>
        <Button
          type="ghost"
          onClick={async () => {
            try {
              const { data } = await api.callRemote({
                type: `${TAG}.debugAndroid`
              });
              message.success(data);
            } catch (err) {
              message.error(err.message);
            }
          }}
        >
          调试Android
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            try {
              const { data } = await api.callRemote({
                type: `${TAG}.runRealAndroid`
              });
              message.success(data);
            } catch (err) {
              message.error(err.message);
            }
          }}
        >
          运行Android
        </Button>
      </Row>
      <br />
      <Row>
        <Button
          type="primary"
          onClick={() => {
            message.error("需要前往终端执行yarn ci:ios来初始化");
          }}
        >
          配置iOS ci
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            try {
              const { data } = await api.callRemote({
                type: `${TAG}.releaseIOS`
              });
              message.success(data);
            } catch (err) {
              message.error(err.message);
            }
          }}
        >
          发布iOS
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            try {
              const { data } = await api.callRemote({
                type: `${TAG}.releaseAndroid`
              });
              message.success(data);
            } catch (err) {
              message.error(err.message);
            }
          }}
        >
          打包Android
        </Button>
      </Row>
    </Card>
  );
}

export default CordovaCommandPanel;
