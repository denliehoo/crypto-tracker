import Highcharts from 'highcharts' // npm i highcharts highcharts-react-official
import HighchartsReact from 'highcharts-react-official'
//https://www.npmjs.com/package/highcharts-react-official
// https://api.highcharts.com/highcharts/    <-- docs


const C1: React.FC<{ data: any; showBtc: boolean; showPnl: boolean; title: string }> = (props) => {
    const data = props.data;
    const showBtc = props.showBtc;
    const showPnl = props.showPnl;
    const title = props.title;
    let pnlData = [];
    let btcData = [];
    let dateData = [];
    for (let d of data.pnl) {
        pnlData.push(parseFloat((d.value * 100).toFixed(2))) // to percentge
        dateData.push(d.time.slice(5, 10)) //mm-dd format
    }
    for (let d of data.btcTrend) {
        btcData.push(parseFloat((d.value * 100).toFixed(2))) // to percentage
    }

    const options: Highcharts.Options = {
        title: {
            text: title,
            align: 'left'
        },
        chart: {
            height: 300, // in px
            width: 600,
        },
        xAxis: {
            categories: dateData // data must be in array form
        },
        yAxis: {
            title: {
                text: "" // removes the y-axis text
            },
            labels: {
                format: '{text}%', // formats the yAxis to have a % sign at the end
            }
        },
        tooltip: { // tool tip is the 'pop up' box when hovering over a point
            valueSuffix: '%', // format to ahve a % sign
            borderColor: 'transparent',
            backgroundColor: '#F5FCFF',
            borderRadius: 20 // rounds the edges
        },
        // chart related data and formatting
        series: [{
            // first series
            name: "Cumulative PNL",
            data: pnlData, // data must be in array form
            type: 'areaspline',
            visible: showPnl,
            lineColor: 'rgb(255,0,0)', // line chart color
            threshold: null, // if values are negative, fill area will still be below the line
            fillColor: { //area below chart color
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, 'rgba(0,200,0,0.3)'],
                    [1, 'rgba(0,100,0,0.01)']
                ]
            },
            color: 'rgb(255,0,0)', // color for legend
            marker: { // the dot on the plot
                symbol: 'circle',
                fillColor: '#FFFFFF',
                lineColor: 'rgb(255,0,0)', // 
                lineWidth: 2,
            },

        }, // 2nd series
        {
            name: "Cumulative BTC Trend",
            // data: btcData, // data must be in array form
            data: btcData, // data must be in array form
            type: 'areaspline',
            visible: showBtc,
            lineColor: 'rgb(0,0,255)',
            color: 'rgb(0,0,255)',
            threshold: null,
            fillColor: { //area below chart color
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, 'rgba(0,0,255,0.2)'],
                    [1, 'transparent']
                ]
            },
            marker: {
                symbol: 'circle',
                fillColor: '#FFFFFF', // circle fill color
                lineColor: 'rgb(0,0,255)', // circle line color
                lineWidth: 2
            }
        }], // end of chart related data


    }



    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>

    );
}

export default C1;