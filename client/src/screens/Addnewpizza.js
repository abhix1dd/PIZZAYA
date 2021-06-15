import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPizza } from "../actions/pizzaActions";
import Error from "../components/Error";
import Success from "../components/Success";
import Loading from "../components/Loading";

export default function Addnewpizza() {
  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const dispatch = useDispatch();

  const addpizzasstate = useSelector((state) => state.addPizzaReducer);
  const { success, error, loading } = addpizzasstate;

 const formHandler=(e)=> {
    e.preventDefault();
    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };
    console.log(pizza);
    dispatch(addPizza(pizza));
  }
  return (
    <div>
      <div className="text-start shadow-lg p-3 mb-5 bg-white rounded">
        <h1>Add Pizza</h1>
        {loading && <Loading />}
        {error && <Error error="Something Went Wrong" />}
        {success && <Success success="New Pizza Added Sucessfully" />}
        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />

          <input
            className="form-control"
            type="text"
            placeholder="small varient price"
            value={smallprice}
            onChange={(e) => {
              setsmallprice(e.target.value);
            }}
          />

          <input
            className="form-control"
            type="text"
            placeholder="medium varient price"
            value={mediumprice}
            onChange={(e) => {
              setmediumprice(e.target.value);
            }}
          />

          <input
            className="form-control"
            type="text"
            placeholder="large varient price"
            value={largeprice}
            onChange={(e) => {
              setlargeprice(e.target.value);
            }}
          />

          <input
            className="form-control"
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          />

          <input
            className="form-control"
            type="text"
            placeholder="image Url"
            value={image}
            onChange={(e) => {
              setimage(e.target.value);
            }}
          />

          <input
            className="form-control"
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <button className="btn mt-3" type="submit">
            Add Pizza
          </button>
        </form>
      </div>
    </div>
  );
}
