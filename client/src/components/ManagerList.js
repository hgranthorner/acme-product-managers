import React from 'react'
import {connect} from 'react-redux'
import { getManagers } from "../store";

function mapStateToProps({ users, products }) {
  const managers = getManagers(users, products)
  return { managers }
}

const ManagerList = ({ managers }) => {
  return (
    <ul>
      {
        managers.map(m => <li>m.name</li>)
      }
    </ul>
  )
}

export default connect(
  mapStateToProps,
)(ManagerList)