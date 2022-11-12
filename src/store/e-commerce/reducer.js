import {
  GET_CART_DATA_FAIL,
  GET_CART_DATA_SUCCESS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_SHOPS_FAIL,
  GET_SHOPS_SUCCESS,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  GET_PRODUCT_COMMENTS_SUCCESS,
  GET_PRODUCT_COMMENTS_FAIL,
  ON_LIKE_COMMENT_SUCCESS,
  ON_LIKE_REPLY_SUCCESS,
  ON_ADD_REPLY_SUCCESS,
  ON_ADD_COMMENT_SUCCESS,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCTS_LIST_FAIL,
  ADD_PRODUCT_IN_LIST_SUCCESS,
  ADD_PRODUCT_IN_LIST_FAIL,
  UPDATE_PRODUCT_IN_LIST_SUCCESS,
  UPDATE_PRODUCT_IN_LIST_FAIL,
  DELETE_PRODUCT_IN_LIST_SUCCESS,
  DELETE_PRODUCT_IN_LIST_FAIL,
  IMPORT_CUSTOMERS_SUCCESS,
  DELETE_ALL_CUSTOMERS_SUCCESS,
  DELETE_ALL_CUSTOMERS_FAIL,
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_FAIL,
  DELETE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_FAIL,
  ADD_COLLECTION,
  ADD_COLLECTION_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  collections: [],
  products: [],
  product: {},
  productList: [],
  orders: [],
  cartData: {},
  customers: [],
  shops: [],
  error: {},
  productComments: [],
  inventoryItems: [],
}

const Ecommerce = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: action.payload
      }

    case GET_COLLECTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: state.collections.map(collection =>
          collection._id === action.payload._id.toString()
            ? { ...collection, ...action.payload }
            : collection
        ),
      }

    case UPDATE_COLLECTION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_COLLECTION_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        collections: state.collections.filter(
          collection => collection._id.toString() !== action.payload.toString()
        ),
      }

    case ADD_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: [...state.collections, action.payload],
      }

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      }

    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: action.payload,
      }

    case GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload,
      }

    case GET_PRODUCTS_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_PRODUCT_IN_LIST_SUCCESS:
      return {
        ...state,
        productList: [...state.productList, action.payload],
      }

    case ADD_PRODUCT_IN_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_PRODUCT_IN_LIST_SUCCESS:
      return {
        ...state,
        productList: state.productList.map(product =>
          product._id === action.payload._id.toString()
            ? { product, ...action.payload }
            : product
        ),
      }

    case UPDATE_PRODUCT_IN_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_PRODUCT_IN_LIST_SUCCESS:
      return {
        ...state,
        productList: state.productList.filter(
          product => product._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_PRODUCT_IN_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      }

    case GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }

    case ADD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id.toString()
            ? { order, ...action.payload }
            : order
        ),
      }

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          order => order.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CART_DATA_SUCCESS:
      return {
        ...state,
        cartData: action.payload,
      }

    case GET_CART_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      }

    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      }

    case ADD_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.email.toString() === action.payload.email.toString()
            ? { customer, ...action.payload }
            : customer
        ),
      }

    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(
          customer =>
            customer.email.toString() !== action.payload.email.toString()
        ),
      }

    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: [],
      }

    case DELETE_ALL_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case IMPORT_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, ...action.payload],
      }

    case GET_SHOPS_SUCCESS:
      return {
        ...state,
        shops: action.payload,
      }

    case GET_SHOPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PRODUCT_COMMENTS_SUCCESS:
    case ON_LIKE_COMMENT_SUCCESS:
    case ON_LIKE_REPLY_SUCCESS:
    case ON_ADD_REPLY_SUCCESS:
    case ON_ADD_COMMENT_SUCCESS:
      return {
        ...state,
        productComments: action.payload,
      }

    case GET_PRODUCT_COMMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Ecommerce
