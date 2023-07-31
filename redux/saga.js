import axios from "axios";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import * as action from "./reducer";
import { Alert, Snackbar } from "@mui/material";
axios.defaults.baseURL = "https://backend.albaseerdevelopers.com/";

function* Main_Category({ payload }) {
  try {
    const resp = yield call(axios.get, "category/main-list?take=23&page=1");
    const { data } = resp.data;

    yield put(action.Main_Category(data));
  } catch (error) {}
}

function* Child_Category({ payload }) {
  try {
    const resp = yield call(
      axios.get,
      `/category/child-list-commercial/${payload}`
    );
    const { data } = resp.data;
    yield put(action.Child_Category(data));
  } catch (error) {}
}

function* Customers({ payload }) {
  const { rowsPerPage, page } = payload;
  try {
    const resp = yield call(
      axios.get,
      `/user/all?take=${rowsPerPage}&page=${page}`
    );
    const { data } = resp.data;
    const { pagination } = resp.data;
    yield put(action.Customers(data));
    yield put(action.Customers_Pagination(pagination));
  } catch (error) {}
}

function* User({ payload }) {
  try {
    const resp = yield call(axios.get, `/user/${payload}`);
    const data = resp.data;
    yield put(action.User(data));
  } catch (error) {}
}

function* Country() {
  try {
    const resp = yield call(axios.get, "/address/countries-list");
    const { data } = resp.data;
    yield put(action.Countries(data));
  } catch (error) {}
}

function* Ad_List({ payload }) {
  const { id, take, page } = payload;
  try {
    const respo = yield call(
      axios.get,
      `ad/list/109/${id}?take=${take}&page=${page}`
    );
    const { data } = respo.data;
    yield put(action.Ads_List(respo.data));
    yield put(action.Ads_Pagination(respo.data));
  } catch (error) {}
}
function* Ad_Detail({ payload }) {
  try {
    const respo = yield call(axios.get, `ad/detail/${payload}`);
    const { data } = respo.data;
    const { customer_id } = data;
    yield put(action.Ad_Detail(data));
    yield put({ type: "ADD_USER", payload: customer_id });
  } catch (error) {}
}
function* Ad_User({ payload }) {
  try {
    const respo = yield call(axios.get, `user/${payload}`);
    // const { data } = respo.data;
    yield put(action.Ad_User(respo.data));
  } catch (error) {}
}

function* Add_Category({ payload }) {
  try {
    const respo = yield call(axios.post, "category/add", {
      payload,
    });
    const data = respo.data;
  } catch (error) {}
}
function* Login({ payload }) {
  try {
    const respo = yield call(axios.post, "user/login", payload);
    const { access_token, user, message } = respo.data;
    const links = document.createElement("a");
    if (access_token) {
      links.setAttribute("href", "/");
      localStorage.setItem("Access", access_token);
      localStorage.setItem("Token_id", user.id);
      links.click();
    } else {
    }
  } catch (error) {
    const { message } = error.response.data;
    yield put(action.Message({ message: message, open: true }));
  }
}
function* Register({ payload }) {
  try {
    const respo = yield call(axios.post, "user/register", payload);
    const { message } = respo.data;
    if (message == "Verification code sent successfully") {
      yield put(action.Verify(true));
    } else {
      yield put(action.Message({ message: message, open: true }));
    }
  } catch (error) {}
}
function* Notification({ payload }) {
  try {
    const respo = yield call(
      axios.post,
      `/notifications/admin/${payload.countryId}`,
      payload.data
    );
    const { message } = respo.data;
    if (message == "admin Notification created successfully") {
      yield put(action.Verify(true));
    } else {
      yield put(action.Message({ message: message, open: true }));
    }
  } catch (error) {}
}
function* Verify({ payload }) {
  try {
    const respo = yield call(axios.post, "user/verify", payload);
    const { message } = respo.data;
    if (message == "Verification successful") {
      const links = document.createElement("a");
      links.setAttribute("href", "/authentication/sign-in/");
      links.click();
    } else {
      yield put(action.Message({ message: message, open: true }));
    }
  } catch (error) {}
}
function* Forget_Verify({ payload }) {
  try {
    const respo = yield call(axios.post, "user/forget-password", payload);
    const { message } = respo.data;
    if (message == "Password Changed Successfully") {
      const links = document.createElement("a");
      links.setAttribute("href", "/authentication/sign-in/");
      links.click();
    } else {
      yield put(action.Message({ message: message, open: true }));
    }
  } catch (error) {}
}
function* Forget_Password({ payload }) {
  try {
    const respo = yield call(axios.post, "user/otp-forget-password", payload);
    const { message } = respo.data;
    if (message == "OTP Send Successfully") {
      yield put(action.Verify(true));
    } else {
      yield put(action.Message({ message: message, open: true }));
    }
  } catch (error) {}
}
function* Banner_Home({ payload }) {
  const { country_id, page } = payload;
  try {
    const respo = yield call(
      axios.get,
      `banner/banner-home-list/${country_id}?take=40&page=${page}`
    );
    const { data, pagination } = respo.data;
    yield put(action.Banner_Home(data));
    yield put(action.Pagination(pagination));
  } catch (error) {}
}
function* Banner_Recommend({ payload }) {
  const { country_id, page } = payload;
  try {
    const respo = yield call(
      axios.get,
      `banner/recommand-home-list/${country_id}?take=40&page=${page}`
    );
    const { data, pagination } = respo.data;
    yield put(action.Banner_Recommend(data));
    yield put(action.Pagination(pagination));
  } catch (error) {}
}
function* Banner_Splash({ payload }) {
  const { country_id, page } = payload;
  try {
    const respo = yield call(
      axios.get,
      `banner/splash-home-list/${country_id}?take=40&page=${page}`
    );
    const { data, pagination } = respo.data;
    yield put(action.Banner_Splash(data));
    yield put(action.Pagination(pagination));
  } catch (error) {}
}
function* Banner_Category({ payload }) {
  const { country_id, page, id } = payload;
  try {
    const respo = yield call(
      axios.get,
      `banner/banner-category-list/${country_id}/${id}?take=40&page=${page}`
    );
    const { data, pagination } = respo.data;
    yield put(action.Banner_Category(data));
    yield put(action.Pagination(pagination));
  } catch (error) {}
}
export default function* HomeSaga() {
  yield takeLatest("MAIN_CATEGORY", Main_Category);
  yield takeLatest("CHILD_CATEGORY", Child_Category);
  yield takeLatest("CUSTOMERS", Customers);
  yield takeLatest("COUNTRY", Country);
  yield takeLatest("ADD_LIST", Ad_List);
  yield takeLatest("ADD_DETAIL", Ad_Detail);
  yield takeLatest("ADD_USER", Ad_User);
  yield takeLatest("ADD_Category", Add_Category);
  yield takeLatest("USER", User);
  yield takeLatest("LOGIN", Login);
  yield takeLatest("REGISTER", Register);
  yield takeLatest("VERIFY", Verify);
  yield takeLatest("BANNER_HOME", Banner_Home);
  yield takeLatest("BANNER_RECOMMEND", Banner_Recommend);
  yield takeLatest("BANNER_SPLASH", Banner_Splash);
  yield takeLatest("BANNER_CATEGORY", Banner_Category);
  yield takeLatest("FORGET_VERIFY", Forget_Verify);
  yield takeLatest("FORGET_PASSWORD", Forget_Password);
  yield takeLatest("NOTIFICATIONS", Notification);
}
