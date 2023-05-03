import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <div>
      <div className="shadow-card rounded-xl bg-gray-200 border border-sky-500 p-4">
        <div>
          <a href="#" blur-shadow-image="true">
            <img
              className="rounded-lg w-auto"
              src="https://demos.creative-tim.com/material-kit-pro/assets/img/annie-spratt.jpg"
              alt="card image"
            />
          </a>
        </div>
        <div className="text-secondary mt-2">
          <span className="text-sm font-bold uppercase text-orange-500">
            {props.category}
          </span>
          <a href="#">
            <h5 className="mt-2 font-medium">{props.name}</h5>
          </a>
          <p className="mb-3">
            {props.description}            
          </p>
          <p>
            Price : Rp {props.price}
          </p>
        </div>
        <div>
            Seller : {props.sellerId}
        </div>
      <button className="rounded bg-rose-700 p-2 text-white" onClick={props.onDeleteItem}>
        Delete
      </button>
      <button className="rounded bg-green-700 p-2 text-white" onClick={props.onEditItem}>
        Edit
      </button>
      </div>
    </div>
  );
};

export default ProductCard;
