/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import React from "react";
import fetchRealCrypto, { fetchAssets } from "../api";
import percentDefference from "../utils";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});
export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  //  const [crypto, setCrypto] = useState([]);
  const [crypto, setCrypto] = useState(()=>{
    const cryptoData=localStorage.getItem('crypto');
    if(cryptoData){
      return JSON.parse(cryptoData);
    }else{
      return []
    }
  });
  // const [assets, setAssets] = useState([])
  const [assets, setAssets] = useState(()=>{
    const assetsData=localStorage.getItem('assets');
    if(assetsData){
      return JSON.parse(assetsData);
    }else{
      return [];
    }
  });

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

  async function preload() {
    const result = await fetchRealCrypto();

    const assets = await fetchAssets();
    setAssets(mapAssets(assets, result));
    setCrypto(result);
    setLoading(false);
  }
  // useEffect(() => {
  //   setLoading(true);
  //   preload();
  // }, []);

  function addAsset(asset) {
    
    setAssets((prev) => {
      const mappedAssets =mapAssets([...prev, asset], crypto);
      localStorage.setItem('assets',JSON.stringify(mappedAssets));
      return mappedAssets;
  });
  }
  async function refreshCrypto() {
    console.log("Refreshing crypto data...");
    setLoading(true);
    const result = await fetchRealCrypto();
    // const assets = await fetchAssets();
    // const mappedAssets=mapAssets(assets, result)
    // setAssets(mappedAssets);
    // localStorage.setItem('assets',JSON.stringify(mappedAssets))
    setCrypto(result);
    localStorage.setItem('crypto',JSON.stringify(result))
    setLoading(false);
    // preload();
  }

  const value = useMemo(
    () => ({ loading, crypto, assets, addAsset, refreshCrypto }),
    [loading, crypto, assets, addAsset, refreshCrypto],
  );

  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
