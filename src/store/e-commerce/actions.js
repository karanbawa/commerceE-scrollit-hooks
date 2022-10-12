import {
  GET_CART_DATA,
  GET_CART_DATA_FAIL,
  GET_CART_DATA_SUCCESS,
  GET_ORDERS,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  ADD_NEW_ORDER,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER,
  DELETE_ALL_ORDERS,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_CUSTOMERS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_NEW_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  GET_SHOPS,
  GET_SHOPS_FAIL,
  GET_SHOPS_SUCCESS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_COMMENTS,
  GET_PRODUCT_COMMENTS_SUCCESS,
  GET_PRODUCT_COMMENTS_FAIL,
  ON_LIKE_COMMENT,
  ON_LIKE_COMMENT_SUCCESS,
  ON_LIKE_COMMENT_FAIL,
  ON_LIKE_REPLY,
  ON_LIKE_REPLY_SUCCESS,
  ON_LIKE_REPLY_FAIL,
  ON_ADD_REPLY,
  ON_ADD_REPLY_SUCCESS,
  ON_ADD_REPLY_FAIL,
  ON_ADD_COMMENT,
  ON_ADD_COMMENT_SUCCESS,
  ON_ADD_COMMENT_FAIL,
  GET_PRODUCT_LIST,
  ADD_NEW_PRODUCT_IN_LIST,
  ADD_PRODUCT_IN_LIST_SUCCESS,
  ADD_PRODUCT_IN_LIST_FAIL,
  UPDATE_PRODUCT_IN_LIST,
  UPDATE_PRODUCT_IN_LIST_SUCCESS,
  UPDATE_PRODUCT_IN_LIST_FAIL,
  DELETE_PRODUCT_IN_LIST,
  DELETE_PRODUCT_IN_LIST_SUCCESS,
  DELETE_PRODUCT_IN_LIST_FAIL,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCTS_LIST_FAIL,
  IMPORT_CUSTOMERS,
  IMPORT_CUSTOMERS_SUCCESS,
  IMPORT_CUSTOMERS_FAIL,
  DELETE_ALL_CUSTOMERS,
  DELETE_ALL_CUSTOMERS_SUCCESS,
  DELETE_ALL_CUSTOMERS_FAIL,
} from "./actionTypes"

export const getProducts = () => ({
  type: GET_PRODUCTS,
})

export const getProductsSuccess = products => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
})

export const getProductsFail = error => ({
  type: GET_PRODUCTS_FAIL,
  payload: error,
})

export const getProductList = () => ({
  type: GET_PRODUCT_LIST,
})

export const getProductListSuccess = productList => ({
  type: GET_PRODUCT_LIST_SUCCESS,
  payload: productList,
})

export const getProductListFail = error => ({
  type: GET_PRODUCTS_LIST_FAIL,
  payload: error,
})

export const addNewProductInList = product => ({
  type: ADD_NEW_PRODUCT_IN_LIST,
  payload: product,
})

export const addProductInListSuccess = product => ({
  type: ADD_PRODUCT_IN_LIST_SUCCESS,
  payload: product,
})

export const addProductInListFail = error => ({
  type: ADD_PRODUCT_IN_LIST_FAIL,
  payload: error,
})

export const updateProductInList = product => ({
  type: UPDATE_PRODUCT_IN_LIST,
  payload: product,
})

export const updateProductInListSuccess = product => ({
  type: UPDATE_PRODUCT_IN_LIST_SUCCESS,
  payload: product,
})

export const updateProductInListFail = error => ({
  type: UPDATE_PRODUCT_IN_LIST_FAIL,
  payload: error,
})

export const deleteProductInList = product => ({
  type: DELETE_PRODUCT_IN_LIST,
  payload: product,
})

export const deleteProductInListSuccess = product => ({
  type: DELETE_PRODUCT_IN_LIST_SUCCESS,
  payload: product,
})

export const deleteProductInListFail = error => ({
  type: DELETE_PRODUCT_IN_LIST_FAIL,
  payload: error,
})

export const getProductDetail = productId => ({
  type: GET_PRODUCT_DETAIL,
  productId,
})

export const getProductDetailSuccess = products => ({
  type: GET_PRODUCT_DETAIL_SUCCESS,
  payload: products,
})

export const getProductDetailFail = error => ({
  type: GET_PRODUCT_DETAIL_FAIL,
  payload: error,
})

export const getOrders = () => ({
  type: GET_ORDERS,
})

export const getOrdersSuccess = orders => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders,
})

export const getOrdersFail = error => ({
  type: GET_ORDERS_FAIL,
  payload: error,
})

export const addNewOrder = order => ({
  type: ADD_NEW_ORDER,
  payload: order,
})

export const addOrderSuccess = order => ({
  type: ADD_ORDER_SUCCESS,
  payload: order,
})

export const addOrderFail = error => ({
  type: ADD_ORDER_FAIL,
  payload: error,
})

export const updateOrder = order => ({
  type: UPDATE_ORDER,
  payload: order,
})

export const updateOrderSuccess = order => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: order,
})

export const updateOrderFail = error => ({
  type: UPDATE_ORDER_FAIL,
  payload: error,
})

