import { Button, Card, Col, message, Row } from "antd";
const TAG = "org.alexzeng.umi-plugin-cordova-enhance";

export default api => {
  function CommandPanel() {
    return (
      <Card title="Cordova相关配置命令">
        <Row>
          <h2>Cordova安装</h2>
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
          <h2>配置App平台信息</h2>
        </Row>
        <Row>
          <Col span={2}>
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
          <Col span={2}>
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
      </Card>
    );
  }

  api.addPanel({
    title: "Cordova相关命令",
    path: "/cordova-commands",
    icon: "home",
    component: CommandPanel
  });
};
