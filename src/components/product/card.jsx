import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <div className="shadow-lg bg-white border w-60">
      <img
        className="rounded-lg w-60 h-40"
        src={props?.image ? props.image : ""}
        alt="card image"
      />
      <div className="text-secondary p-3">
        <span className="text-sm font-bold uppercase text-orange-500">
          {props.category}
        </span>
        <h5 className="mt-2 font-semibold text-xl uppercase">{props.name}</h5>
        <h5 className="mt-2 font-normal text-md">Rp {props.price}</h5>
      </div>
      <div className="flex items-center justify-center">
        {props?.onDeleteItem && (
          <button
            className="rounded-md bg-[#e4e6eb] p-2 text-black w-full mx-2 font-semibold "
            onClick={props?.onDeleteItem}
          >
            Delete
          </button>
        )}

        {props?.onEditItem && (
          <button
            className="rounded-md bg-[#e4e6eb] p-2 text-black w-full mx-2 font-semibold"
            onClick={props?.onEditItem}
          >
            Edit
          </button>
        )}
      </div>
      <Link to={`/marketplace/products/${props.id}`}>
        <div className="p-2">
          <p className="w-full justify-center text-center rounded-md bg-[#e4e6eb] py-2 text-sm font-semibold text-black">
            View Detail
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
