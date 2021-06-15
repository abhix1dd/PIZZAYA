import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";

export default function Checkout(subTotal) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;

  const dispatch = useDispatch();
  function tokenHander(token) {
    console.log(token);
    console.log(subTotal);

    console.log("Ayush", subTotal.subTotal);
    dispatch(placeOrder(token, subTotal));
  }
  return (
    <div>
      {loading && (<Loading />)}
      {error && (<Error error="Something wenty Wrrong" />)}
      {success && (<Success success="Order Placed Successfully" />)}
      <StripeCheckout
        amount={subTotal.subTotal * 100}
        shippingAddress
        token={tokenHander}
        stripeKey="pk_test_51IzKhCSGhhaLWdoRtu1PmMQcGOksRIPYnk7ef5aG3rPoZDxcCCEGLcpHLzpP7yO6gwZ9cj8iVMyzFPj3xZ99BtGl00pPZWH7IT"
        currency="INR"
      >
        <button className="btn">Pay Now</button>
      </StripeCheckout>
    </div>
  );
}
