import toastr from "toastr";
import "toastr/build/toastr.css";
import { rootActionTypes } from "../actions/actionTypes";

export const toastrMiddleware = store => next => action => {
  switch (action.type) {
    case rootActionTypes.TOASTR_MESSAGE.SUCCESS:
      toastr.success(action.message);
      break;
    case rootActionTypes.TOASTR_MESSAGE.ERROR:
      toastr.error(action.message);
      break;
    default:
      break;
  }

  return next(action);
};
