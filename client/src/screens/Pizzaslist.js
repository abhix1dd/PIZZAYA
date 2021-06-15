import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import { getAllPizzas } from "../actions/pizzaActions";
import { Link } from 'react-router-dom';
import { deletePizza } from "../actions/pizzaActions";


export default function Pizzaslist() {
  const dispatch = useDispatch();

  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);

  const { pizzas, error, loading } = pizzasstate;
  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);

  return (
    <div className="table-responsive-sm">
      <h2>Pizzas List</h2>
      {loading && (<Loading />)}
      {error && (<Error error="Something Went Wrong" />)}

      <table className="table table-bordered table-responsive-sm">
        <thead className='table-dark'>
          <tr>
            <th>Name</th>
            <th>Prices</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {pizzas && pizzas.map(pizza=>{
          const id1=pizza._id
             return <tr>
                 <td>{pizza.name}</td>
                 <td>
                     Small : {pizza.prices[0]['small']}<br/>
                     Medium : {pizza.prices[0]['medium']}<br/>
                     Large : {pizza.prices[0]['large']}
                 </td>
                 <td>{pizza.category}</td>
                 <td>
                     <i className='fa fa-trash m-1' onClick={()=>{dispatch(deletePizza(pizza._id))}}></i>
                  
                   <Link to={`/admin/editpizza/${pizza._id}`} activeClassName="active"><i className='fa fa-edit m-1'></i></Link>
                 </td>
             </tr>
        })}
        </tbody>
      </table>
    </div>
  );
}
