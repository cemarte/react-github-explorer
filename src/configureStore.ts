import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import monitorReducersEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middleware/logger";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  if (process.env.NODE_ENV !== "production" && (module as any).hot) {
    (module as any).hot.accept("./reducers", () => {
        const nextRootReducer = require('./reducers/index');
        store.replaceReducer(nextRootReducer)
    });
  }
  return store;
}
