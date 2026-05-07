/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import React from "react";
import fetchRealCrypto from "../api";
import percentDifference from "../utils";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});
export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState(() => {
    const cryptoData = localStorage.getItem("crypto");
    return cryptoData ? JSON.parse(cryptoData) : [];
  });

  const [assets, setAssets] = useState(() => {
    const assetsData = localStorage.getItem("assets");
    return assetsData ? JSON.parse(assetsData) : [];
  });

  useEffect(() => {
    if (!crypto.length) {
      refreshCrypto();
    }
  }, []);

  function mapAssets(assets, result) {
    return assets
      .map((asset) => {
        const coin = result.find((item) => item.id === asset.id);
        if (!coin) return null;
        return {
          ...asset,
          grow: asset.price < coin.price,
          growPercent: percentDifference(asset.price, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * coin.price - asset.amount * asset.price,
          name: coin.name,
        };
      })
      .filter(Boolean);
  }
  const mappedAssets = useMemo(() => {
    return mapAssets(assets, crypto);
  }, [assets, crypto]);
  // async function preload() {

  //   setAssets(mapAssets(assets, crypto));
  //   localStorage.setItem('assets',JSON.stringify(mapAssets(assets, crypto)))
  //   // setCrypto(crypto);
  //   setLoading(false);
  // }
  // useEffect(() => {
  //   setLoading(true);
  //   preload();
  // }, [crypto]);

  function addAsset(asset) {
    setAssets((prev) => {
      // const mappedAssets = mapAssets([...prev, asset], crypto);
      // localStorage.setItem("assets", JSON.stringify(mappedAssets));
      // return mappedAssets;
      const updated = [...prev, asset];
      localStorage.setItem("assets", JSON.stringify(updated));
      return updated;
    });
  }

  function removeAsset(asset, coinAmount) {
    // setAssets((prev) => {
    //   const filteredAssets = prev.filter((coin) => coin != asset);
    //   localStorage.setItem("assets", JSON.stringify(filteredAssets));
    //   return filteredAssets;
    // });
    // console.log("asset.amount", asset.amount);
    // if (asset.amount > coinAmount) {
    //   const newAsset = asset;
    //   newAsset.amount = asset.amount - coinAmount;
    //   addAsset(newAsset);
    // }
    setAssets((prev) => {
      const updated = prev
        .map((coin) => {
          if (coin.id != asset.id) return coin;
          const newAmount = coin.amount - coinAmount;
          if (newAmount <= 0) return null;
          return {
            ...coin,
            amount: newAmount,
          };
        })
        .filter(Boolean);

      localStorage.setItem("assets", JSON.stringify(updated));
      return updated;
    });
  }

  async function refreshCrypto() {
    try{
      setLoading(true);
      const result = await fetchRealCrypto();
      // const assets = await fetchAssets();
      // const mappedAssets=mapAssets(assets, result)
      // setAssets(mappedAssets);
      // localStorage.setItem('assets',JSON.stringify(mappedAssets))
      setCrypto(result);
      localStorage.setItem("crypto", JSON.stringify(result));
    }finally{
      setLoading(false);
    }
    // preload();
  }

  const value = useMemo(
    () => ({
      loading,
      crypto,
      assets: mappedAssets,
      addAsset,
      removeAsset,
      refreshCrypto,
    }),
    [loading, crypto, mappedAssets],
  );

  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
