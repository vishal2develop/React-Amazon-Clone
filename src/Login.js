import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./firebase";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    // firebase login
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authObject) => {
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };

  const register = (e) => {
    e.preventDefault();
    //firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authObject) => {
        // successfully created a new user
        console.log(authObject);
        if (authObject) {
          history.push("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          className="login__logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          className="login__registerButton"
          type="submit"
          onClick={register}
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
