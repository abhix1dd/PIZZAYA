const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51IzKhCSGhhaLWdoRarO1f7yIhSKofIcikmF1Jq4NOUxoW03Glh3gBwtQJO2eHLZNdo0G00AOUtSzJyO9d2L8ekTE00RENzjaYE"
);

const Order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
  const { token, subTotal, currentUser, cartItems } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subTotal.subTotal * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const neworder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subTotal.subTotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      neworder.save();
      res.send("Order Placed Successfully");
    } else {
      res.send("Payment Failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something Went Wrong" + error });
  }
});

router.post("/getuserorders", async (req, res) => {
  const  {userid}  = req.body;
  try {
    const orders = await Order.find({ userid:userid }).sort({_id:-1})
    res.send(orders);
    
  } catch (error) {
    return res.status(400).json({ message: "Something Went Wrong" + error });
  }
});

router.get("/getallorders",async(req,res)=>{
  try {
    const orders=await Order.find({})
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
})

router.post("/deliverorder",async(req,res)=>{
  const {orderid}=req.body
  try {
    const order=await Order.findOne({_id:orderid})
    order.isDelivered=true
    await order.save()
    res.send('Order Delivered Successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
})


module.exports = router;
