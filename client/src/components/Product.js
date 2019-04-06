import React, { useState } from 'react'
import {connect} from 'react-redux'
import { updateProduct } from '../store'

const mapStateToProps = ({products, users}) => {
  return {products, users}
}

const mapDispatchToProps = dispatch => {
  return { updateProduct: (productId, managerId) => dispatch(updateProduct(productId, managerId))}
}

const Product = ({ product, users, updateProduct }) => {
  const [managerId, setManagerId] = useState(product.managerId || 0)
  const handleChange = evt => {
    setManagerId(evt.target.value)
  }
  const handleSubmit = evt => {
    evt.preventDefault()
    console.log(product.id, managerId)
    updateProduct(product.id, managerId)
  }

  return (
    <div>
      <h6>{product.name}</h6>
      <form className="form-group" onSubmit={handleSubmit}>
        <label>
          <em>Product Manager</em>
        </label>
        <select className={"form-control"} value={managerId} onChange={handleChange}>
          <option value={0}>-- none --</option>
          {
            users.map(u => (
              <option value={u.id} key={u.id}>{u.name}</option>
            ))
          }
        </select>
        <button type={"submit"}>Save</button>
      </form>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)