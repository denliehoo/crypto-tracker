import Highcharts from 'highcharts' // npm i highcharts highcharts-react-official
import HighchartsReact from 'highcharts-react-official'

//donut chart
const C3: React.FC<{}> = (props) => {
    const options: Highcharts.Options = {
        title: {
            text: 'Asset Net Worth',
            align: 'left'
        },
        xAxis: {
            categories: ['10-06', '10-07', '10-08', '10-09', '10-10', '10-11', '10-12'] // data must be in array form
        },
        yAxis: {
            title: {
                text: "" // removes the y-axis text
            },
            labels: {
                format: '${text}', // formats the yAxis to have a % sign at the end
            },
            min: 0, // sets the min value for y axis to be 0
        },
        tooltip: { // tool tip is the 'pop up' box when hovering over a point
            valuePrefix: '$', // format to ahve a % sign
            borderColor: 'transparent',
            backgroundColor: '#F5FCFF',
            borderRadius: 20, // rounds the edges
            pointFormat: '<b>{point.y}</b>',

        },
        legend: {
            enabled: false
        },
        // chart related data and formatting
        series: [{
            // first series
            name: "Asset Net Worth",
            data: [20, 22, 25, 23, 25, 30, 20], // data must be in array form
            type: 'area',
            lineColor: 'rgb(255,0,0)', // line chart color
            threshold: null, // if values are negative, fill area will still be below the line
            fillColor: { //area below chart color
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, 'rgba(238,232,170,0.9)'],
                    [1, 'rgba(238,232,170,0.01)']
                ]
            },
            color: 'rgb(255,0,0)', // color for legend
            marker: { // the dot on the plot
                symbol: 'circle',
                fillColor: '#FFFFFF',
                lineColor: 'rgb(255,0,0)', // 
                lineWidth: 2,
            },

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
};

export default C3;