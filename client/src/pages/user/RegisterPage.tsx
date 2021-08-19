import React, { useState, useRef, useContext } from "react";
import classes from "./RegisterPage.module.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Card from "../../components/ui/Card";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const RegisterPage = () => {
  const history = useHistory();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    // optional: Add validation
    //this depends on the app itself. Read the docs. "Firebase REST API in this case" ; maybe can google "MONGODB REST API?"

    setIsLoading(true); //isLoading as in we are going to send the login details to the server, so it will be loading
    let url: any;
    if (isLogin) {
      //handling signin
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    } else {
      //handling signup
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    }
    console.log(url);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // here we check if there is data, then if there is data.error and then data.error.message
            // we should console.log(data) first to see how to use the object in that data
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("This is the ID");
        console.log(data.localId);
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000 // because its it miliseconds
        );
        //data.idToken is the authentication token (for firebase)
        /* this token should be an app-wide state because many components use it (hence we can use context / redux. (using context here) )
         */
        authCtx.login(data.idToken, expirationTime.toISOString(), data.localId);
        history.replace("/all"); //redirects and ensure user cannot go back to prev page
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Card>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <LoadingSpinner />}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </Card>
  );
};

export default RegisterPage;
