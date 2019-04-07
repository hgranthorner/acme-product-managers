import React from 'react'
import {connect} from 'react-redux'

function mapStateToProps({ products }) {
  console.log(products)
  const productsWithoutManagers = products.filter(p => !p.managerId)
  return { haveOpenings: productsWithoutManagers.length > 0 }
}

const Home = ({ haveOpenings }) => {
  return (
    <p>
      We {haveOpenings ? "HAVE" : "DON'T HAVE"} openings.
    </p>
  )
}

export default connect(
  mapStateToProps,
)(Home)