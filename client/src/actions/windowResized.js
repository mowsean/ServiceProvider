import { rootActionTypes } from "./actionTypes";

/**
 * @function windowResized
 * @param {integer} size - the size of the current browser window
 * @description
 * Action to run whenever the window is resized and to set the current window width in state
 * @returns {function} a thunk for the WINDOW_RESIZED action
 * */
const windowResized = size => ({
  type: rootActionTypes.WINDOW_RESIZED,
  size: size
});

export default windowResized;
