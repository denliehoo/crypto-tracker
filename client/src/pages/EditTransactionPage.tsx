import classes from "./EditTransactionPage.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { useContext, useRef } from "react";
import Card from "../components/ui/Card";
import { updateTransaction } from "../API";
import AuthContext from "../store/auth-context";

const EditTransactionPage: React.FC = () => {
  const location = useLocation<{
    id: string;
    asset: string;
    price: string;
    amount: string;
  }>();
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const user = authCtx.userId;

  const { id, asset, price, amount } = location.state;
  console.log(id);
  console.log(asset);
  console.log(price);
  console.log(amount);

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
    updateTransaction(id, formData)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Transaction not saved");
        } else {
          history.replace("/all");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card>
      <h1>Edit Transaction</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="asset">Asset Name</label>
          <input
            type="text"
            required
            id="asset"
            ref={assetInputRef}
            defaultValue={asset}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Price</label>
          <input
            ref={priceInputRef}
            type="number"
            required
            id="price"
            step="0.000001"
            defaultValue={price}
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
            defaultValue={amount}
          />
        </div>

        <div className={classes.actions}>
          <button>Edit Transaction</button>
        </div>
      </form>
    </Card>
  );
};

export default EditTransactionPage;
