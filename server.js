const express = require("express");
const Pizza = require("./models/pizzaModel");

const db = require("./db");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const path=require('path')

const pizzasRoute = require("./routes/pizzasRoute");

const userRoute = require("./routes/userRoute");

const ordersRoute = require("./routes/OrdersRoute");

app.use("/api/pizzas/", pizzasRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}



app.listen(PORT, () => {
  console.log("Server iss port pe chal raha h...", PORT);
});
