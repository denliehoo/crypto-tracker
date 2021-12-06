import SB2C1 from "../components/sb2/SB2C1";
import SB2C2 from "../components/sb2/SB2C2";
import SB2C3 from "../components/sb2/SB2C3";
import SB2C4 from "../components/sb2/SB2C4";

import axios from "axios";
import { useEffect, useState } from "react";

const data1: any = {
    btcTrend: [
        { time: "2021-10-06", value: 0.15 },
        { time: "2021-10-07", value: 0.1 },
        { time: "2021-10-08", value: 0.12 },
        { time: "2021-10-09", value: 0.14 },
        { time: "2021-10-10", value: 0.13 },
        { time: "2021-10-11", value: 0.2 },
        { time: "2021-10-12", value: 0.18 },
    ],
    pnl: [
        { time: "2021-10-06", value: 0 },
        { time: "2021-10-07", value: 0.04 },
        { time: "2021-10-08", value: 0.03 },
        { time: "2021-10-09", value: 0.04 },
        { time: "2021-10-10", value: -0.03 },
        { time: "2021-10-11", value: 0 },
        { time: "2021-10-12", value: -0.01 },
    ]
}



const cpnlData: any = {
    "cpnl": [
        {
            "time": "11/2/2021",
            "value": 0.0
        },
        {
            "time": "11/3/2021",
            "value": -6.81
        },
        {
            "time": "11/4/2021",
            "value": -6.81
        },
        {
            "time": "11/5/2021",
            "value": -2.04
        },
        {
            "time": "11/6/2021",
            "value": -1233176.5
        },
        {
            "time": "11/8/2021",
            "value": -1233176.5
        },
        {
            "time": "11/9/2021",
            "value": -1233176.5
        },
        {
            "time": "11/10/2021",
            "value": -1233176.5
        },
        {
            "time": "11/11/2021",
            "value": -826793.3
        },
        {
            "time": "11/12/2021",
            "value": 1714735.5
        },
        {
            "time": "11/13/2021",
            "value": -10882320.2
        },
        {
            "time": "11/15/2021",
            "value": -8982015.83
        },
        {
            "time": "11/16/2021",
            "value": -8982015.83
        },
        {
            "time": "11/17/2021",
            "value": -8982015.83
        },
        {
            "time": "11/18/2021",
            "value": -8982015.83
        },
        {
            "time": "11/19/2021",
            "value": -8776565.37
        },
        {
            "time": "11/20/2021",
            "value": -8776565.37
        },
        {
            "time": "11/22/2021",
            "value": -8284711.86
        },
        {
            "time": "11/23/2021",
            "value": -8284712.01
        },
        {
            "time": "11/24/2021",
            "value": -7843229.21
        },
        {
            "time": "11/25/2021",
            "value": -7843229.21
        },
        {
            "time": "11/26/2021",
            "value": -7843264.28
        },
        {
            "time": "11/27/2021",
            "value": -7843283.03
        },
        {
            "time": "11/29/2021",
            "value": -7843305.0
        },
        {
            "time": "11/30/2021",
            "value": -7843305.0
        },
        {
            "time": "12/1/2021",
            "value": -7843303.53
        }
    ],
    "btcTrend": [
        {
            "time": "11/2/2021",
            "value": 0.0
        },
        {
            "time": "11/3/2021",
            "value": 0.0
        },
        {
            "time": "11/4/2021",
            "value": 0.0
        },
        {
            "time": "11/5/2021",
            "value": 0.0
        },
        {
            "time": "11/6/2021",
            "value": -1233309.21
        },
        {
            "time": "11/8/2021",
            "value": -1233309.21
        },
        {
            "time": "11/9/2021",
            "value": -1233309.21
        },
        {
            "time": "11/10/2021",
            "value": -1233309.21
        },
        {
            "time": "11/11/2021",
            "value": -826926.01
        },
        {
            "time": "11/12/2021",
            "value": 1693544.4
        },
        {
            "time": "11/13/2021",
            "value": -10670735.7
        },
        {
            "time": "11/15/2021",
            "value": -8770431.33
        },
        {
            "time": "11/16/2021",
            "value": -8770431.33
        },
        {
            "time": "11/17/2021",
            "value": -8770431.33
        },
        {
            "time": "11/18/2021",
            "value": -8770431.33
        },
        {
            "time": "11/19/2021",
            "value": -8564980.88
        },
        {
            "time": "11/20/2021",
            "value": -8564980.88
        },
        {
            "time": "11/22/2021",
            "value": -8073117.06
        },
        {
            "time": "11/23/2021",
            "value": -8073117.06
        },
        {
            "time": "11/24/2021",
            "value": -7631625.39
        },
        {
            "time": "11/25/2021",
            "value": -7631625.39
        },
        {
            "time": "11/26/2021",
            "value": -7631635.49
        },
        {
            "time": "11/27/2021",
            "value": -7631640.02
        },
        {
            "time": "11/29/2021",
            "value": -7631661.99
        },
        {
            "time": "11/30/2021",
            "value": -7631661.99
        },
        {
            "time": "12/1/2021",
            "value": -7631660.52
        }
    ]
}

