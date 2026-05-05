/* eslint-disable react/prop-types */
import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
} from "antd";
import React, { useRef, useState } from "react";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function AddAssetForm({ onClose }) {
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="Asset added successfully!"
        subTitle={`You have added ${assetRef.current.amount} ${coin.symbol} at $${assetRef.current.price} each, for a total of $${assetRef.current.amount * assetRef.current.price}.`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        placeholder="Select a coin"
        // optionLabelProp="label"
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
        // onClick={() => setSelect((prev) => !prev)}
        // open={select}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 30 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    addAsset(newAsset);
    
    console.log("Success:", newAsset);
    setSubmitted(true);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }
  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{ price: +coin.price.toFixed(2), total: 0 }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          min={0}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        // rules={[
        //   {
        //     required: true,
        //     type: "number",
        //     min: 0,
        //   },
        // ]}
      >
        <InputNumber
          onChange={handlePriceChange}
          min={0}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item label="Date and time" name="date">
        <DatePicker showTime></DatePicker>
      </Form.Item>{" "}
      <Form.Item label="Total" name="total">
        <InputNumber disabled min={0} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
