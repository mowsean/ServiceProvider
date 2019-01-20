import { rootActionTypes } from "./actionTypes";
import * as Sentry from "@sentry/browser";

export const errorActionHandler = (dispatch, errorActions) => error => {
  if (error.message.toLowerCase() === "unauthorized") {
    dispatch({
      type: rootActionTypes.SET_GLOBAL_BLOCKING_MESSAGE,
      message: "Your session has expired"
    });

    setTimeout(() => {
      dispatch({
        type: rootActionTypes.SET_GLOBAL_BLOCKING_MESSAGE,
        message: ""
      });

      // dispatching the USER.UNAUTHORIZED will clear the user from the redux store
      // If there is no user, the App.js redirects to /login
      dispatch({ type: rootActionTypes.USER.UNAUTHORIZED, error });
    }, 2000);
  } else {
    // we might use this spot to set some 'global error messaging' stuff
    if (process.env.REACT_APP_SENTRY_DSN) {
      Sentry.captureException(error);
    }

    const _errorActions = Array.isArray(errorActions)
      ? errorActions
      : [errorActions];

    _errorActions.forEach(errorAction => {
      // error actions may (or may not) need error, so spread that onto the action
      // an extra error prop won't hurt on an action if superfluous
      //  dispatch({ ...errorAction, error });
    });
  }
};
