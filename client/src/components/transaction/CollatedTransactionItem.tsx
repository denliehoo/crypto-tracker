import Card from "../ui/Card";
import classes from "./CollatedTransactionItem.module.css";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";


const CollatedTransactionItem: React.FC<any> = (props) => {
    //starts here
    const [isLoading, setIsLoading] = useState(true);
    const [loadedValue, setLoadedValue] = useState(0);

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
                    Total Price: {props.price}/{props.asset}
                </div>
                <div className={classes.amount}>
                    Total Amount {props.amount} {props.asset}
                </div>
                <div className={classes.amount}>
                    Total Value at purchase {props.amount * props.price}
                </div>
                <div className={classes.value}>
                    Current Value: {loadedValue}{" "}
                    {loadedValue - props.amount * props.price > 0 ? (
                        <span className={classes.up}>Up {percentChange}%</span>
                    ) : (
                        <span className={classes.down}>Down {percentChange}%</span>
                    )}
                </div>
            </Card>
        </li>
    );
};

export default CollatedTransactionItem;
