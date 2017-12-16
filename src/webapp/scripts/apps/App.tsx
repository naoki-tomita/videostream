import * as React from "react";
import * as ReactDOM from "react-dom";
import { Root } from "../components/Root";
import { query } from "../utils/Query";

export class App {
  start() {
    const id = Number.parseInt(query("id"));
    ReactDOM.render(
      <Root id={id}/>,
      document.getElementById("app")
    );
  }
}
