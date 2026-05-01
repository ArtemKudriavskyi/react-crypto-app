/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import React from "react";
import { fakeFetchCrypto, fetchAssets } from "../api";
import percentDefference from "../utils";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((item) => item.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDefference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };

    });
  }

  useEffect(() => {
    setLoading(true);
    async function preload() {
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();
      setAssets(mapAssets(assets, result ),
      );
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(asset) {
    setAssets((prev) => mapAssets([...prev, asset],crypto));
  }

  const value = useMemo(
    () => ({ loading, crypto, assets, addAsset }),
    [loading, crypto, assets, addAsset],
  );

  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
