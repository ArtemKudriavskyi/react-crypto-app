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
  headers: {'X-API-KEY': 'ULuMigpkcdI2mXg4G9KdlFtv5K+sQ4i4RjQsAIZa1uA='}
};

export default function fetchRealCrypto() {
  return fetch('https://openapiv1.coinstats.app/coins', options)
    .then(res => res.json())
    .then(res => res.result)
    .catch(err => console.error(err));
}

