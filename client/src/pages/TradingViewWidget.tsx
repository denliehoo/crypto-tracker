// import classes from "./TradingViewWidget.module.css";
//npm install --save react-tradingview-widget
//https://github.com/rafaelklaessen/react-tradingview-widget

// import TradingViewWidget, { Themes } from "react-tradingview-widget";

// const TradingViewWidgetPage: React.FC<{}> = () => {
//   return (
//     <TradingViewWidget
//       symbol="KRAKEN:ETHUSDT"
//       theme={Themes.DARK}
//       timezone="Asia/Singapore"
//     />
//   );
// };

// export default TradingViewWidgetPage;

// ignore above

import {
  AdvancedRealTimeChart,
  TechnicalAnalysis,
  MiniChart,
  TickerTape,
} from "react-ts-tradingview-widgets";

const TradingViewWidgetPage: React.FC<{}> = () => {
  const tickerTapeSymbols = [
    {
      proName: "KRAKEN:ADAUSD	",
      title: "ADA/USD",
    },
    {
      proName: "BINANCE:SOLUSD",
      title: "SOL/USD",
    },
    {
      proName: "BITSTAMP:BTCUSD",
      title: "BTC/USD",
    },
    {
      proName: "BITSTAMP:ETHUSD",
      title: "ETH/USD",
    },
  ];

  return (
    <div>
      <h1>Widgets demo</h1>
      <h2>Real Time Chart</h2>
      <AdvancedRealTimeChart
        symbol="KRAKEN:ETHUSDT"
        theme="dark"
        timezone="Asia/Singapore"
      />
      <h2>TA Indicator</h2>
      <TechnicalAnalysis colorTheme="dark" symbol="KRAKEN:ETHUSDT" />
      <h2>Mini Chart</h2>
      <MiniChart symbol="BINANCE:BTCUSDT" />
      <h2>Ticker Tape</h2>

      <TickerTape colorTheme="dark" symbols={tickerTapeSymbols} />
    </div>
  );
};

export default TradingViewWidgetPage;
