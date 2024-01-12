import React, { useEffect, useState } from "react";
import { Content } from "./Content/Content";
import { Collapse, Button, Form, Input, Select, Checkbox } from "antd";

const options = [
  {
    value: "character",
    label: "character",
  },
  {
    value: "place",
    label: "place",
  },
  {
    value: "item",
    label: "item",
  },
];

export const List = () => {
  const [form] = Form.useForm();
  const list = JSON.parse(localStorage.getItem("list")) || [];
  const tags = JSON.parse(localStorage.getItem("tags")) || [];

  const [dispayedElements, setDisplayedElements] = useState(list);
  const [currentTags, setCurrentTags] = useState([]);

  useEffect(() => {
    const filteredElements = currentTags.reduce((acc, tag) => acc.filter((element) => element.tags.includes(tag)), [...list]);
    setDisplayedElements(filteredElements);
  }, [currentTags]);

  const addElement = (values) => {
    console.log(values);
    const { tags } = values;
    const newTags = tags.reduce((acc, tag) => (tags.includes(tag) ? acc : [...acc, tag]), [...tags]);
    localStorage.setItem("tags", JSON.stringify(newTags));
    localStorage.setItem("list", JSON.stringify([...list, values]));
    form.resetFields();
  };

  return (
    <div className="list">
      <Checkbox.Group
        options={tags}
        defaultValue={["Apple"]}
        onChange={(checked) => {
          setCurrentTags(checked);
        }}
      />
      <Collapse
        items={dispayedElements.map((element, index) => ({
          key: index,
          label: (
            <div>
              {element.name}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(element.name);
                }}
              >
                delete
              </button>
            </div>
          ),
          children: <Content elementInfo={element} />,
        }))}
      />
      <Form form={form} onFinish={addElement} style={{ display: "flex" }}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>

        <Form.Item label="Tags" name="tags" style={{ width: "200px" }}>
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Tags Mode"
            options={options}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