export const deleteOrder = order => ({
  type: DELETE_ORDER,
  payload: order,
})


export const deleteOrderSuccess = order => ({
  type: DELETE_ORDER_SUCCESS,
  payload: order,
})

export const deleteOrderFail = error => ({
  type: DELETE_ORDER_FAIL,
  payload: error,
})

export const getCartData = () => ({
  type: GET_CART_DATA,
})

export const getCartDataSuccess = cartData => ({
  type: GET_CART_DATA_SUCCESS,
  payload: cartData,
})

export const getCartDataFail = error => ({
  type: GET_CART_DATA_FAIL,
  payload: error,
})

export const getCustomers = () => ({
  type: GET_CUSTOMERS,
})

export const getCustomersSuccess = customers => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: customers,
})

export const getCustomersFail = error => ({
  type: GET_CUSTOMERS_FAIL,
  payload: error,
})

export const addNewCustomer = customer => ({
  type: ADD_NEW_CUSTOMER,
  payload: customer,
})

export const addCustomerSuccess = customer => ({
  type: ADD_CUSTOMER_SUCCESS,
  payload: customer,
})

export const addCustomerFail = error => ({
  type: ADD_CUSTOMER_FAIL,
  payload: error,
})

export const updateCustomer = customer => ({
  type: UPDATE_CUSTOMER,
  payload: customer,
})

export const updateCustomerSuccess = customer => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer,
})

export const updateCustomerFail = error => ({
  type: UPDATE_CUSTOMER_FAIL,
  payload: error,
})

export const deleteCustomer = customer => ({
  type: DELETE_CUSTOMER,
  payload: customer,
})

export const deleteCustomerSuccess = customer => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: customer,
})

export const deleteCustomerFail = error => ({
  type: DELETE_CUSTOMER_FAIL,
  payload: error,
})

export const importCustomers = customers => ({
  type: IMPORT_CUSTOMERS,
  payload: customers,
})

export const importCustomerSuccess = customers => ({
  type: IMPORT_CUSTOMERS_SUCCESS,
  payload: customers.customerInfo,
})

export const importCustomerFail = error => ({
  type: IMPORT_CUSTOMERS_FAIL,
  payload: error,
})

export const deleteAllCustomers = () => ({
  type: DELETE_ALL_CUSTOMERS,
})

export const deleteAllOrders = () => ({
  type: DELETE_ALL_ORDERS,
})

export const deleteAllOrdersSuccess = () => ({
  type: DELETE_ALL_ORDER_SUCCESS,
})

export const deleteAllOrdersFail = () => ({
  type: DELETE_ALL_ORDER_FAIL,
})

export const deleteAllCustomersSuccess = () => ({
  type: DELETE_ALL_CUSTOMERS_SUCCESS,
})

export const deleteAllCustomersFail = error => ({
  type: DELETE_ALL_CUSTOMERS_FAIL,
  payload: error,
})

export const getShops = () => ({
  type: GET_SHOPS,
})

export const getShopsSuccess = shops => ({
  type: GET_SHOPS_SUCCESS,
  payload: shops,
})

export const getShopsFail = error => ({
  type: GET_SHOPS_FAIL,
  payload: error,
})

export const getProductComments = () => ({
  type: GET_PRODUCT_COMMENTS,
})

export const getProductCommentsSuccess = comments => ({
  type: GET_PRODUCT_COMMENTS_SUCCESS,
  payload: comments,
})

export const getProductCommentsFail = error => ({
  type: GET_PRODUCT_COMMENTS_FAIL,
  payload: error,
})

export const onLikeComment = (commentId, productId) => ({
  type: ON_LIKE_COMMENT,
  payload: { commentId, productId },
})

export const onLikeCommentSuccess = comments => ({
  type: ON_LIKE_COMMENT_SUCCESS,
  payload: comments,
})

export const onLikeCommentFail = error => ({
  type: ON_LIKE_COMMENT_FAIL,
  payload: error,
})

export const onLikeReply = (commentId, productId, replyId) => ({
  type: ON_LIKE_REPLY,
  payload: { commentId, productId, replyId },
})

export const onLikeReplySuccess = comments => ({
  type: ON_LIKE_REPLY_SUCCESS,
  payload: comments,
})

export const onLikeReplyFail = error => ({
  type: ON_LIKE_REPLY_FAIL,
  payload: error,
})

export const onAddReply = (commentId, productId, replyText) => ({
  type: ON_ADD_REPLY,
  payload: { commentId, productId, replyText },
})

export const onAddReplySuccess = comments => ({
  type: ON_ADD_REPLY_SUCCESS,
  payload: comments,
})

export const onAddReplyFail = error => ({
  type: ON_ADD_REPLY_FAIL,
  payload: error,
})

export const onAddComment = (productId, commentText) => ({
  type: ON_ADD_COMMENT,
  payload: { productId, commentText },
})

export const onAddCommentSuccess = comments => ({
  type: ON_ADD_COMMENT_SUCCESS,
  payload: comments,
})

export const onAddCommentFail = error => ({
  type: ON_ADD_COMMENT_FAIL,
  payload: error,
})
