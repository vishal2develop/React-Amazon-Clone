import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Checkout from "./Checkout";
import Home from "./Home";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

// 🚀
const App = () => {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once the app component loads/mounts
    auth.onAuthStateChanged((authUser) => {
      //console.log(`The user is ${authUser.email}`);
      if (authUser) {
        // the user just logged in/ the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    // BEM Convention - Naming convention - app
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
