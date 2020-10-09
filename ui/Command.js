import { useEffect, useState } from "react";
import { Button, Card, Col, message, Row } from "antd";
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
        <Col span={3}>
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
        </Col>
        <Col span={3}>
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
        </Col>
        <Col span={3} push={2}>
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
        </Col>
        <Col span={3} push={2}>
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
        </Col>
      </Row>
      <br />
      <Row>
        <h3>Cordova其他命令</h3>
      </Row>
      <Row>
        <Col span={3}>
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
        </Col>
        <Col span={3}>
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
        </Col>
        <Col span={3}>
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
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={3}>
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
        </Col>
        <Col span={3}>
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
            发布Android
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default CordovaCommandPanel;
