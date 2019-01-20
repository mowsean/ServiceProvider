import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
//import { createLogger } from 'redux-logger';
import rootReducer from "./reducers/rootReducer";

//const loggerMiddleware = createLogger();

//  export function injectAsyncReducer(store, name, asyncReducer) {
//    store.asyncReducers[name] = asyncReducer;
//    store.replaceReducer(createRootReducer(store.asyncReducers));
//  }

//  export function removeAsyncReducer(store, name) {
//    delete store.asyncReducers[name];
//    store.replaceReducer(createRootReducer(store.asyncReducers));
//  }
// export default function configureStore(initialState) {
//   let store = createStore(createRootReducer(), initialState, composeEnhancers);
//   store.asyncReducers = {};
//   return store;
// }
export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
  );
}
