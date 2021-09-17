// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=967874112&to=2072325312
// Chart docs:
// https://github.com/tradingview/lightweight-charts/blob/master/docs/README.md
import { Fragment, useEffect, useRef, useState } from "react";
import { createChart, LineStyle } from "lightweight-charts"; //npm install --save lightweight-charts
import LoadingSpinner from "../components/ui/LoadingSpinner";

const apiDummyData: any = {
  total: [
    { time: "2021-09-01", value: 13636 },
    { time: "2021-09-02", value: 10006 },
    { time: "2021-09-03", value: 13945 },
    { time: "2021-09-04", value: 17282 },
    { time: "2021-09-05", value: 19482 },
    { time: "2021-09-06", value: 19625 },
    { time: "2021-09-07", value: 17834 },
    { time: "2021-09-08", value: 19355 },
    { time: "2021-09-09", value: 19441 },
    { time: "2021-09-10", value: 16648 },
    { time: "2021-09-11", value: 12194 },
    { time: "2021-09-12", value: 18580 },
    { time: "2021-09-13", value: 18153 },
    { time: "2021-09-14", value: 18140 },
    { time: "2021-09-15", value: 12667 },
    { time: "2021-09-16", value: 14997 },
    { time: "2021-09-17", value: 18088 },
    { time: "2021-09-18", value: 18347 },
    { time: "2021-09-19", value: 14790 },
    { time: "2021-09-20", value: 15068 },
    { time: "2021-09-21", value: 18904 },
    { time: "2021-09-22", value: 15995 },
    { time: "2021-09-23", value: 10853 },
    { time: "2021-09-24", value: 16144 },
    { time: "2021-09-25", value: 14939 },
    { time: "2021-09-26", value: 11515 },
    { time: "2021-09-27", value: 14746 },
    { time: "2021-09-28", value: 14770 },
    { time: "2021-09-29", value: 14062 },
    { time: "2021-09-30", value: 18906 },
    { time: "2021-10-01", value: 14419 },
    { time: "2021-10-02", value: 19377 },
    { time: "2021-10-03", value: 12174 },
    { time: "2021-10-04", value: 11355 },
    { time: "2021-10-05", value: 18708 },
    { time: "2021-10-06", value: 11696 },
    { time: "2021-10-07", value: 15948 },
    { time: "2021-10-08", value: 15102 },
    { time: "2021-10-09", value: 16928 },
    { time: "2021-10-10", value: 12928 },
    { time: "2021-10-11", value: 17392 },
    { time: "2021-10-12", value: 14050 },
    { time: "2021-10-13", value: 14954 },
    { time: "2021-10-14", value: 19532 },
    { time: "2021-10-15", value: 12631 },
    { time: "2021-10-16", value: 13277 },
    { time: "2021-10-17", value: 10337 },
    { time: "2021-10-18", value: 11850 },
    { time: "2021-10-19", value: 13507 },
    { time: "2021-10-20", value: 13307 },
    { time: "2021-10-21", value: 16125 },
    { time: "2021-10-22", value: 16045 },
    { time: "2021-10-23", value: 13234 },
    { time: "2021-10-24", value: 18675 },
    { time: "2021-10-25", value: 17052 },
    { time: "2021-10-26", value: 15123 },
    { time: "2021-10-27", value: 15739 },
    { time: "2021-10-28", value: 13173 },
    { time: "2021-10-29", value: 13111 },
    { time: "2021-10-30", value: 12781 },
  ],
  BTC: [
    { time: "2021-09-01", value: 8312 },
    { time: "2021-09-02", value: 8601 },
    { time: "2021-09-03", value: 7399 },
    { time: "2021-09-04", value: 6656 },
    { time: "2021-09-05", value: 11358 },
    { time: "2021-09-06", value: 8872 },
    { time: "2021-09-07", value: 10648 },
    { time: "2021-09-08", value: 10908 },
    { time: "2021-09-09", value: 10495 },
    { time: "2021-09-10", value: 10019 },
    { time: "2021-09-11", value: 6477 },
    { time: "2021-09-12", value: 10604 },
    { time: "2021-09-13", value: 7505 },
    { time: "2021-09-14", value: 9143 },
    { time: "2021-09-15", value: 10933 },
    { time: "2021-09-16", value: 7246 },
    { time: "2021-09-17", value: 6692 },
    { time: "2021-09-18", value: 9293 },
    { time: "2021-09-19", value: 10047 },
    { time: "2021-09-20", value: 6844 },
    { time: "2021-09-21", value: 11292 },
    { time: "2021-09-22", value: 9664 },
    { time: "2021-09-23", value: 9533 },
    { time: "2021-09-24", value: 10966 },
    { time: "2021-09-25", value: 11365 },
    { time: "2021-09-26", value: 8287 },
    { time: "2021-09-27", value: 6560 },
    { time: "2021-09-28", value: 8178 },
    { time: "2021-09-29", value: 6981 },
    { time: "2021-09-30", value: 7730 },
    { time: "2021-10-01", value: 8697 },
    { time: "2021-10-02", value: 8082 },
    { time: "2021-10-03", value: 10307 },
    { time: "2021-10-04", value: 10233 },
    { time: "2021-10-05", value: 8349 },
    { time: "2021-10-06", value: 9862 },
    { time: "2021-10-07", value: 7886 },
    { time: "2021-10-08", value: 7596 },
    { time: "2021-10-09", value: 9681 },
    { time: "2021-10-10", value: 8911 },
    { time: "2021-10-11", value: 10442 },
    { time: "2021-10-12", value: 7760 },
    { time: "2021-10-13", value: 8501 },
    { time: "2021-10-14", value: 9171 },
    { time: "2021-10-15", value: 8131 },
    { time: "2021-10-16", value: 8416 },
    { time: "2021-10-17", value: 8091 },
    { time: "2021-10-18", value: 11340 },
    { time: "2021-10-19", value: 7987 },
    { time: "2021-10-20", value: 10138 },
    { time: "2021-10-21", value: 8158 },
    { time: "2021-10-22", value: 9960 },
    { time: "2021-10-23", value: 7803 },
    { time: "2021-10-24", value: 8763 },
    { time: "2021-10-25", value: 9463 },
    { time: "2021-10-26", value: 7251 },
    { time: "2021-10-27", value: 10096 },
    { time: "2021-10-28", value: 8160 },
    { time: "2021-10-29", value: 6776 },
    { time: "2021-10-30", value: 7110 },
  ],
  ETH: [
    { time: "2021-09-01", value: 5324 },
    { time: "2021-09-02", value: 1405 },
    { time: "2021-09-03", value: 6546 },
    { time: "2021-09-04", value: 10626 },
    { time: "2021-09-05", value: 8124 },
    { time: "2021-09-06", value: 10753 },
    { time: "2021-09-07", value: 7186 },
    { time: "2021-09-08", value: 8447 },
    { time: "2021-09-09", value: 8946 },
    { time: "2021-09-10", value: 6629 },
    { time: "2021-09-11", value: 5717 },
    { time: "2021-09-12", value: 7976 },
    { time: "2021-09-13", value: 10648 },
    { time: "2021-09-14", value: 8997 },
    { time: "2021-09-15", value: 1734 },
    { time: "2021-09-16", value: 7751 },
    { time: "2021-09-17", value: 11396 },
    { time: "2021-09-18", value: 9054 },
    { time: "2021-09-19", value: 4743 },
    { time: "2021-09-20", value: 8224 },
    { time: "2021-09-21", value: 7612 },
    { time: "2021-09-22", value: 6331 },
    { time: "2021-09-23", value: 1320 },
    { time: "2021-09-24", value: 5178 },
    { time: "2021-09-25", value: 3574 },
    { time: "2021-09-26", value: 3228 },
    { time: "2021-09-27", value: 8186 },
    { time: "2021-09-28", value: 6592 },
    { time: "2021-09-29", value: 7081 },
    { time: "2021-09-30", value: 11176 },
    { time: "2021-10-01", value: 5722 },
    { time: "2021-10-02", value: 11295 },
    { time: "2021-10-03", value: 1867 },
    { time: "2021-10-04", value: 1122 },
    { time: "2021-10-05", value: 10359 },
    { time: "2021-10-06", value: 1834 },
    { time: "2021-10-07", value: 8062 },
    { time: "2021-10-08", value: 7506 },
    { time: "2021-10-09", value: 7247 },
    { time: "2021-10-10", value: 4017 },
    { time: "2021-10-11", value: 6950 },
    { time: "2021-10-12", value: 6290 },
    { time: "2021-10-13", value: 6453 },
    { time: "2021-10-14", value: 10361 },
    { time: "2021-10-15", value: 4500 },
    { time: "2021-10-16", value: 4861 },
    { time: "2021-10-17", value: 2246 },
    { time: "2021-10-18", value: 510 },
    { time: "2021-10-19", value: 5520 },
    { time: "2021-10-20", value: 3169 },
    { time: "2021-10-21", value: 7967 },
    { time: "2021-10-22", value: 6085 },
    { time: "2021-10-23", value: 5431 },
    { time: "2021-10-24", value: 9912 },
    { time: "2021-10-25", value: 7589 },
    { time: "2021-10-26", value: 7872 },
    { time: "2021-10-27", value: 5643 },
    { time: "2021-10-28", value: 5013 },
    { time: "2021-10-29", value: 6335 },
    { time: "2021-10-30", value: 5671 },
  ],
};