const anwData: any = {
    "cpnl": [
        {
            "time": "11/2/2021",
            "value": -9014.63
        },
        {
            "time": "11/3/2021",
            "value": 5.18
        },
        {
            "time": "11/4/2021",
            "value": 3701.7
        },
        {
            "time": "11/5/2021",
            "value": -240.55
        },
        {
            "time": "11/6/2021",
            "value": -0.8
        },
        {
            "time": "11/8/2021",
            "value": 6.99
        },
        {
            "time": "11/9/2021",
            "value": 58.04
        },
        {
            "time": "11/10/2021",
            "value": -0.58
        },
        {
            "time": "11/11/2021",
            "value": 2.58
        },
        {
            "time": "11/12/2021",
            "value": -0.18
        },
        {
            "time": "11/13/2021",
            "value": -231804.83
        },
        {
            "time": "11/15/2021",
            "value": -980.72
        },
        {
            "time": "11/16/2021",
            "value": -366.8
        },
        {
            "time": "11/17/2021",
            "value": -3.12
        },
        {
            "time": "11/18/2021",
            "value": -10503.88
        },
        {
            "time": "11/19/2021",
            "value": 0.0
        },
        {
            "time": "11/20/2021",
            "value": -5.6
        },
        {
            "time": "11/22/2021",
            "value": 19.36
        },
        {
            "time": "11/23/2021",
            "value": -11.12
        },
        {
            "time": "11/24/2021",
            "value": -20.58
        },
        {
            "time": "11/25/2021",
            "value": -2.05
        },
        {
            "time": "11/26/2021",
            "value": -6397.21
        },
        {
            "time": "11/27/2021",
            "value": -31.76
        },
        {
            "time": "11/29/2021",
            "value": -27.7
        },
        {
            "time": "11/30/2021",
            "value": 45.51
        },
        {
            "time": "12/1/2021",
            "value": 1.47
        }
    ],
    "btcTrend": []
}

