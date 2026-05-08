/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Layout, List, Tag, Typography } from "antd";
import Card from "antd/es/card/Card";
import Statistic from "antd/es/statistic/Statistic";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalizeFirstLetter } from "../../utils";
import CryptoContext from "../../context/crypto-context";

export default function AppSider({ isMobile }) {
  const { assets } = useContext(CryptoContext);

  function AppSiderContent() {
    return (
      <>
        {assets.map((asset) => (
          <Card key={asset.assetId} style={{ marginBottom: "1rem" }}>
            <Statistic
              title={capitalizeFirstLetter(asset.id)}
              value={asset.totalAmount}
              precision={2}
              styles={{
                content: { color: asset.grow ? "#3f8600" : "#cf1322" },
              }}
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
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
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
      </>
    );
  }

  return isMobile ? (
    <div style={{ padding: "1rem", width: "100%" }}>
      <AppSiderContent />
    </div>
  ) : (
    <Layout.Sider width="25%" style={{ padding: "1rem" }}>
      <AppSiderContent />
    </Layout.Sider>
  );
}
