import { Link, useHistory } from "react-router-dom";
import classes from "./NavBar.module.css";

import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import { TickerTape } from "react-ts-tradingview-widgets";
import { Fragment } from "react";

const NavBar: React.FC = () => {
  //might delete
  const tickerTapeSymbols = [
    {
      proName: "KRAKEN:ADAUSD	",
      title: "ADA/USD",
    },
    {
      proName: "BINANCE:SOLUSD",
      title: "SOL/USD",
    },
    {
      proName: "BITSTAMP:BTCUSD",
      title: "BTC/USD",
    },
    {
      proName: "BITSTAMP:ETHUSD",
      title: "ETH/USD",
    },
  ];

  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/login");
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>Crypto Tracker</div>
        <nav>
          <ul>
            <li>
              <Link to="/currentPrices">Market Prices</Link>
            </li>

            {isLoggedIn && (
              <li>
                <Link to="/overview">Overview</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <Link to="/all">All Transactions</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <Link to="/new">New Transaction</Link>
              </li>
            )}

            {!isLoggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <div className={classes.logout} onClick={logoutHandler}>
                  Logout
                </div>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {/* might delete below here*/}
      <TickerTape symbols={tickerTapeSymbols} />
    </Fragment>
  );
};

export default NavBar;
