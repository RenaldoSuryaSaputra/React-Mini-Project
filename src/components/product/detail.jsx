import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

const DetailProduct = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);

  const getDetailProduct = async () => {
    onSnapshot(doc(db, "products", id), (doc) => {
      setProductDetail(doc.data());
    });
  };

  useEffect(() => {
    getDetailProduct();
  }, []);
  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-center text-2xl font-bold mb-4">Detail Product</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img src={productDetail.image} className="w-full h-96" />
          </div>
          <div>
            <div className="mt-6">
              <h1 className="text-2xl font-bold">{productDetail.name}</h1>
              <p className="mt-4 text-lg font-bold">
                Rp. {productDetail.price}
              </p>
              <p className="mt-2 text-gray-600">{productDetail.description}</p>
            </div>
            <div className="mt-6 border-t-2">

              <p className="text-lg font-bold ">Seller Information</p>
              <p className="text-lg">{productDetail.sellerName}</p>
              <p className="text-sm italic">
                for more information and transaction about this product please contact the
                seller via the button below
              </p>
              <button
                className="mt-2  bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() =>
                  window.open(
                    `https://wa.me/${productDetail.sellerPhone}`,
                    "_blank"
                  )
                }
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
