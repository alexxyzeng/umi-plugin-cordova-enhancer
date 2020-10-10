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
        const { author, preference, version, id, name, description } =
          widget || {};
        const allowIntent =
          widget["allow-intent"]?.map(item => item.href) || [];
        let initialValue = { ...widget };
        const { email = "", href = "", $t: authorName = "" } = author || {};
        initialValue = { id, version, allowIntent };
        initialValue["name"] = name?.["$t"] || "";
        initialValue["author.email"] = email;
        initialValue["author.href"] = href;
        initialValue["author.name"] = authorName;
        initialValue["description"] = description?.["$t"] || "";
        initialValue["allowNavigation"] =
          widget["allow-navigation"]?.href || "*";
        const prefHash = {};
        preference?.forEach(pref => {
          const { key, value } = pref;
          prefHash[key] = value;
        });
        if (!prefHash["Orientation"]) {
          prefHash["Orientation"] = "default";
        }
        if (!prefHash["target-device"]) {
          prefHash["target-device"] = "universal";
        }

        prefHash["FullScreen"] = prefHash["FullScreen"] === "true";
        console.log(prefHash, "---- pref ---", preference);
        prefRef.current = prefHash;
        initialValue["preference.Orientation"] =
          prefHash["Orientation"] || "default";
        initialValue["preference.target-device"] =
          prefHash["target-device"] || "universal";
        initialValue["preference.FullScreen"] = prefHash["FullScreen"];
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
            let formValue = {};
            const author = { name: {} };
            const {
              id,
              version,
              name,
              allowIntent,
              allowNavigation,
              description
            } = values;
            author["email"] = values["author.email"] || "";
            author["href"] = values["author.href"] || "";
            author["name"] = values["author.name"] || "";
            let preference = [];
            const prefHash = prefRef.current || {};
            for (let key in prefHash) {
              const prefValue = values[`preference.${key}`];
              prefHash[key] = prefValue;
              preference.push({ name: key, value: prefHash[key] });
            }
            formValue = {
              ...values,
              ...formValue,
              id,
              version,
              name,
              preference,
              author,
              prefs: prefHash,
              allowIntent,
              allowNavigation
            };
            const uselessKeys = [
              "author.email",
              "author.href",
              "author.name",
              "preference.FullScreen",
              "preference.target-device",
              "preference.Orientation"
              // "allowNavigation",
              // "allowIntent"
            ];

            console.log("values ----", formValue);
            uselessKeys.forEach(key => delete formValue[key]);
            // TODO: 数据转换
            api.callRemote({
              type: `${TAG}.updateCordovaConfig`,
              payload: formValue
            });
          }}
          initialValues={initialValues}
        >
          <Field form={form} name="id" label="App Id" type="string" />
          <Field form={form} name="version" label="App 版本号" type="string" />
          <Field form={form} name="name" label="App 名称" type="string" />
          <Field
            form={form}
            name="description"
            label="App 描述信息"
            type="textarea"
          />
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
          {/* <Form.Item shouldUpdate>
            {({ getFieldsValue }) => (
              <pre>{JSON.stringify(getFieldsValue(), null, 2)}</pre>
            )}
          </Form.Item> */}
          <Button htmlType="submit">Submit</Button>
        </Form>
      </div>
    </Card>
  );
}

export default Configuration;
