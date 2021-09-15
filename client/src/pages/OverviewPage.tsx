import classes from "./OverviewPage.module.css";
import { getTransactions } from "../API";
import React, {
    useEffect,
    useState,
    useContext,
    Fragment,
    useCallback,
} from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AuthContext from "../store/auth-context";
import CollatedTransactionItem from "../components/transaction/CollatedTransactionItem";
import axios from "axios";
import { Pie } from 'react-chartjs-2'; // https://www.npmjs.com/package/react-chartjs-2
import CoinContext from "../store/coins-context";

// add sorting here e.g. sortByCrypto?XXX BTC then BTC only etc
// then maybe at the top put a "total BTC" also



const OverviewPage: React.FC<{}> = () => {
    const baseUrl: String = "https://api.coingecko.com/api/v3/"
    const [transactionLoading, setTransactionLoading] = useState(true);
    const [transactions, setTransactions] = useState<any>([]);
    const [apiData, setApiData] = useState<any>({})
    const [showChart, setShowChart] = useState(false);
    const coinCtx = useContext(CoinContext)
    const coinName = coinCtx.coinName


    const authCtx = useContext(AuthContext);

    //cant seem to access state from inside? Although can set state
    const fetchTransactions = useCallback(() => {
        setTimeout(() => {
            getTransactions()
                .then(({ data: { transactions } }: ITransaction[] | any) => {
                    let filteredTransactions = transactions.filter((item: any) => item.user === authCtx.userId)
                    setTransactions(filteredTransactions)
                    return filteredTransactions
                })
                .then((transactions) => {
                    let listOfAssets: any = [];
                    for (let t of transactions) {
                        listOfAssets.push(t.asset)
                    }
                    listOfAssets = listOfAssets.filter((t: any, index: any) => {
                        return listOfAssets.indexOf(t) === index
                    })
                    let collatedTransactions: any = []
                    for (let a in listOfAssets) {
                        collatedTransactions.push({
                            asset: listOfAssets[a],
                            price: 0,
                            amount: 0,
                        })
                    }
                    for (let t of transactions) {
                        for (let c in collatedTransactions) {
                            if (t.asset === collatedTransactions[c].asset) {
                                collatedTransactions[c].price = (collatedTransactions[c].price * collatedTransactions[c].amount + t.price * t.amount) / (t.amount + collatedTransactions[c].amount)
                                collatedTransactions[c].amount += t.amount
                            }
                        }
                    }

                    setTransactions(collatedTransactions)
                    let apiListOfAsset: any = []
                    for (let a of listOfAssets) { apiListOfAsset.push(coinName[a.toLowerCase()]) }


                    axios.get(`${baseUrl}/coins/markets`, {
                        params: {
                            vs_currency: "usd",
                            ids: apiListOfAsset.join(",")
                        }
                    }).then((res) => {
                        console.log("the data", res.data)
                        let compiledData: any = {};
                        (res.data).map((i: any) => {
                            compiledData[i.symbol] = {
                                image: i.image,
                                current_price: i.current_price
                            }
                            return null
                        })

                        setApiData(compiledData)
                    }).then(() => {
                        setTransactionLoading(false)

                    })
                })
                .catch((err: Error) => console.log(err));
        }, 200);
    }, [authCtx.userId, coinName])


    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const randomNum = () => {
        return Math.floor(Math.random() * 255)
    }
    let colorObject: any = {
        backgroundColor: [],
        borderColor: []
    }
    if (!transactionLoading) {
        for (let a in transactions) {
            const r = randomNum()
            const g = randomNum()
            const b = randomNum()
            colorObject.backgroundColor.push(`rgb(${r},${g},${b},0.2)`)
            colorObject.borderColor.push(`rgb(${r},${g},${b},1)`)
        }
        console.log(colorObject)
    }


    const chart = transactionLoading ? (<LoadingSpinner />) : (<Pie data={{
        labels: transactions.map((t: any) => { return t.asset }),
        datasets: [
            {
                label: 'Breakdown of portfolio value',
                data: transactions.map((t: any) => { return (apiData[t.asset.toLowerCase()]["current_price"]) * t.amount }),
                backgroundColor: colorObject.backgroundColor,
                borderColor: colorObject.borderColor,
                borderWidth: 1,
            },
        ],
    }} />)

    const toggleShowChart = () => {
        setShowChart((prev) => { console.log(prev); return !prev })

    }


    const content = transactionLoading ? (
        <LoadingSpinner />
    ) : (
        transactions
            .map((item: any) => (
                <CollatedTransactionItem
                    key={item.asset}
                    asset={item.asset}
                    price={item.price}
                    amount={item.amount}
                    currentValue={(apiData[item.asset.toLowerCase()]["current_price"]) * item.amount}
                    image={(apiData[item.asset.toLowerCase()]["image"])}
                />
            ))
    );


    return (
        <Fragment>
            {showChart ? (<div>{chart}</div>) : <div></div>}
            <button onClick={toggleShowChart}>{showChart ? "Hide Chart" : "Show Chart"}</button>
            <ul className={classes.list}>{content}</ul>
        </Fragment>
    );
};

