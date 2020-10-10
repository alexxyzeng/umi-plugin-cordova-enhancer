import React, { useEffect, useState, useRef } from "react";
import { Card, Form, Button } from "antd";
import { TAG } from "./const";

function Configuration({ api }) {
  const [form] = Form.useForm();
  const { Field } = api;
  const [initialValues, setInitialValues] = useState();
  const prefRef = useRef({});
  useEffect(() => {
    api
      .callRemote({
        type: `${TAG}.getCordovaConfig`
      })
      .then(({ data }) => {
        const { widget } = data || {};
        console.log(widget, "---- widget");
        const { author, preference, version, id, name } = widget || {};
        const allowIntent =
          widget["allow-intent"]?.map(item => item.href) || [];
        let initialValue = {};
        const { email = "", href = "", $t: authorName = "" } = author || {};
        initialValue = { id, version, allowIntent };
        initialValue["name"] = name?.["$t"] || "";
        initialValue["author.email"] = email;
        initialValue["author.href"] = href;
        initialValue["author.name"] = authorName;
        initialValue["allowNavigation"] =
          widget["allow-navigation"]?.href || "*";
        const prefHash = {};
        preference?.forEach(pref => {
          const { name, value } = pref;
          prefHash[name] = value;
        });
        if (!prefHash["Orientation"]) {
          prefHash["Orientation"] = "default";
        }
        if (!prefHash["target-device"]) {
          prefHash["target-device"] = "universal";
        }
        if (!prefHash["FullScreen"]) {
          prefHash["FullScreen"] = false;
        }
        prefRef.current = prefHash;
        initialValue["preference.Orientation"] =
          prefHash["Orientation"] || "default";
        initialValue["preference.target-device"] =
          prefHash["target-device"] || "universal";
        initialValue["preference.FullScreen"] = prefHash["FullScreen"] || false;
        setInitialValues(initialValue);
      });
  }, []);
  if (!initialValues) {
    return null;
  }
  return (
    <Card title="配置Config.xml" style={{ overflowY: "scroll" }}>
      <div style={{ overflowY: "scroll", maxHeight: 700 }}>
        <Form
          form={form}
          onFinish={values => {
            console.log("values ----", values);
            let formValue = {};
            const author = { name: {} };
            const { id, version, name, allowIntent, allowNavigation } = values;
            author["email"] = values["author.email"] || "";
            author["href"] = values["author.href"] || "";
            author["name"]["$t"] = values["author.name"] || "";
            formValue["allow-intent"] = allowIntent
              ?.filter(item => item !== null && item !== "")
              .map(item => {
                return { href: item };
              });
            formValue["allow-navigation"] = allowNavigation || "*";
            let preference = [];
            const prefHash = prefRef.current || {};
            for (let key in prefHash) {
              const prefValue = values[`preference.${key}`];
              if (prefValue) {
                prefHash[key] = prefValue;
              }
              preference.push({ name: key, value: prefHash[key] });
            }
            formValue = {
              ...initialValues,
              ...formValue,
              id,
              version,
              name,
              preference,
              author
            };
            console.log("final form values ----", formValue);
            // TODO: 数据转换
          }}
          initialValues={initialValues}
        >
          <Field form={form} name="id" label="App Id" type="string" />
          <Field form={form} name="version" label="App 版本号" type="string" />
          <Field form={form} name="name" label="App 名称" type="string" />
          <Field
            form={form}
            name="allowIntent"
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
            name="allowNavigation"
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
