import { Link, useHistory } from "react-router-dom";
import classes from "./NavBar.module.css";

import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const NavBar: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/login");
  };

  return (
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
  );
};

export default NavBar;
