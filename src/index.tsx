import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import "./index.scss";

const root: HTMLElement = document.getElementById("root") as HTMLElement;
ReactDOM.render(<App />, root);