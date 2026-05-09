# React Crypto Portfolio App

A cryptocurrency portfolio tracker built with React. The app allows users to browse real cryptocurrency data, add assets to a personal portfolio, track current value and profit/loss, and sell selected asset amounts.

## Demo

Live demo: https://react-crypto-app552.netlify.app

## Screenshots


## Features

- Fetch real cryptocurrency market data from the CoinStats API
- Search coins and view detailed coin information
- Add crypto assets to a personal portfolio
- Store portfolio data in localStorage
- Calculate current asset value, profit/loss, and growth percentage
- Sell part or all of an asset
- Display portfolio allocation with a chart
- Show assets in a sortable table
- Loading state while fetching data

## Tech Stack

- React
- Vite
- Ant Design
- Chart.js
- react-chartjs-2
- Context API
- localStorage
- CoinStats API
- ESLint

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ArtemKudriavskyi/react-crypto-app.git
cd react-crypto-app/frontend
```

### 2. Install dependencies

```bash
npm install
```


### 3. Run the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Project Structure

```txt
frontend/
  src/
    components/
      AddAssetForm.jsx
      AssetsTable.jsx
      CoinInfo.jsx
      CoinInfoModal.jsx
      PortfolioChart.jsx
      SoldAssetForm.jsx
      layouts/
        AppHeader.jsx
        AppLayout.jsx
        AppSider.jsx
        AppContent.jsx
    context/
      crypto-context.jsx
    api.js
    App.jsx
    main.jsx
    utils.js
```



### Add Asset

Users can select a cryptocurrency, enter the purchase amount, price, and date. The asset is saved to localStorage and displayed in the portfolio.

### Portfolio Tracking

The app calculates the current value of each asset, total portfolio value, profit or loss, growth percentage, and asset distribution.

### Sell Asset

Users can sell a selected amount of an asset. If the sold amount is equal to or greater than the current amount, the asset is removed from the portfolio.

## What I Learned

While building this project, I practiced:

- Managing global state with React Context
- Working with external APIs
- Building forms with validation
- Using Ant Design components
- Creating charts with Chart.js
- Persisting data in localStorage
- Structuring a React application
- Handling derived state and portfolio calculations

## Future Improvements

- Add authentication
- Store portfolio data on a backend instead of localStorage
- Add transaction history
- Add asset editing
- Improve API error handling
- Add unit tests
- Add a dark/light theme toggle
- Improve dashboard analytics
- Add currency selection

## Author

Artem Kudriavskyi

GitHub: [ArtemKudriavskyi](https://github.com/ArtemKudriavskyi)
