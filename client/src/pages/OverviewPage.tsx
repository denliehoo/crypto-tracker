import classes from "./OverviewPage.module.css";
import { getTransactions } from "../API";
import React, {
    useEffect,
    useState,
    useContext,
    Fragment,
} from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AuthContext from "../store/auth-context";
import CollatedTransactionItem from "../components/transaction/CollatedTransactionItem";

// add sorting here e.g. sortByCrypto?XXX BTC then BTC only etc
// then maybe at the top put a "total BTC" also

const OverviewPage: React.FC<{}> = () => {
    const [transactionLoading, setTransactionLoading] = useState(true);
    const [priceIsLoading, setPriceIsLoading] = useState(true);
    const [collatedTransactions, setCollatedTransactions] = useState<any>([])


    const authCtx = useContext(AuthContext);

    useEffect(() => {
        fetchTransactions();
    }, []);

    // placed a setTimeOut here to slightly delay.
    //This is because MongoDB might be a bit slow in updating and it'll display old data(i think)
    const fetchTransactions = (): any => {
        setTimeout(() => {
            getTransactions()
                .then(({ data: { transactions } }: ITransaction[] | any) => {
                    return transactions
                }
                )
                .then((transactions) => {
                    let filteredTransactions = transactions.filter((item: any) => item.user === authCtx.userId)
                    let listOfAssets: any = [];
                    for (let t of filteredTransactions) {
                        listOfAssets.push(t.asset)
                    }
                    // ensures that there are no duplicates in the list of assets
                    listOfAssets = listOfAssets.filter((t: any, index: any) => {
                        return listOfAssets.indexOf(t) === index
                    })
                    // puts the assets in a dictionary with an initial total price and amoutn of 0
                    for (let a in listOfAssets) {
                        collatedTransactions.push({
                            asset: listOfAssets[a],
                            totalPrice: 0,
                            totalAmount: 0,
                        })
                    }
                    // adds the amount and prices
                    for (let f of filteredTransactions) {
                        for (let c in collatedTransactions) {
                            if (f.asset === collatedTransactions[c].asset) {
                                collatedTransactions[c].totalPrice = (collatedTransactions[c].totalPrice * collatedTransactions[c].totalAmount + f.price * f.amount) / (f.amount + collatedTransactions[c].totalAmount)
                                collatedTransactions[c].totalAmount += f.amount
                            }
                        }
                    }
                    return collatedTransactions
                })
                .then((collatedTransactions) => {
                    console.log("these are the collated transactions")
                    console.log(collatedTransactions)
                    console.log("setting collatedTransactions")
                    setCollatedTransactions(collatedTransactions)
                    console.log("setting transactionLoading to false")
                    setTransactionLoading(false)
                })
                .catch((err: Error) => console.log(err));
        }, 200);
    };


    const content = transactionLoading ? (
        <LoadingSpinner />
    ) : (
        collatedTransactions
            .map((item: any) => (
                <CollatedTransactionItem
                    key={item.asset}
                    asset={item.asset}
                    price={item.totalPrice}
                    amount={item.totalAmount}

                />
            ))
    );


    return (
        <Fragment>
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
// import Card from "../components/ui/Card";

// // add sorting here e.g. sortByCrypto?XXX BTC then BTC only etc
// // then maybe at the top put a "total BTC" also

// const OverviewPage: React.FC<{}> = () => {
//     const [transactionLoading, setTransactionLoading] = useState(true);
//     const [priceIsLoading, setPriceIsLoading] = useState(true);
//     const [collatedTransactions, setCollatedTransactions] = useState<any>([])


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
//                     // puts the assets in a dictionary with an initial total price and amoutn of 0
//                     for (let a in listOfAssets) {
//                         collatedTransactions.push({
//                             asset: listOfAssets[a],
//                             totalPrice: 0,
//                             totalAmount: 0,
//                             totalValue: 0
//                         })
//                     }
//                     // adds the amount and prices
//                     for (let f of filteredTransactions) {
//                         for (let c in collatedTransactions) {
//                             if (f.asset === collatedTransactions[c].asset) {
//                                 collatedTransactions[c].totalPrice = (collatedTransactions[c].totalPrice * collatedTransactions[c].totalAmount + f.price * f.amount) / (f.amount + collatedTransactions[c].totalAmount)
//                                 collatedTransactions[c].totalAmount += f.amount
//                                 fetch(`https://api.cryptonator.com/api/ticker/${f.asset}-usd`)
//                                     .then((response) => {
//                                         return response.json();
//                                     })
//                                     .then((data) => {
//                                         const price = data.ticker.price;
//                                         collatedTransactions[c].totalValue = (price * collatedTransactions[c].totalAmount)
//                                     });
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
//                     setTimeout(() => {
//                         setTransactionLoading(false)
//                     }, 2000)
//                 })
//                 .catch((err: Error) => console.log(err));
//         }, 200);
//     };


//     const content = transactionLoading ? (
//         <LoadingSpinner />
//     ) : (
//         collatedTransactions
//             .map((item: any) => (
//                 <li key={item.asset}>
//                     <Card>
//                         Asset {item.asset} |
//                         price {item.totalPrice} |
//                         amount {item.totalAmount}|
//                         value {item.totalValue}
//                     </Card>
//                 </li>
//             ))
//     );


//     return (
//         <Fragment>
//             <ul className={classes.list}>{content}</ul>
//         </Fragment>
//     );
// };

// export default OverviewPage;
