import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUsers, getAllUsers } from "../actions/userActions";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";

export default function Userslist() {
  const dispatch=useDispatch()
  const usersstate=useSelector(state=>state.getAllUsersReducer)
  const {error,loading,users}=usersstate

  useEffect(()=>{
    dispatch(getAllUsers())
  },[])
  
  return (   
    <div className="table-responsive-md">
      <h1>Users List</h1>
      {loading && <Loading />}
      {error && <Error error="Something Went Wrong" />}
      <table className="table table-striped table-bordered ">
        <thead className="table-dark">
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user)=>{
            return(
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><i className="fa fa-trash " onClick={()=>dispatch(deleteUsers(user._id))}></i></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
