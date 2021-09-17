import {
  AdvancedRealTimeChart,
  TechnicalAnalysis,
  MiniChart,
  TickerTape,
} from "react-ts-tradingview-widgets"; //npm i react-ts-tradingview-widgets
// DOCS https://github.com/JorrinKievit/react-ts-tradingview-widgets

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
