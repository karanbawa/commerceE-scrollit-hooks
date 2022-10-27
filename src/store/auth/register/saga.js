import { takeEvery, fork, put, all, call } from "redux-saga/effects"
import {showToastSuccess,showToastError} from '../../../helpers/toastBuilder'
//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"
//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper"
// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()
// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.registerUser,
        user.email,
        user.password
      )
      yield put(registerUserSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") { 
      const response = yield call(postJwtRegister, user)
        showToastSuccess("User is registered , email is sent for verification.Please verify", "SUCCESS")
      yield put(registerUserSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeRegister, user)
      yield put(registerUserSuccessful(response))
    }
  } catch (err) {
    let message;
    if (err.response && err.response.status) {
          switch (err.response.status) {
            case 404:
              message = "Sorry! the page you are looking for could not be found";
              break;
            case 500:
              message =
                "Sorry! something went wrong, please contact our support team";
              break;
            case 401:
              message = "Invalid credentials";
              break;
              case 400:
                message = "Invalid credentials";
                break;
            default:
              message = "Sorry! something went wrong, please contact our support team";
              break;
          }
        }
      showToastError(message,"ERROR")
    yield put(registerUserFailed(err)) 
  }
}
export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}
function* accountSaga() {
  yield all([fork(watchUserRegister)])
}
export default accountSaga
