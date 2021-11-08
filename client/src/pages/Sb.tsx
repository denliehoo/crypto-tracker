import C1 from "../components/sb/C1";
import C2 from "../components/sb/C2";
import C3 from "../components/sb/C3";
import C4 from "../components/sb/C4";

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


const Sb: React.FC<{}> = () => {
    return (
        <div>
            <h2>C1</h2>
            <C1 data={data1} title={'Cumulative PNL(%)'} showBtc={true} showPnl={true} />
            <br />
            <h2>C1</h2>
            <C1 data={data1} title={'Profits'} showBtc={true} showPnl={false} />
            <br />
            <h2>C1</h2>
            <C1 data={data1} title={'Profits'} showBtc={false} showPnl={true} />
            <br />
            <h2>C2</h2>
            <C2 />
            <br />
            <h2>C3</h2>
            <C3 />
            <br />
            <h2>C4</h2>
            <C4 data={data1} />
            <br />

        </div>
    );
};

export default Sb;