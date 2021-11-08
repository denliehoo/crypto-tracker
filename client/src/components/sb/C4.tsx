import Highcharts from 'highcharts' // npm i highcharts highcharts-react-official
import HighchartsReact from 'highcharts-react-official'

//donut chart
const C4: React.FC<any> = (props) => {
    const data = props.data;
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
            text: 'Daily PNL(%)',
            align: 'left'
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
            },

        },
        tooltip: { // tool tip is the 'pop up' box when hovering over a point
            valueSuffix: '%', // format to ahve a % sign
            valueDecimals: 2,
            borderColor: 'transparent',
            backgroundColor: '#F5FCFF',
            borderRadius: 20, // rounds the edges
            // pointFormat: '<b>{point.y}</b>',

        },

        // chart related data and formatting
        series: [{
            // first series
            name: "Cumulative PNL(%)",
            data: pnlData, // data must be in array form
            type: 'column',
            color: 'red'
        },
        {
            // second series
            name: "Cumulative BTC Trend",
            data: btcData, // data must be in array form
            type: 'column',
            color: 'blue'
        }

        ], // end of chart related data
    }


    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default C4;