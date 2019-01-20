import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import configureStore from "./configureStore";
//import { createLogger } from "redux-logger";
//import rootReducer from './reducers/rootReducer';

//  const store = createStore(
//    rootReducer,
//    applyMiddleware(thunk)
//  );

//const store = configureStore({});
//  const middleware = [thunk];
//   if (process.env.NODE_ENV !== "production") {
//     middleware.push(createLogger());
//   }

const store = configureStore();
//window.storeDispatch = (...args) => store.dispatch(...args);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
