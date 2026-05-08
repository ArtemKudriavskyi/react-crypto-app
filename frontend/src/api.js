import { cryptoAssets, cryptoData } from "./data";

export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 1000);
  });
}

export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}
const options = {
  method: 'GET',
  headers: {'X-API-KEY': import.meta.env.VITE_COINSTATS_API_KEY}
};

export default function fetchRealCrypto() {
  return fetch('https://openapiv1.coinstats.app/coins', options)
    .then(res => res.json())
    .then(res => res.result)
    .catch(err => console.error(err));
}

