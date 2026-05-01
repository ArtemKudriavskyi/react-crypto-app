import React, { useContext } from "react";
import { Layout, List, Tag, Typography } from "antd";
import Card from "antd/es/card/Card";
import Statistic from "antd/es/statistic/Statistic";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import { fakeFetchCrypto, fetchAssets } from "../../api";
import { capitalizeFirstLetter } from "../../utils";
import CryptoContext from "../../context/crypto-context";

const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
  const { assets}=useContext(CryptoContext);


  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalizeFirstLetter(asset.id)}
            value={asset.totalAmount}
            precision={2}
            styles={{ content: { color: asset.grow ? "#3f8600" : "#cf1322" } }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: "Total profit",
                value: asset.totalProfit,
                withTag: true,
              },
              { title: "Assent amount", value: asset.amount, isPlain: true },
              // { title: "Difference", value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && <Tag color={asset.grow?"green":"red"}>{asset.growPercent}%</Tag>}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {Number(item.value).toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
      {/* <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          styles={{ content: { color: "#cf1322" } }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card> */}
    </Layout.Sider>
  );
}
