import Highcharts from 'highcharts' // npm i highcharts highcharts-react-official
import HighchartsReact from 'highcharts-react-official'

//bar chart
const SB2C4: React.FC<any> = (props) => {


    const data = props.data;
    let pnlData = [];
    let btcData = [];
    let dateData = [];
    for (let d of data.categories) {
        dateData.push(d.slice(0, 10)) //yyyy-mm-dd format
    }
    for (let d of data.series[0].data) {
        pnlData.push(parseFloat((d).toFixed(2)))
    }
    for (let d of data.series[1].data) {
        btcData.push(parseFloat((d).toFixed(2)))
    }


    const options: Highcharts.Options = {
        title: {
            text: 'Daily PNL(%)',
            align: 'left'
        },
        xAxis: {
            categories: dateData, // data must be in array form
            labels: { // rotates the labels
                autoRotation: [0, -90], // rotates the label to either be horizontal or vertical (depending on how much space is given)
                // step is the amount of intervals before the next date is shown ; i.e. step: 1 means all dates are shown ; step: 2 means show every 2 date labels...
                step: 6,
                formatter: function (this: any) {
                    return this.value  // able to change the label format here if want to
                }

            }
        },
        yAxis: {
            title: {
                text: "" // removes the y-axis text
            },
            labels: {
                format: '{text}',
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

export default SB2C4;