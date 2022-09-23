import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

export const getProductList = () => get(url.GET_ALL_PRODUCTS_IN_LIST)

export const addNewProductInList = product =>
  post(url.ADD_PRODUCT_IN_LIST, product)

export const updateProductInList = product =>
  put(`${url.UPDATE_PRODUCT_IN_LIST}${product._id}`, {
    name: product.name,
    price: product.price,
    // createdAt: product.createdAt,
    // displayProduct: product.displayProduct,
    // category : product.category
  })

export const deleteProductInList = product =>
  del(`${url.DELETE_PRODUCT_IN_LIST}${product._id}`, { headers: { product } })

export const getCustomers = () => get(url.GET_CUSTOMERS)

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer)

// update CUSTOMER
export const updateCustomer = customer =>
  put(`${url.UPDATE_CUSTOMER}${customer._id}`, {
    username: customer.username,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    rating: customer.rating,
    walletBalance: customer.walletBalance,
    joiningDate: customer.joiningDate,
  })

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(`${url.DELETE_CUSTOMER}${customer._id}`, { headers: { customer } })

export const importCustomers = customers =>
  post(url.IMPORT_CUSTOMERS, customers)
