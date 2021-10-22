import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <Auth0Provider
    domain="dev-z1jhjqhb.us.auth0.com"
    clientId="PqlHTHO5dYSqPnVi0hDVkGrxNk99y3Rc"
    redirectUri={window.location.origin}
  >
    <Login />
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
