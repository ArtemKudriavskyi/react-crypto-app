import React, { useEffect, useState } from "react";
import { Button, Drawer, Layout, Modal, Select, Space } from "antd";
import { useCrypto } from "../../context/crypto-context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";
import { RedoOutlined } from "@ant-design/icons";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#ccc",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const { crypto, refreshCrypto } = useCrypto();

  useEffect(() => {
    function keypress(e) {
      if (e.key === "/") {
        setSelect((prev) => !prev);
      }
    }
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value, option) {
    console.log("Selected:", value, option);
    setSelect((prev) => !prev);
    setModal(true);
    setCoin(crypto.find((c) => c.id === value));
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        value="press / to open"
        // optionLabelProp="label"
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        open={select}
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
      <Button type="link" icon={<RedoOutlined  />} onClick={refreshCrypto}>
        Refresh
      </Button>
     
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        destroyOnHidden
        size={600}
        title="Add asset"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setDrawer(false)}
        open={drawer}
      >
        <AddAssetForm onClose={()=>setDrawer(false)}></AddAssetForm>
      </Drawer>
    </Layout.Header>
  );
}
