import Highcharts from 'highcharts' // npm i highcharts highcharts-react-official
import HighchartsReact from 'highcharts-react-official'
//https://www.npmjs.com/package/highcharts-react-official
// https://api.highcharts.com/highcharts/    <-- docs


const SB2C1: React.FC<{ data: any; showBtc: boolean; showPnl: boolean; title: string }> = (props) => {
    const dateConverter = (d: any) => {
        d = d.split("/")
        d[1] = d[1].length == 1 ? d[1] = '0' + d[1] : d[1]
        return `${d[2]}-${d[0]}-${d[1]}`
    }

    const data = props.data;
    const showBtc = props.showBtc;
    const showPnl = props.showPnl;
    const title = props.title;
    let pnlData = [];
    let btcData = [];
    let dateData = []; // yyyy-mm-dd format ; current format is mm/d/yyyy
    for (let d of data.cpnl) {
        pnlData.push(parseFloat((d.value).toFixed(2)))
        dateData.push(dateConverter(d.time)) //yyyy-mm-dd format
    }
    for (let d of data.btcTrend) {
        btcData.push(parseFloat((d.value).toFixed(2)))
    }

    const options: Highcharts.Options = {
        title: {
            text: title,
            align: 'left'
        },
        chart: {
            height: 400, // in px
            width: 600,
        },
        legend: {
            enabled: (showPnl && showBtc) // if either showPnl or showBtc is false, enabled will become false
        },
        xAxis: {
            categories: dateData, // data must be in array form
            // tickInterval: 6,
            labels: { // rotates the labels
                autoRotation: [0, -90], // rotates the label to either be horizontal or vertical (depending on how much space is given)
                // step is the amount of intervals before the next date is shown ; i.e. step: 1 means all dates are shown ; step: 2 means show every 2 date labels...
                step: 6,
                // formatter: function (this: any) {
                //     // return this.value  // able to change the label format here if want to
                //     return Highcharts.dateFormat('%d %b %y', this.value);
                // }

            }

        },
        yAxis: {
            title: {
                text: "" // removes the y-axis text
            },
            labels: {
                format: '{text}',
            }
        },
        tooltip: { // tool tip is the 'pop up' box when hovering over a point
            // valueSuffix: '%', // format to ahve a % sign
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

export default SB2C1;