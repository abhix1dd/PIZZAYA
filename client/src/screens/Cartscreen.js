import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Cartscreen() {
  AOS.init();
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;
  let subTotal = cartItems.reduce((x, items) => x + items.price, 0);
  const dispatch = useDispatch();

  return (
    <div>
      <div data-aos="fade-down" className="row justify-content-center p-2">
        <div className="col-md-6">
          <h2 style={{ fontSize: "40px" }}>My Cart</h2>

          {cartItems.map((items) => {
            return (
              <div className="flex-container">
                <div className="text-start m-1 w-100">
                  <h1>
                    {items.name}[{items.varient}]
                  </h1>
                  <h1>
                    Price: {items.quantity}*{items.prices[0][items.varient]}=
                    {items.price}
                  </h1>
                  <h1 style={{ display: "inline" }}>Quantity : </h1>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(items, items.quantity + 1, items.varient)
                      );
                    }}
                  ></i>
                  <b>{items.quantity}</b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(items, items.quantity - 1, items.varient)
                      );
                    }}
                  ></i>
                  <hr />
                </div>
                <div className="m-1 w-100">
                  <img
                    src={items.image}
                    style={{ height: "80px", width: "80px" }}
                    alt=""
                  />
                </div>
                <div className="m-1 w-100 mt-4">
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(deleteFromCart(items));
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4 text-end">
          <h2 style={{ fontSize: "40px" }}>SubTotal : {subTotal} /-</h2>
          <Checkout subTotal={subTotal} />
        </div>
      </div>
    </div>
  );
}
