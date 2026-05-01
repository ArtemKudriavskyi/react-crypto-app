/* eslint-disable react/prop-types */
import { Flex, Typography } from "antd";
import React from "react";
export default function CoinInfo({ coin }) {
  return (
    <Flex align="center">
      <img
        src={coin.icon}
        alt={coin.name}
        style={{ width: 50, height: 50, marginRight: 16 }}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        ({coin.symbol}) {coin.name}
      </Typography.Title>
    </Flex>
  );
}
