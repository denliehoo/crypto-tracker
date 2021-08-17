import { useContext, useRef } from "react";
import Card from "../components/ui/Card";
import classes from "./NewTransactionPage.module.css";
import { useHistory } from "react-router-dom";
import { addTransaction } from "../API";
import AuthContext from "../store/auth-context";

const NewTransaction: React.FC = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const user = authCtx.userId;

  const assetInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredAsset = assetInputRef.current!.value;
    const enteredPrice = parseFloat(priceInputRef.current!.value);
    const enteredAmount = parseFloat(amountInputRef.current!.value);
    const formData = {
      asset: enteredAsset,
      price: enteredPrice,
      amount: enteredAmount,
      _id: "thisisignored",
      user: user,
    };
    addTransaction(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
      })
      .catch((err) => console.log(err));
    console.log("Added");
    console.log(formData);
    // transactionCtx.addTransaction(enteredAsset, enteredPrice, enteredAmount);
    history.replace("/all");
  };

  // const handleSaveTransaction = (
  //   e: React.FormEvent,
  //   formData: ITransaction
  // ): void => {
  //   e.preventDefault();
  //   addTransaction(formData)
  //     .then(({ status, data }) => {
  //       if (status !== 201) {
  //         throw new Error("Error! Todo not saved");
  //       }
  //       // setTodos(data.todos)
  //     })
  //     .catch((err) => console.log(err));
  //   console.log("Added");
  //   console.log(formData);
  // };

  return (
    <Card>
      <h1>New Transaction</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="asset">Asset Name</label>
          <input type="text" required id="asset" ref={assetInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Price</label>
          <input
            ref={priceInputRef}
            type="number"
            required
            id="price"
            step="0.000001"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            required
            id="amount"
            ref={amountInputRef}
            step="0.0000001"
          />
        </div>

        <div className={classes.actions}>
          <button>Add Transaction</button>
        </div>
      </form>
    </Card>
  );
};
export default NewTransaction;
