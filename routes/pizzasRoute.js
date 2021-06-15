const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizzaModel");

router.get("/getallpizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addpizza", async (req, res) => {
  const { pizza } = req.body;

  try {
    const newpizza = new Pizza({
      name: pizza.name,
      image: pizza.image,
      varients: ["small", "medium", "large"],
      description: pizza.description,
      category: pizza.category,
      prices: [pizza.prices],
    });

    await newpizza.save();
    res.send("New Pizza Added Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getpizzabyid", async (req, res) => {
  const { pizzaid } = req.body;

  try {
    const pizza = await Pizza.findOne({ _id: pizzaid });
    res.send(pizza);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/editpizza", async (req, res) => {
  Pizza.findByIdAndUpdate(
    req.body.pizzaid,
    {
      name: req.body.editedpizza.name,
      prices: req.body.editedpizza.prices,
      category: req.body.editedpizza.category,
      description: req.body.editedpizza.description,
      image: req.body.editedpizza.image,
    },
    (err) => {
      if (err) {
        return res.status(400).json({ message: error });
      } else {
        res.send("Pizza Edited Successfully");
      }
    }
  );
});

router.post('/deletepizza',async(req,res)=>{
  const pizzaid=req.body.pizzaid
  try {
    await Pizza.findOneAndDelete({_id:pizzaid})
    res.send('Pizza Deleted Successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
})

module.exports = router;
