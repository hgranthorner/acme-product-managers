import React from 'react'
import Product from './Product'
import {connect} from 'react-redux'

function mapStateToProps({ products }) {
  return { products }
}

const ProductList = ({ products }) => {
  return (
    <ul className={"list-group"}>
      {
        products.map(product => <li className={"list-group-item"} key={product.id}><Product product={product} /></li>)
      }
    </ul>
  )
}

export default connect(
  mapStateToProps,
)(ProductList)