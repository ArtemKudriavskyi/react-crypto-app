/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, InputNumber, Table } from "antd";
import { useCrypto } from "../context/crypto-context";

const BaseColumns = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
];
const sellColums = [
  {
    title: "Amount to sold",
    dataIndex: "amountToSold",
  },
  { title: "Sold", dataIndex: "sold" },
];
export default function AssetsTable({ addAsset = false }) {
  const { assets, removeAsset } = useCrypto();
  const [soldAmounts, setSoldAmounts] = useState({});

  const columns = addAsset ? [...BaseColumns, ...sellColums] : BaseColumns;

  const data = assets.map((asset) => ({
    key: asset.assetId,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
    ...(addAsset && {
      amountToSold: (
        <InputNumber
          min={0}
          max={asset.amount}
          step={0.1}
          value={soldAmounts[asset.assetId] ?? null}
          onChange={(value) => {
            setSoldAmounts((prev) => ({
              ...prev,
              [asset.assetId]: value,
            }));
          }}
        />
      ),
      sold: (
        <Button
          type="primary"
          onClick={() => {
            const coinAmount = soldAmounts[asset.assetId];
            if (!coinAmount) return;
            removeAsset(asset, coinAmount);
            setSoldAmounts((prev) => {
              const updated = { ...prev };
              delete updated[asset.assetId];
              return updated;
            });
          }}
        >
          sold asset
        </Button>
      ),
    }),
  }));

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}
