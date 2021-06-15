import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Loading from "../components/Loading";

import Error from "../components/Error";

import background from "../images/img1.jpg";

export default function Loginscreen() {
  const loginState=useSelector(state=>state.loginUserReducer)
  const { loading,error } = loginState;
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  function Login(e) {
    e.preventDefault()
    const user = { email: email, password: password };
    console.log(user);
    dispatch(loginUser(user));
  }
  useEffect(() => {
    
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  });
  
  return (
    <div >
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded ">
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            <strong>LOGIN</strong>
          </h2>
          {error && (<Error error="Invalid Credentials" />)}
          
          {loading && <Loading />}
         
          <input
            required
            type="Email"
            placeholder="Email..."
            className="form-control"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Password..."
            className="form-control"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />

          <button onClick={Login} className="btn mt-3 mb-3">
            Login
          </button>
          <br></br>
          <a
            href="/register"
            style={{ color: "black", textDecorationLine: "none" }}
            className="mt-2"
          >
            <strong>Click Here To Register</strong>
          </a>
        </div>
      </div>
    </div>
  );
}
