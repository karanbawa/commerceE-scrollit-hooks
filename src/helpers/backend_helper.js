import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// PRODUCT LIST

export const getProductList = () => get(url.GET_ALL_PRODUCTS_IN_LIST)

export const addNewProductInList = product =>
  post(url.ADD_PRODUCT_IN_LIST, product)

export const updateProductInList = product =>
  put(`${url.UPDATE_PRODUCT_IN_LIST}${product._id}`, {
    name: product.name,
    price: product.price,
    // Change after API is updated
    // createdAt: product.createdAt,
    // displayProduct: product.displayProduct,
    category : product.category
  })


export const deleteProductInList = product =>
  del(`${url.DELETE_PRODUCT_IN_LIST}${product._id}`, { headers: { product } })

// CUSTOMERS

export const getCustomers = () => get(url.GET_CUSTOMERS)

export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer)

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

export const deleteCustomer = customer =>
  del(`${url.DELETE_CUSTOMER}${customer._id}`, { headers: { customer } })

export const importCustomers = customers =>
  post(url.IMPORT_CUSTOMERS, customers)

export const deleteEveryCustomer = () => del(`${url.DELETE_ALL_CUSTOMERS}`)

// COLLECTIONS (SAME AS CATEGORIES)

export const getCollections = () => get(url.GET_COLLECTIONS)

export const addCollection = collection => post(url.ADD_COLLECTION, collection)

export const updateCollection = collection =>
  put(`${url.UPDATE_COLLECTION}${collection._id}`, {
    name : collection.name,
    productIds : collection.productIds
    // add after API change
    // image : collection.image,
  })

export const deleteColletion = collectionId =>
  del(`${url.DELETE_COLLECTION}${collectionId}`)
