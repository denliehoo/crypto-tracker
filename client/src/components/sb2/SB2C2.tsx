import Highcharts from 'highcharts' // npm i highcharts highcharts-react-official
import HighchartsReact from 'highcharts-react-official'

//donut chart
const C2: React.FC<{}> = (props) => {

    const assetData = [{ // data for the donut; format has to be name and y; assume data is in $ value
        name: 'USDT',
        y: 44.7,
    }, {
        name: 'BNB',
        y: 12.08
    }, {
        name: 'LUNA',
        y: 8.73
    }, {
        name: 'FTM',
        y: 7.83
    }, {
        name: 'DOT',
        y: 3.83
    }, {
        name: 'Other',
        y: 23.06
    }]
    let totalAmount = 0;
    for (let a of assetData) {
        totalAmount += a.y
    }
    console.log(totalAmount)

    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false, // removes the outter border for the figure
            type: 'pie'
        },
        title: {
            text: 'Asset Allocation',
            align: 'left'
        },
        tooltip: {
            // pointFormat: '<b>{point.percentage:.1f}%</b>'
            formatter: function (this: any) {
                return `<b>${this.point.name}:</b> $${this.y}  <br> ${((this.y) * 100 / totalAmount).toFixed(2)}%`
            },
            borderColor: 'transparent',
            backgroundColor: '#F5FCFF',
            borderRadius: 20
        },
        plotOptions: {
            pie: {
                shadow: false,
                innerSize: '60%', // controls the size of the donut
                cursor: 'pointer',
                dataLabels: {
                    enabled: false //removes the datalabels
                },
                showInLegend: true // shows legend
            }
        },
        legend: { //formats the legend
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical',
            labelFormatter: function (this: any) {
                return `${this.name} ${((this.y) * 100 / totalAmount).toFixed(2)}%`
            }
        },
        series: [{
            name: 'Propotion',
            colorByPoint: true,
            shadow: true,
            data: assetData
        }]

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

export default C2;