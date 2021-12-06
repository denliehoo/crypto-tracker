import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";

import AllTransactionsPage from "./pages/AllTransactionsPage";
import NewTransactionPage from "./pages/NewTransactionPage";
import EditTransactionPage from "./pages/EditTransactionPage";
import OverviewPage from "./pages/OverviewPage";
import RegisterPage from "./pages/user/RegisterPage";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import LandingPage from "./pages/landing/LandingPage";
import MarketDataPage from "./pages/marketPrice/MarketDataPage";
//npm i react-chartjs-2
import TradingViewChart from "./pages/TradingViewChart";
import TradingViewWidgetPage from "./pages/TradingViewWidget";
import CryptoDetails from "./pages/marketPrice/CryptoDetails";
import Sb from "./pages/Sb";
import Sb2 from "./pages/Sb2";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  console.log(`Logged in as user: ${authCtx.userId}`);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>

        <Route path="/currentPrices">
          <MarketDataPage />
        </Route>

        <Route path="/details/:asset">
          <CryptoDetails />
        </Route>

        <Route path="/chart">
          <TradingViewChart />
        </Route>

        <Route path="/widget">
          <TradingViewWidgetPage />
        </Route>

        <Route path="/sb">
          <Sb />
        </Route>


        <Route path="/sb2">
          <Sb2 />
        </Route>


        <Route path="/overview">
          {isLoggedIn && <OverviewPage />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/all" exact>
          {isLoggedIn && <AllTransactionsPage />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/all/?sort=:queryAsset">
          {isLoggedIn && <AllTransactionsPage />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/new">
          {isLoggedIn && <NewTransactionPage />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/:id/edit">
          {isLoggedIn && <EditTransactionPage />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {!isLoggedIn && <RegisterPage />}
          {isLoggedIn && <AllTransactionsPage />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
