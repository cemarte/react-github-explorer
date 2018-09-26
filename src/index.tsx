import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import "./index.scss";
import { Provider } from "react-redux";
import configureStore from './configureStore'


const store = configureStore({});

const root: HTMLElement = document.getElementById("root") as HTMLElement;
const renderApp = () => ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
  ​
  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('./components/App', () => {
      renderApp()
    })
  }
  ​
  renderApp();