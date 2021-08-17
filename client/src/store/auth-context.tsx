import React, { useState, useEffect, useCallback } from "react";

let logoutTimer: any; // a global variable in this auth-context file

const AuthContext = React.createContext<any>({
  //this is the initial "state"  (i think)
  userId: "",
  token: "", //stores a token which is initiall an empty string
  isLoggedIn: false,
  login: (token: any) => {}, //takes the token and does nothing
  logout: () => {}, //takes no arguments and does nothing
});

// the remaining time of the token in the localStorage
// becuase by default, it expires after a certain duration
const calculateRemainingTime = (expirationTime: any) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

// as in data in the localStorage
const retrieveLocalStorageData = () => {
  //localStorage is an object in the browser; don't have to install it etc
  // note that it doesn't have to be called "token" or "expirationTime"
  // it  depends on what we stored it as initially.
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const storedUserId = localStorage.getItem("userId");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  // if remaining time is less than 60000ms (1 min), it doesn't make sense to
  // keep the user logged in since they'll get logged out soon.
  // Hence, we log the user out (to prompt them to log in again since the token has expired)
  // by removing the token and the expirationTime from the local storage
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    return null;
  }

  return {
    // else if > 1min, we return the token and duration
    token: storedToken,
    duration: remainingTime,
    userId: storedUserId,
  };
};

export const AuthContextProvider = (props: any) => {
  const localStorageData = retrieveLocalStorageData(); //returns either undefined (falsy) or a string (truthy)

  let initialToken;
  let initialUserId;
  if (localStorageData) {
    initialToken = localStorageData.token;
    initialUserId = localStorageData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);

  /* token itself would either be truthy or falsy. However, by using just token,
  the variable would be token only and NOT a boolean of truth / false. By using !! we do it such that if token is
  an empty string which would be falsy, !! would make it become stored as false.
  And if it is not an empty string, it would be truthy and !! makes to stored as true */
  const userIsLoggedIn = !!token;

  // the authentication approach is that the server does not store any info about the logged in client.
  // (instead we store it in the localstorage ; i.e. in the client's side ; we can also use cookies instead actually)
  // hence, all we have to do to log out is to change the state of the token to empty.
  // useCallback prevents infinite loops; we don't need to add any dependencies here in this case
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  // here, when the user logs in, we set the token state
  // and also store it in the localStorage
  const loginHandler = (token: any, expirationTime: any, userId: any) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("userId", userId);

    const remainingTime = calculateRemainingTime(expirationTime);

    // meaning we call the logOutHandler; i.e. automatically log out
    // after remainingTime has passed
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (localStorageData) {
      console.log(localStorageData.duration);
      logoutTimer = setTimeout(logoutHandler, localStorageData.duration);
    }
  }, [localStorageData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userId: userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