const profitData: any = {
    "cpnl": [
        {
            "time": "11/2/2021",
            "value": 0.0
        },
        {
            "time": "11/3/2021",
            "value": 77037.13
        },
        {
            "time": "11/5/2021",
            "value": 53654.92
        },
        {
            "time": "11/6/2021",
            "value": -3799171.93
        },
        {
            "time": "11/8/2021",
            "value": 59149.88
        },
        {
            "time": "11/9/2021",
            "value": 358397.66
        },
        {
            "time": "11/10/2021",
            "value": 0.03
        },
        {
            "time": "11/11/2021",
            "value": 406383.2
        },
        {
            "time": "11/12/2021",
            "value": 3573182.59
        },
        {
            "time": "11/13/2021",
            "value": -26603956.04
        },
        {
            "time": "11/15/2021",
            "value": 4100751.48
        },
        {
            "time": "11/16/2021",
            "value": -358.93
        },
        {
            "time": "11/19/2021",
            "value": 205450.46
        },
        {
            "time": "11/20/2021",
            "value": 0.0
        },
        {
            "time": "11/22/2021",
            "value": 3078758.17
        },
        {
            "time": "11/23/2021",
            "value": -9768623.16
        },
        {
            "time": "11/24/2021",
            "value": 441494.11
        },
        {
            "time": "11/25/2021",
            "value": -22241.04
        },
        {
            "time": "11/26/2021",
            "value": 0.0
        },
        {
            "time": "11/27/2021",
            "value": 0.0
        },
        {
            "time": "11/29/2021",
            "value": 0.0
        },
        {
            "time": "11/30/2021",
            "value": 0.0
        },
        {
            "time": "12/1/2021",
            "value": 0.0
        },
        {
            "time": "12/2/2021",
            "value": 0.0
        }
    ],
    "btcTrend": [
        {
            "time": "11/2/2021",
            "value": 0.0
        },
        {
            "time": "11/3/2021",
            "value": 0.0
        },
        {
            "time": "11/5/2021",
            "value": 0.0
        },
        {
            "time": "11/6/2021",
            "value": -3799307.89
        },
        {
            "time": "11/8/2021",
            "value": 0.0
        },
        {
            "time": "11/9/2021",
            "value": 358397.64
        },
        {
            "time": "11/10/2021",
            "value": 0.0
        },
        {
            "time": "11/11/2021",
            "value": 406383.2
        },
        {
            "time": "11/12/2021",
            "value": 3552124.19
        },
        {
            "time": "11/13/2021",
            "value": -26608672.39
        },
        {
            "time": "11/15/2021",
            "value": 4100751.48
        },
        {
            "time": "11/16/2021",
            "value": 0.0
        },
        {
            "time": "11/19/2021",
            "value": 205450.45
        },
        {
            "time": "11/20/2021",
            "value": 0.0
        },
        {
            "time": "11/22/2021",
            "value": 3078758.17
        },
        {
            "time": "11/23/2021",
            "value": -9726731.88
        },
        {
            "time": "11/24/2021",
            "value": 441494.11
        },
        {
            "time": "11/25/2021",
            "value": 0.0
        },
        {
            "time": "11/26/2021",
            "value": 0.0
        },
        {
            "time": "11/27/2021",
            "value": 0.0
        },
        {
            "time": "11/29/2021",
            "value": 0.0
        },
        {
            "time": "11/30/2021",
            "value": 0.0
        },
        {
            "time": "12/1/2021",
            "value": 0.0
        },
        {
            "time": "12/2/2021",
            "value": 0.0
        }
    ]
}




const Sb2: React.FC<{}> = () => {
    const [dailyPnlData, setDailyPnlData] = useState("")

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios
            .get('https://routechanges.azurewebsites.net/api/v1/DashBoard//DailyPNL/30')
            .then((res) => {
                console.log(res)
                setDailyPnlData(res.data);
                console.log(res.data)
                console.log(res.data.categories)
                console.log(res.data.series[0])
                console.log(res.data.series[0].name)
                console.log(res.data.series[0].data)
                return res.data;
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    };




    return (
        <div>
            <h2>SB2C1 - Cumulative PNL(%)</h2>
            <SB2C1 data={cpnlData} title={'Cumulative PNL(%)'} showBtc={true} showPnl={true} />
            <br />
            <h2>SB2C4 - Daily PNL(%)</h2>
            {dailyPnlData ? <SB2C4 data={dailyPnlData} /> : <h1>loading</h1>}
            <br />
            <h2>SB2C1 - Profits</h2>
            <SB2C1 data={profitData} title={'Profits'} showBtc={true} showPnl={true} />
            <br />
            <h2>SB2C1 - Asset Net Worth</h2>
            <SB2C1 data={anwData} title={'Asset Net Worth'} showBtc={false} showPnl={true} />
        </div>
    );
};

export default Sb2;