import React, { useContext } from "react";
import { Grid, Layout, Spin } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import CryptoContext from "../../context/crypto-context";

const {useBreakpoint} = Grid;

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);
  const screens = useBreakpoint();
  const isMobile =screens.xs || (screens.sm && !screens.md); // Consider mobile if xs or sm breakpoint is active

  if (loading) {
    return <Spin size="large" fullscreen />;
  }
  return (
    <Layout>
      <AppHeader isMobile={isMobile} />
      <Layout style={{flexDirection:isMobile?'column':'row'}} hasSider={!isMobile}>
        <AppSider  isMobile={isMobile} screens={screens}/>
        <AppContent />
      </Layout>
    </Layout>
  );
}
