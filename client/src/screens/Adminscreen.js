import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Route,Switch} from 'react-router'
import { Link } from 'react-router-dom';

import Userslist from "./Userslist";
import Addnewpizza from "./Addnewpizza";
import Orderslist from "./Orderslist";
import Pizzaslist from "./Pizzaslist";
import Editpizza from "./Editpizza";

export default function Adminscreen() {
  const cartstate = useSelector((state) => state.cartReducer);
  const currentUser = JSON.parse(localStorage.getItem("currentUSer"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  });
  return (
    <div>
      <div className="row justify-content-center p-3">
        <div className="col-md-10">
          <h2 style={{ fontSize: "25px" }}>Admin Pannel</h2>

          <ul className="adminfunction">
            <li>
              <Link to={"/admin/userslist"} style={{color:'white'}}>Users List</Link>
            </li>
            <li>
              <Link to={"/admin/pizzaslist"} style={{color:'white'}}>Pizzas List</Link>
            </li>
            <li>
              <Link to={"/admin/addnewpizza"} style={{color:'white'}}>Add New Pizza</Link>
            </li>
            <li>
              <Link to={"/admin/orderslist"} style={{color:'white'}}>Orders List</Link>
            </li>
          </ul>

            <Switch>
            <Route path='/admin' component={Userslist} exact/>
                <Route path='/admin/userslist' component={Userslist} exact/>
                <Route path='/admin/orderslist' component={Orderslist}  exact/>
                <Route path='/admin/pizzaslist' component={Pizzaslist}  exact/>
                <Route path='/admin/addnewpizza' component={Addnewpizza}  exact/>
                <Route path='/admin/editpizza/:pizzaid' component={Editpizza}  exact/>
            </Switch>



        </div>
      </div>
    </div>
  );
}
