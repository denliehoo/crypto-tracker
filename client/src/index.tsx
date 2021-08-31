import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { CoinContextProvider } from "./store/coins-context"

ReactDOM.render(
  <AuthContextProvider>
    <CoinContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CoinContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
