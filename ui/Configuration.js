import React from "react";
import { Card, Form, Button } from "antd";

function Configuration({ api }) {
  const [form] = Form.useForm();
  const { TwoColumnPanel, Field } = api;
  return (
    <Card title="配置Config.xml" style={{ overflowY: "scroll" }}>
      <div style={{ overflowY: "scroll", maxHeight: 1000 }}>
        <Form
          form={form}
          onFinish={values => {
            console.log("values ----", values);
          }}
        >
          <Field form={form} name="id" label="App Id" type="string" />
          <Field form={form} name="version" label="App 版本号" type="string" />
          <Field form={form} name="name" label="App 名称" type="string" />
          <Field
            form={form}
            name="allow-intent"
            label="allow-intent"
            type="string[]"
          />
          {/* <Field form={form} name="author" label="作者信息" type="boolean" /> */}
          <Field
            form={form}
            name="author.email"
            label="作者邮箱"
            type="string"
          />
          <Field
            form={form}
            name="author.href"
            label="作者相关链接"
            type="string"
          />
          <Field
            form={form}
            name="author.name"
            label="作者名称"
            type="string"
          />
          <Field
            form={form}
            name="allow-navigation"
            label="allow-navigation"
            type="string"
          />
          <Field
            form={form}
            name="preference.Orientation"
            label="Orientation"
            type="list"
            options={["default", "landscape", "portrait"]}
          />
          <Field
            form={form}
            name="preference.target-device"
            label="设备类型"
            type="list"
            options={["universal", "handset", "tablet"]}
          />

          <Field
            form={form}
            name="preference.FullScreen"
            label="是否全屏"
            type="boolean"
          />
          <Field form={form} name="other" label="其他配置" type="any" />
          <Form.Item shouldUpdate>
            {({ getFieldsValue }) => (
              <pre>{JSON.stringify(getFieldsValue(), null, 2)}</pre>
            )}
          </Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form>
      </div>
    </Card>
  );
}

export default Configuration;
