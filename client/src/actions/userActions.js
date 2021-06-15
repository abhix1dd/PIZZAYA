import axios from "axios";
export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  try {
    const response = await axios.post("/api/users/register", user);
    console.log(response);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" }); 
  axios
  .post("/api/users/login",user)
  .then((res) => {      
    dispatch({ type: "USER_LOGIN_SUCCESS" });
    localStorage.setItem("currentUSer", JSON.stringify(res.data));
    window.location.href = "/";
  })
    .catch((err) => {
      dispatch({ type: "USER_LOGIN_FAILED", payload: err });
      console.log("error aayi h")
      console.log(err);
    });
    
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("currentUSer");
  localStorage.removeItem("cartItems");
  dispatch({type:'USER_LOGOUT'})
  window.location.href = "/login"; 
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });

  try {
    const response = await axios.get("/api/users/getallusers");
    console.log(response);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USERS_Failed", payload: error });
  }
};

export const deleteUsers=(userid)=>async(dispatch)=>{
  try {
    await axios.post('/api/users/deleteuser',{userid})
    alert('User Deleted SuccessFully')
    window.location.reload()
  } catch (error) {
    alert('Something Went Wrong')
    console.log(error);
  }
}
