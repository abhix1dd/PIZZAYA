import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Loading from '../components/Loading'
import Success from '../components/Success'
import Error from '../components/Error'



export default function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const registerState=useSelector(state=>state.registerUserReducer)
  const {loading,success,error}=registerState

  const dispatch = useDispatch();

  function register(e) {
    e.preventDefault()
        if (password !== cpassword) {
      alert("password not match");
    } else {
      const user = { name, email, password };
      console.log(user);
      dispatch(registerUser(user));
    }
  }

  return (
    <div>
       
      <div className="row justify-content-center mt-5">
     
        <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded ">
          {loading &&(<Loading/>)}
          {success &&(<Success success='User Registraion Successfully'/>)}
          {error && (<Error error='Email Already Registered'/>)}
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            <strong>REGISTER</strong>
          </h2>
          <div>
            <input
              required
              type="text"
              placeholder="Name..."
              className="form-control"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
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
            <input
              required
              type="text"
              placeholder="Confrim Password..."
              className="form-control"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
            <button onClick={register} className="btn mt-3 mb-3">
              Reister
            </button>
            <br></br>
            <a href='/login' style={{color:'black',textDecorationLine:'none '}}><strong>Click Here To Login</strong></a>
          </div>
        </div>
      </div>
    </div>
  );
}
