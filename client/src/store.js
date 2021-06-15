import { combineReducers } from "redux";

import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import { getAllPizzasReducer, addPizzaReducer ,getPizzaByIdReducer,editPizzaReducer} from "./reducers/pizzaReducers";
import { getAllOrdersReducer } from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";
import { registerUserReducer, loginUserReducer,getAllUsersReducer } from "./reducers/userReducer";
import {
  placeOrderReducer,
  getUserOrdersReducer,
} from "./reducers/orderReducer";


const finalReducer = combineReducers({
  getAllPizzasReducer: getAllPizzasReducer,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
  addPizzaReducer: addPizzaReducer,
  getPizzaByIdReducer:getPizzaByIdReducer,
  editPizzaReducer:editPizzaReducer,
  getAllOrdersReducer:getAllOrdersReducer,
  getAllUsersReducer:getAllUsersReducer
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUSer")
  ? JSON.parse(localStorage.getItem("currentUSer"))
  : null;

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer: {
    currentUser: currentUser,
  },
};

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
