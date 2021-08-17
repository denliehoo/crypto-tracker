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

// add sorting here e.g. sortByCrypto?XXX BTC then BTC only etc
// then maybe at the top put a "total BTC" also

const AllTransactionsPage: React.FC<{}> = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [transactionLoading, setTransactionLoading] = useState(true);

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
        .then(({ data: { transactions } }: ITransaction[] | any) =>
          setTransactions(transactions)
        )
        .then(() => setTransactionLoading(false))
        .catch((err: Error) => console.log(err));
    }, 200);
  };
  console.log(transactions);

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
          asset={item.asset}
          price={item.price}
          amount={item.amount}
          onRemoveTransaction={deleteTransactionHandler.bind(null, item._id)}
        />
      ))
  );


  // const content = transactionLoading ? (
  //   <LoadingSpinner />
  // ) : (
  //   transactions
  //     .filter((item) => item.user === authCtx.userId)
  //     .map((item) => (
  //       <TransactionItem
  //         key={item._id}
  //         id={item._id}
  //         asset={item.asset}
  //         price={item.price}
  //         amount={item.amount}
  //         onRemoveTransaction={deleteTransactionHandler.bind(null, item._id)}
  //       />
  //     ))
  // );


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
//   const isSortingAscending = queryParams.get("sort") === "asc"; //returns true or false

//   const changeSortingHandler = () => {
//     history.push({
//       pathname: location.pathname,
//       search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
//     });
//   };
//   /* allows us to sort and this changes the query parametres (i.e. after the /?); e.g. .../?something=..... */
//   // end of might delete

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

//   const sortByCrypto = (transactions: any, criteria = "") => {
//     if (criteria) {
//       return transactions.filter((item: any) => item.asset === criteria);
//     } else {
//       return transactions;
//     }
//   };

//   const filterInputRef = useRef<HTMLInputElement>(null);

//   const filterSubmissionHandler = (event: React.FormEvent) => {
//     event.preventDefault();
//     const filterBy = filterInputRef.current!.value;
//     console.log(filterBy);
//     history.push({
//       pathname: location.pathname,
//       search: `?sort=${filterBy}`,
//     });
//     const sortedTxn = sortByCrypto(transactions, filterBy);
//     console.log(sortedTxn);
//   };

//   return (
//     <Fragment>
//       <form onSubmit={filterSubmissionHandler}>
//         <label>Filter By</label>
//         <input ref={filterInputRef} />
//         <button>Filter</button>
//       </form>
//       <ul className={classes.list}>{content}</ul>
//     </Fragment>
//   );
// };

// export default AllTransactionsPage;
