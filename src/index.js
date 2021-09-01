import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./style/main.css";

import App from "./App";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
