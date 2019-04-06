import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

const initialState = {
  users: [],
  products: []
}

// Action types
const GET_USERS = Symbol('f')
const GET_PRODUCTS = Symbol('f')

// Action creators
const getUsersActionCreator = users => ({ type: GET_USERS, users })
const getProductsActionCreator = products => ({ type: GET_PRODUCTS, products })

// Reducer
const reducer = (state = initialState, { type, users, products }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, users }
    case GET_PRODUCTS:
      return { ...state, products }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

// Thunks
const fetchUsers = dispatch => {
  return axios.get('/api/users')
    .then(res => res.data)
    .then(users => dispatch(getUsersActionCreator(users)))
}

const fetchProducts = dispatch => {
  return axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(getProductsActionCreator(products)))
}

// Helper functions
const getManagers = (users, products) => {
  const productsWithManagers = products.filter(p => p.managerId)
  return users.filter(u => productsWithManagers.includes(u.id) )
}

export default store
export { fetchUsers, fetchProducts, getManagers }
