import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  GET_CART_DATA,
  GET_CUSTOMERS,
  GET_ORDERS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS,
  GET_SHOPS,
  ADD_NEW_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  ADD_NEW_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_PRODUCTS_TEST,
  IMPORT_CUSTOMERS,
  IMPORT_CUSTOMERSDB,
  DELETE_CUSTOMER_ALL,
} from "./actionTypes";
import {
  getCartDataFail,
  getCartDataSuccess,
  getCustomersFail,
  getCustomersSuccess,
  getOrdersFail,
  getOrdersSuccess,
  addOrderFail,
  addOrderSuccess,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
  getProductDetailFail,
  getProductDetailSuccess,
  getProductsFail,
  getProductsSuccess,
  getShopsFail,
  getShopsSuccess,
  addCustomerFail,
  addCustomerSuccess,
  updateCustomerSuccess,
  updateCustomerFail,
  deleteCustomerSuccess,
  deleteCustomerFail,
  getProductsTestSuccess,
  getProductsTestFail,
  importCustomersSuccess,
  importCustomersFail,
  importCustomersSuccessdb,
  importCustomersFaildb,
  deleteAllcustomersSuccess,
  deleteAllcustomersFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCartData,
  getProductsTest,
  getCustomers,
  getOrders,
  addNewOrder,
  updateOrder,
  deleteOrder,
  getProducts,
  getShops,
  getProductDetail,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  importCustomers,
  importCustomersdb,
  deleteAllCustomers,
} from "helpers/fakebackend_helper";

function* fetchProducts() {
  try {
    const response = yield call(getProducts);
    yield put(getProductsSuccess(response));
  } catch (error) {
    yield put(getProductsFail(error));
  }
}

function* fetchProductDetail({ productId }) {
  try {
    const response = yield call(getProductDetail, productId);
    yield put(getProductDetailSuccess(response));
  } catch (error) {
    yield put(getProductDetailFail(error));
  }
}

function* fetchProductsTest() {
  try {
    const response = yield call(getProductsTest);
    yield put(getProductsTestSuccess(response));
  } catch (error) {
    yield put(getProductsTestFail(error));
  }
}

function* fetchOrders() {
  try {
    const response = yield call(getOrders);
    yield put(getOrdersSuccess(response));
  } catch (error) {
    yield put(getOrdersFail(error));
  }
}

function* onAddNewOrder({ payload: order }) {
  try {
    const response = yield call(addNewOrder, order);
    yield put(addOrderSuccess(response));
  } catch (error) {
    yield put(addOrderFail(error));
  }
}

function* onUpdateOrder({ payload: order }) {
  try {
    const response = yield call(updateOrder, order);
    yield put(updateOrderSuccess(response));
  } catch (error) {
    yield put(updateOrderFail(error));
  }
}

function* onDeleteOrder({ payload: order }) {
  try {
    const response = yield call(deleteOrder, order);
    yield put(deleteOrderSuccess(response));
  } catch (error) {
    yield put(deleteOrderFail(error));
  }
}

function* fetchCartData() {
  try {
    const response = yield call(getCartData);
    yield put(getCartDataSuccess(response));
  } catch (error) {
    yield put(getCartDataFail(error));
  }
}

function* fetchCustomers() {
  try {
    const response = yield call(getCustomers);
    yield put(getCustomersSuccess(response));
  } catch (error) {
    yield put(getCustomersFail(error));
  }
}

function* fetchImportCustomers() {
  try {
    const response = yield call(importCustomers);
    yield put(importCustomersSuccess(response));
  } catch (error) {
    yield put(importCustomersFail(error));
  }
}

function* fetchImportCustomersdb({ payload: customers }) {
  try {
    const response = yield call(importCustomersdb, customers);
    yield put(importCustomersSuccessdb(response));
  } catch (error) {
    yield put(importCustomersFaildb(error));
  }
}

function* fetchShops() {
  try {
    const response = yield call(getShops);
    yield put(getShopsSuccess(response));
  } catch (error) {
    yield put(getShopsFail(error));
  }
}

function* onAddNewCustomer({ payload: customer }) {
  try {
    const response = yield call(addNewCustomer, customer);
    yield put(addCustomerSuccess(response));
  } catch (error) {
    yield put(addCustomerFail(error));
  }
}

function* onUpdateCustomer({ payload: customer }) {
  try {
    const response = yield call(updateCustomer, customer);
    yield put(updateCustomerSuccess(response));
  } catch (error) {
    yield put(updateCustomerFail(error));
  }
}

function* onDeleteCustomer({ payload: customer }) {
  try {
    const response = yield call(deleteCustomer, customer);
    yield put(deleteCustomerSuccess(response));
  } catch (error) {
    yield put(deleteCustomerFail(error));
  }
}

function* onDeleteAll() {
  try {
    const response = yield call(deleteAllCustomers);
    yield put(deleteAllcustomersSuccess(response));
  } catch (error) {
    yield put(deleteAllcustomersFail(error));
  }
}

function* ecommerceSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(GET_PRODUCTS_TEST, fetchProductsTest);
  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail);
  yield takeEvery(GET_ORDERS, fetchOrders);
  yield takeEvery(ADD_NEW_ORDER, onAddNewOrder);
  yield takeEvery(UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
  yield takeEvery(GET_CART_DATA, fetchCartData);
  yield takeEvery(GET_CUSTOMERS, fetchCustomers);
  yield takeEvery(IMPORT_CUSTOMERS, fetchImportCustomers);
  yield takeEvery(IMPORT_CUSTOMERSDB, fetchImportCustomersdb);
  yield takeEvery(GET_SHOPS, fetchShops);
  yield takeEvery(ADD_NEW_CUSTOMER, onAddNewCustomer);
  yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer);
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer);
  yield takeEvery(DELETE_CUSTOMER_ALL, onDeleteAll);
}

export default ecommerceSaga;
