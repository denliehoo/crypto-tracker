import Card from "../ui/Card";
import classes from "./TransactionItem.module.css";

import { useState, useEffect } from "react";

import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";

import { Link } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";

//https://api.cryptonator.com/api/ticker/btc-usd
// https://www.youtube.com/watch?v=RUFxmAjbNbg   passing props through Link

const TodoItem: React.FC<{
  id: string;
  asset: string;
  price: number;
  amount: number;
  onRemoveTransaction: () => void;
}> = (props) => {
  //starts here
  const [isLoading, setIsLoading] = useState(true);
  const [loadedValue, setLoadedValue] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function confirmModalHandler() {
    setModalIsOpen(false);
    props.onRemoveTransaction();
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.cryptonator.com/api/ticker/${props.asset}-usd`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const price = data.ticker.price;
        const value = price * props.amount;
        setIsLoading(false);
        setLoadedValue(value);
      });
  }, [props.amount, props.asset]);

  const percentChange = (
    ((loadedValue - props.amount * props.price) /
      (props.amount * props.price)) *
    100
  ).toFixed(2);

  if (isLoading) {
    return (
      <section>
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.asset}>
          <span>
            <img
              className={classes.logos}
              src={process.env.PUBLIC_URL + `crypto_logos/${props.asset}.png`}
              alt={"logo"}
            />
          </span>
          <Link className={classes.assetLink} to={`/all/?sort=${props.asset}`}>
            {props.asset}
          </Link>
        </div>
        <div className={classes.price}>
          Price: {props.price}/{props.asset}
        </div>
        <div className={classes.amount}>
          Amount {props.amount} {props.asset}
        </div>
        <div className={classes.amount}>
          Value at purchase {props.amount * props.price}
        </div>
        <div className={classes.value}>
          Current Value: {loadedValue}{" "}
          {loadedValue - props.amount * props.price > 0 ? (
            <span className={classes.up}>Up {percentChange}%</span>
          ) : (
            <span className={classes.down}>Down {percentChange}%</span>
          )}
        </div>
        <div className={classes.buttonDiv}>
          <div className={classes.edit}>
            {/* <Link to={`/${props.id}/edit`}>Edit</Link> */}
            <Link
              to={{
                pathname: `/${props.id}/edit`,
                state: {
                  id: props.id,
                  asset: props.asset,
                  price: props.price,
                  amount: props.amount,
                },
              }}
            >
              Edit
            </Link>
          </div>
          <div className={classes.delete} onClick={deleteHandler}>
            Delete
          </div>
          {modalIsOpen && (
            <Modal
              onCancel={closeModalHandler}
              onConfirm={confirmModalHandler}
            />
          )}
          {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
        </div>
      </Card>
    </li>
  );
};

export default TodoItem;
