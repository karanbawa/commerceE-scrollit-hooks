import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { loginSuccess, logoutUserSuccess, apiError } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import axios from "axios";
import { headers } from "helpers/axios-headers";
import toastr from "toastr";

const fireBaseBackend = getFirebaseBackend();

const showToast = (message, title) => {
  toastr.options = {
    positionClass: "toast-top-right",
    newestOnTop: true,
    extendedTimeOut: 1000,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    closeButton: true,
    debug: true,
    preventDuplicates: true,
    extendedTimeOut: 1000,
  };
  toastr.error(message, title);
};

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      );
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      // const response = yield call(postFakeLogin, {
      //   email: user.email,
      //   password: user.password,
      // });
      // localStorage.setItem("authUser", JSON.stringify(response));
      // yield put(loginSuccess(response));
      try {
        let axiosConfig = {
          headers: {
            Accept: "application/soap+xml; charset=utf-8",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        };
        axios
          .post("http://localhost:8080/v1/login/basic", axiosConfig)
          .then((res, error) => {
            if (
              res.data.isActive == "true" &&
              res.data.isVerifiedMail == "true"
            ) {
              localStorage.setItem("authUser", JSON.stringify(res.data));
              history.push("/dashboard");
            } else if (
              res.data.isActive == "true" &&
              res.data.isVerifiedMail == "false"
            ) {
              showToast("Please verify email", "Login failed");
            } else if (
              res.data.isActive == "false" &&
              res.data.isVerifiedMail == "true"
            ) {
              showToast("User does not exist", "Login failed");
            }
          });
      } catch (error) {
        console.log("error");
      }
    }
    // history.push("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, data, type);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history.push("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