export default OverviewPage;

// import classes from "./OverviewPage.module.css";
// import { getTransactions } from "../API";
// import React, {
//     useEffect,
//     useState,
//     useContext,
//     Fragment,
// } from "react";
// import LoadingSpinner from "../components/ui/LoadingSpinner";
// import AuthContext from "../store/auth-context";
// import CollatedTransactionItem from "../components/transaction/CollatedTransactionItem";

// // add sorting here e.g. sortByCrypto?XXX BTC then BTC only etc
// // then maybe at the top put a "total BTC" also

// const OverviewPage: React.FC<{}> = () => {
//     const baseUrl: String = "https://api.coingecko.com/api/v3/"
//     const [transactionLoading, setTransactionLoading] = useState(true);
//     const [collatedTransactions, setCollatedTransactions] = useState<any>([])
//     const [apiData, setApiData] = useState<any>({})


//     const authCtx = useContext(AuthContext);

//     useEffect(() => {
//         fetchTransactions();
//     }, []);

//     // placed a setTimeOut here to slightly delay.
//     //This is because MongoDB might be a bit slow in updating and it'll display old data(i think)
//     const fetchTransactions = (): any => {
//         setTimeout(() => {
//             getTransactions()
//                 .then(({ data: { transactions } }: ITransaction[] | any) => {
//                     return transactions
//                 }
//                 )
//                 .then((transactions) => {
//                     let filteredTransactions = transactions.filter((item: any) => item.user === authCtx.userId)
//                     let listOfAssets: any = [];
//                     for (let t of filteredTransactions) {
//                         listOfAssets.push(t.asset)
//                     }
//                     // ensures that there are no duplicates in the list of assets
//                     listOfAssets = listOfAssets.filter((t: any, index: any) => {
//                         return listOfAssets.indexOf(t) === index
//                     })
//                     console.log(listOfAssets)
//                     // puts the assets in a dictionary with an initial total price and amoutn of 0
//                     for (let a in listOfAssets) {
//                         collatedTransactions.push({
//                             asset: listOfAssets[a],
//                             totalPrice: 0,
//                             totalAmount: 0,
//                         })
//                     }
//                     // adds the amount and prices
//                     for (let f of filteredTransactions) {
//                         for (let c in collatedTransactions) {
//                             if (f.asset === collatedTransactions[c].asset) {
//                                 collatedTransactions[c].totalPrice = (collatedTransactions[c].totalPrice * collatedTransactions[c].totalAmount + f.price * f.amount) / (f.amount + collatedTransactions[c].totalAmount)
//                                 collatedTransactions[c].totalAmount += f.amount
//                             }
//                         }
//                     }
//                     return collatedTransactions
//                 })
//                 .then((collatedTransactions) => {
//                     console.log("these are the collated transactions")
//                     console.log(collatedTransactions)
//                     console.log("setting collatedTransactions")
//                     setCollatedTransactions(collatedTransactions)
//                     console.log("setting transactionLoading to false")
//                     setTransactionLoading(false)
//                 })
//                 .catch((err: Error) => console.log(err));
//         }, 200);
//     };


//     const content = transactionLoading ? (
//         <LoadingSpinner />
//     ) : (
//         collatedTransactions
//             .map((item: any) => (
//                 <CollatedTransactionItem
//                     key={item.asset}
//                     asset={item.asset}
//                     price={item.totalPrice}
//                     amount={item.totalAmount}
//                 />
//             ))
//     );


//     return (
//         <Fragment>
//             <ul className={classes.list}>{content}</ul>
//         </Fragment>
//     );
// };

// export default OverviewPage;
