import classes from "./AllTransactionsPage.module.css";
import { getTransactions, deleteTransaction } from "../API";
import React, {
  useEffect,
  useState,
  useContext,
  Fragment,
  useRef,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import TransactionItem from "../components/transaction/TransactionItem";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AuthContext from "../store/auth-context";
import axios from "axios";
import coinName from "../utils/coinName";


// add sorting here e.g. sortByCrypto?XXX BTC then BTC only etc
// then maybe at the top put a "total BTC" also

const AllTransactionsPage: React.FC<{}> = () => {
  const baseUrl: String = "https://api.coingecko.com/api/v3/"
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [transactionLoading, setTransactionLoading] = useState(true);
  const [apiData, setApiData] = useState<any>({})

  // might delete later
  const history = useHistory();
  const location = useLocation();
  // the location object gives us info on the currently loaded URL
  // such as "pathname" which would be after the / , and also "search" which is the ?...

  const queryParams = new URLSearchParams(location.search);
  // this checks the qeuryParams; .get("sort") means that we are checking what XXX is in the query params where ?sort=XXX
  // here, we are checking whether it is ?sort=asc   and if it is, we return true
  const currentQueryParams = queryParams.get("sort"); // will either return the asset ticker OR null if no query params
  console.log(currentQueryParams)


  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetchTransactions();
  }, []);

  // placed a setTimeOut here to slightly delay.
  //This is because MongoDB might be a bit slow in updating and it'll display old data(i think)
  const fetchTransactions = (): void => {
    setTimeout(() => {
      getTransactions()
        .then(({ data: { transactions } }: ITransaction[] | any) => {

          setTransactions(transactions)
          return transactions
        }
        )
        .then((transactions) => {
          let filteredTransactions = transactions.filter((item: any) => item.user === authCtx.userId)
          let listOfAssets: any = [];
          for (let t of filteredTransactions) {
            // listOfAssets.push(t.asset.toLowerCase())
            const tickerName = t.asset.toLowerCase()
            listOfAssets.push(coinName[tickerName])
          }
          // ensures that there are no duplicates in the list of assets
          listOfAssets = listOfAssets.filter((t: any, index: any) => {
            return listOfAssets.indexOf(t) === index
          })
          return listOfAssets.join(",")
        }).then((listOfAssets) => {
          console.log("list of asset", listOfAssets)
          const data = axios.get(`${baseUrl}/coins/markets`, {
            params: {
              vs_currency: "usd",
              ids: listOfAssets
            }
          })
            .then((res) => {
              console.log("here is the res", res.data)
              let compiledData: any = {};
              (res.data).map((i: any) => {
                compiledData[i.symbol] = {
                  image: i.image,
                  current_price: i.current_price
                }
              })
              setApiData(compiledData)
              return compiledData
            })
            .then(() => setTransactionLoading(false))
        })
        .catch((err: Error) => console.log(err));
    }, 200);
  };

  const deleteTransactionHandler = (_id: string): void => {
    deleteTransaction(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Transaction not deleted");
        }
        setTransactions(data.transactions);
      })
      .catch((err) => console.log(err));
  };

  const content = transactionLoading ? (
    <LoadingSpinner />
  ) : (
    transactions
      .filter((item) => item.user === authCtx.userId)
      .filter((item) => currentQueryParams ? item.asset === currentQueryParams : item) // if there are queryparams (of the asset) filter it , else if null we then we don't
      .map((item) => (
        <TransactionItem
          key={item._id}
          id={item._id}
          currentValue={(apiData[item.asset.toLowerCase()]["current_price"]) * item.amount}
          asset={item.asset}
          price={item.price}
          amount={item.amount}
          onRemoveTransaction={deleteTransactionHandler.bind(null, item._id)}
        />
      ))
  );

  const filterInputRef = useRef<HTMLInputElement>(null);
  const filterSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const filterBy = filterInputRef.current!.value;
    if (filterBy) {
      console.log(filterBy);
      history.push({
        pathname: location.pathname,
        search: `?sort=${filterBy}`,
      });
    }
    filterInputRef.current!.value = ""
  };

  return (
    <Fragment>
      <form onSubmit={filterSubmissionHandler}>
        <label>Filter By</label>
        <input ref={filterInputRef} />
        <button>Filter</button>
      </form>
      <br />
      {currentQueryParams && (<div>
        Viewing all the transactions for {currentQueryParams}
      </div>)}
      <ul className={classes.list}>{content}</ul>
    </Fragment>
  );
};

