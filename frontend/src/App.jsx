import React from "react";
import { CryptoContextProvider } from "./context/crypto-context";
import AppLayout from "./components/layouts/AppLayout";

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}