const assets = Object.keys(apiDummyData);
const assetColors: string[] = [];
assets.splice(assets.indexOf("total"), 1); // now assets is an array of all the coins (i.e. it removed 'total' from the array)

const rndInt = () => {
  return Math.floor(Math.random() * 150) + 75;
};

const TradingViewChart: React.FC<{}> = () => {
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  /* need useEffect in order to interact with the chart
  note: format for the chart data must be like this:
   [{time: yyyy-mm-dd, value: 123},{time: yyyy-mm-dd, value: 123},.... ] */
  useEffect(() => {
    // creates an empty grid for the chart
    const chart = createChart(ref.current!, {
      width: 400,
      height: 300,
      localization: {
        dateFormat: "dd MMM yy",
      },
      watermark: {
        color: "rgba(11, 94, 29, 0.4)",
        visible: true,
        text: "Your portfolio",
        fontSize: 24,
        horzAlign: "left",
        vertAlign: "bottom",
      },
    });

    // for total ; adds an area series to the chart
    const areaSeries = chart.addAreaSeries();
    areaSeries.setData(apiDummyData.total);
    areaSeries.applyOptions({
      lineColor: "#8B0000",
      topColor: "rgba(100,0,0,0.5)",
      bottomColor: "rgba(100,0,0,0.05)",
      lineStyle: LineStyle.Solid,
      lineWidth: 2,
    });

    // generates a line series for each asset to the chart
    for (let asset of assets) {
      const assetColor = `rgb(${rndInt()},${rndInt()},${rndInt()})`;
      const assetColorObject: any = {};
      assetColorObject[asset] = assetColor;
      assetColors.push(assetColorObject);
      const lineSeries = chart.addLineSeries();
      lineSeries.setData(apiDummyData[asset]);
      lineSeries.applyOptions({
        color: assetColor,
        lineWidth: 2,
      });
    }
    setIsLoading(false);
  }, []);

  // setting the labels for the asset at the bottom of the chart
  const assetLabels = isLoading ? (
    <LoadingSpinner />
  ) : (
    assetColors.map((item) => (
      <span key={Object.keys(item)[0]}>
        <span style={{ color: `${Object.values(item)[0]}`, fontSize: "30px" }}>
          &#9632;{" "}
        </span>
        <span>{Object.keys(item)[0]} </span>
      </span>
    ))
  );

  return (
    <Fragment>
      <div ref={ref} />
      <div>{assetLabels}</div>
    </Fragment>
  );
};

export default TradingViewChart;