export default AllTransactionsPage;


// import classes from "./AllTransactionsPage.module.css";
// import { getTransactions, deleteTransaction } from "../API";
// import React, {
//   useEffect,
//   useState,
//   useContext,
//   Fragment,
//   useRef,
// } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import TransactionItem from "../components/transaction/TransactionItem";
// import LoadingSpinner from "../components/ui/LoadingSpinner";
// import AuthContext from "../store/auth-context";

// // add sorting here e.g. sortByCrypto?XXX BTC then BTC only etc
// // then maybe at the top put a "total BTC" also

// const AllTransactionsPage: React.FC<{}> = () => {
//   const [transactions, setTransactions] = useState<ITransaction[]>([]);
//   const [transactionLoading, setTransactionLoading] = useState(true);

//   // might delete later
//   const history = useHistory();
//   const location = useLocation();
//   // the location object gives us info on the currently loaded URL
//   // such as "pathname" which would be after the / , and also "search" which is the ?...

//   const queryParams = new URLSearchParams(location.search);
//   // this checks the qeuryParams; .get("sort") means that we are checking what XXX is in the query params where ?sort=XXX
//   // here, we are checking whether it is ?sort=asc   and if it is, we return true
//   const currentQueryParams = queryParams.get("sort"); // will either return the asset ticker OR null if no query params
//   console.log(currentQueryParams)


//   const authCtx = useContext(AuthContext);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   // placed a setTimeOut here to slightly delay.
//   //This is because MongoDB might be a bit slow in updating and it'll display old data(i think)
//   const fetchTransactions = (): void => {
//     setTimeout(() => {
//       getTransactions()
//         .then(({ data: { transactions } }: ITransaction[] | any) =>
//           setTransactions(transactions)
//         )
//         .then(() => setTransactionLoading(false))
//         .catch((err: Error) => console.log(err));
//     }, 200);
//   };
//   console.log(transactions);

//   const deleteTransactionHandler = (_id: string): void => {
//     deleteTransaction(_id)
//       .then(({ status, data }) => {
//         if (status !== 200) {
//           throw new Error("Error! Transaction not deleted");
//         }
//         setTransactions(data.transactions);
//       })
//       .catch((err) => console.log(err));
//   };

//   const content = transactionLoading ? (
//     <LoadingSpinner />
//   ) : (
//     transactions
//       .filter((item) => item.user === authCtx.userId)
//       .filter((item) => currentQueryParams ? item.asset === currentQueryParams : item) // if there are queryparams (of the asset) filter it , else if null we then we don't
//       .map((item) => (
//         <TransactionItem
//           key={item._id}
//           id={item._id}
//           asset={item.asset}
//           price={item.price}
//           amount={item.amount}
//           onRemoveTransaction={deleteTransactionHandler.bind(null, item._id)}
//         />
//       ))
//   );

//   const filterInputRef = useRef<HTMLInputElement>(null);
//   const filterSubmissionHandler = (event: React.FormEvent) => {
//     event.preventDefault();
//     const filterBy = filterInputRef.current!.value;
//     if (filterBy) {
//       console.log(filterBy);
//       history.push({
//         pathname: location.pathname,
//         search: `?sort=${filterBy}`,
//       });
//     }
//     filterInputRef.current!.value = ""
//   };

//   return (
//     <Fragment>
//       <form onSubmit={filterSubmissionHandler}>
//         <label>Filter By</label>
//         <input ref={filterInputRef} />
//         <button>Filter</button>
//       </form>
//       <br />
//       {currentQueryParams && (<div>
//         Viewing all the transactions for {currentQueryParams}
//       </div>)}
//       <ul className={classes.list}>{content}</ul>
//     </Fragment>
//   );
// };

// export default AllTransactionsPage;
