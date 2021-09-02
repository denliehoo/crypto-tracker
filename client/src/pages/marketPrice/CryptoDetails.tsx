// import classes from "./CryptoDetails.module.css";
import { useParams } from "react-router";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { Fragment } from "react";
const CryptoDetails: React.FC<{}> = () => {
  const { asset } = useParams<{ asset: string }>();
  return (
    <Fragment>
      <h1>Details for {asset}</h1>
      <AdvancedRealTimeChart
        symbol={`BINANCE:${asset}USDT`}
        timezone="Asia/Singapore"
      />
    </Fragment>
  );
};

export default CryptoDetails;
