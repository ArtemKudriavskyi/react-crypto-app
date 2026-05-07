/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, InputNumber, Table } from "antd";
import { useCrypto } from "../context/crypto-context";

const BaseColumns = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    // filters: [
    //   {
    //     text: "Joe",
    //     value: "Joe",
    //   },
    //   {
    //     text: "Jim",
    //     value: "Jim",
    //   },
    //   {
    //     text: "Submenu",
    //     value: "Submenu",
    //     children: [
    //       {
    //         text: "Green",
    //         value: "Green",
    //       },
    //       {
    //         text: "Black",
    //         value: "Black",
    //       },
    //     ],
    //   },
    // ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
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
    // onFilter: (value, record) => record.amount.indexOf(value) === 0,
  },
];
const sellColums = [
  {
    title: "Amount to sold",
    dataIndex: "amountToSold",
  },
  { title: "Sold", dataIndex: "sold" },
];
export default function AssetsTable({addAsset=false}) {
  const { assets, removeAsset } = useCrypto();
  // const [coinSold, setCoinSold] = useState();
  // const [coinAmount, setCoinAmount] = useState();
  const [soldAmounts,setSoldAmounts]=useState({});

  const columns = addAsset ? [...BaseColumns, ...sellColums] : BaseColumns;

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
    ...(addAsset && {
      amountToSold: (
        <InputNumber
          min={0}
          max={asset.amount}
          step={0.1}
          value={soldAmounts[asset.id]??null}
          onChange={(value) => {
            // setCoinSold(asset);
            // setCoinAmount(value);
           setSoldAmounts(prev=>({
            ...prev,
            [asset.id]:value
           }))
          }}
        />
      ),
      sold: (
        <Button
          type="primary"
          onClick={() => {
            // removeAsset(coinSold, coinAmount);
            // console.log(coinSold);
            // console.log(coinAmount);
            const coinAmount=soldAmounts[asset.id];
            if(!coinAmount)return;
            removeAsset(asset,coinAmount);
            setSoldAmounts(prev=>{
              const updated={...prev};
              delete updated[asset.id];
              return updated;
            })
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
