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
const UPDATE_PRODUCT = Symbol('f')

// Action creators
const getUsersActionCreator = users => ({ type: GET_USERS, users })
const getProductsActionCreator = products => ({ type: GET_PRODUCTS, products })
const updateProductActionCreator = (productId, managerId) => ({ type: UPDATE_PRODUCT, productId, managerId })

// Reducer
const reducer = (state = initialState, { type, users, products, productId, managerId }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, users }
    case GET_PRODUCTS:
      return { ...state, products }
    case UPDATE_PRODUCT:
      const newProducts = [...state.products].map(p => {
        if (p.id === productId) {
          p.managerId = Number(managerId)
        }

        return p
      })

      return { ...state, products: newProducts }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

// Thunks
const fetchUsers = () => {
  return dispatch => {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(getUsersActionCreator(users)))
  }
}

const fetchProducts = () => {
  return dispatch => {
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(getProductsActionCreator(products)))
  }
}

const updateProduct = (productId, managerId) => {
  return dispatch => {
    axios.put(`/api/products/${productId}`, {managerId})
      .then(() => console.log(managerId))
      .then(() => dispatch(updateProductActionCreator(productId, managerId)))
  }
}

// Helper functions
const getManagers = (users, products) => {
  const productsWithManagers = products.filter(p => p.managerId).map(p => Number(p.managerId))
  return users.filter(u => productsWithManagers.includes(u.id) )
}

export default store
export { fetchUsers, fetchProducts, getManagers, updateProduct }
