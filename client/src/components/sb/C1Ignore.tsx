import { Fragment, useEffect, useRef, useState } from "react";
import { createChart, LineStyle } from "lightweight-charts"; //npm install --save lightweight-charts


const C1Ignore: React.FC<any> = (props) => {
    const data = props.data
    console.log(data.pnl)
    const ref = useRef(null);
    useEffect(() => {
        // creates an empty grid for the chart
        const chart = createChart(ref.current!, {
            width: 600,
            height: 300,
            localization: {
                dateFormat: "dd MMM",
            },
            leftPriceScale: {
                visible: true,
                borderColor: 'transparent'
            },
            rightPriceScale: {
                visible: false
            },
            timeScale: {
                visible: true,
                borderColor: 'transparent'
            },


            grid: {
                vertLines: {
                    visible: false
                },
            }
        });

        // pnl (bottom)
        const areaSeries = chart.addAreaSeries();
        areaSeries.setData(data.pnl);
        areaSeries.applyOptions({
            lineColor: "rgb(255,0,0)",
            topColor: "rgba(0,255,0,0.5)",
            bottomColor: "rgba(0,255,0,0.05)",
            lineStyle: LineStyle.Solid,
            lineWidth: 2,
            priceLineVisible: false,
            priceFormat: {
                type: 'custom',
                formatter: (price: number) => price.toFixed(2) + '%',
            }
        });

        //btc (top)
        const areaSeries2 = chart.addAreaSeries();
        areaSeries2.setData(data.btcTrend);
        areaSeries2.applyOptions({
            lineColor: "rgb(0,0,255)",
            topColor: "rgba(0,0,255,0.1)",
            // bottomColor: "rgba(0,255,0,0.05)",
            lineStyle: LineStyle.Solid,
            lineWidth: 2,
            priceLineVisible: false,
        });
        chart.timeScale().fitContent();
    }, []);

    const labels = <div>
        <span style={{ color: `rgb(255,0,0)`, fontSize: "14px" }}>
            &#9632;{" "} Cumulative PNL(%)
        </span>
        <span style={{ color: `rgb(0,0,255)`, fontSize: "14px" }}>
            &#9632;{" "} Cumulative BTC Trend
        </span>
    </div>;

    return (
        <div>

            <div ref={ref} />
            <div>{labels}</div>
        </div>
    );

};

export default C1Ignore;