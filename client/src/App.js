import React, { useEffect } from 'react'
import { Nav, Home, ProductList } from './components'
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import { fetchUsers, fetchProducts } from "./store"

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return { fetchUsers: () => dispatch(fetchUsers), fetchProducts: () => dispatch(fetchProducts)}
}

const App = ({ fetchUsers, fetchProducts }) => {
  useEffect(() => {
    Promise.all([fetchUsers(), fetchProducts()])
  }, [])

  return <Router>
    <h1>
      Acme Product Managers
    </h1>
    <Nav />
    <Switch>
      <Route path={"/"} exact component={ Home } />
      <Route path={"/products"} exact component={ ProductList } />
      <Route path={"/users"} exact component={""} />
    </Switch>
  </Router>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
