import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <div className="shadow-lg bg-white border w-70 h-fit mb-4">
      <img
        className="rounded-lg w-60 h-40"
        src={props?.image ? props.image : ""}
        alt="card image"
      />
      <div className="text-secondary p-3">
        <span className="text-sm font-bold uppercase text-orange-500">
          {props.category}
        </span>
        <p className="mt-2 font-semibold text-xl uppercase">{`${props.name.substring(0,15)}`}</p>
        <p className="mt-2 font-normal text-sm">{`${props.description.substring(0,20)} ...`}</p>
        <p className="mt-2 font-semibold text-md">Rp {props.price}</p>
      </div>
      <div className="flex items-center justify-center">
        {props?.onDeleteItem && (
          <button
            className="rounded-md bg-[#e4e6eb] p-2 text-black w-full mx-2 font-semibold "
            onClick={props?.onDeleteItem}
          >
            Hapus
          </button>
        )}

        {props?.onEditItem && (
          <button
            className="rounded-md bg-[#e4e6eb] p-2 text-black w-full mx-2 font-semibold"
            onClick={props?.onEditItem}
          >
            Ubah
          </button>
        )}
      </div>

      {/* react router dom use params */}
      <Link to={`/marketplace/products/${props.id}`}>
        <div className="p-2">
          <p className="w-full justify-center text-center rounded-md bg-[#e4e6eb] py-2 text-sm font-semibold text-black">
            Lihat Detail
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
