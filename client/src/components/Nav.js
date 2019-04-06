import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getManagers } from "../store";

const mapStateToProps = ({ users, products }) => {
  const managers = getManagers(users, products)
  return { managersCount: managers.length };
}

const Nav = ({ managersCount }) => {
  return (
    <ul className="nav nav-pills">
      <li className="nav-item"><NavLink exact={true} className="nav-link" to={"/"}>Home</NavLink></li>
      <li className="nav-item"><NavLink exact={true} className="nav-link" to={"/products"}>Products</NavLink></li>
      <li className="nav-item"><NavLink exact={true} className="nav-link" to={"/users"}>Managers ({managersCount})</NavLink></li>
    </ul>
  );
}

export default connect(
  mapStateToProps,
)(Nav)