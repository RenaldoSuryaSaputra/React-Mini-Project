import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ProductCard from "../components/product/card";

const Marketplace = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [productList, setProductList] = useState(filteredList);

  // LISTEN (REALTIME)
  const getProducts = onSnapshot(
    collection(db, "products"),
    (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setProductList(list);
    },
    (error) => {
      console.log(error);
    }
  );
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="p-4 border-b-2">
        <input
          type="search"
          className="xl:w-1/2 md:w-2/3 block m-auto rounded-2xl border border-solid border-black px-3 py-2 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)]"
          placeholder="Search"
          onChange={(e) => setFilteredList(e.target.value)}
        />
        <div className="text-center mt-4">
          <button
            className="bg-gray-300 hover:bg-black hover:text-white w-24 rounded-full mx-4 text-black py-1 px-2 text-md"
            onClick={() => {
              setFilteredList("");
            }}
          >
            All  
          </button>
          <button
            className="bg-gray-300 hover:bg-black hover:text-white w-24 rounded-full mx-4 text-black py-1 px-2 text-md"
            onClick={() => {
              setFilteredList("electronic");
            }}
          >
            Electronic
          </button>
          <button
            className="bg-gray-300 hover:bg-black hover:text-white w-24 rounded-full mx-4 text-black py-1 px-2 text-md"
            onClick={() => {
              setFilteredList("clothes");
            }}
          >
            Clothes
          </button>
          <button
            className="bg-gray-300 hover:bg-black hover:text-white w-24 rounded-full mx-4 text-black py-1 px-2 text-md"
            onClick={() => {
              setFilteredList("toy");
            }}
          >
            Toy
          </button>
          <button
            className="bg-gray-300 hover:bg-black hover:text-white w-24 rounded-full mx-4 text-black py-1 px-2 text-md"
            onClick={() => {
              setFilteredList("tools");
            }}
          >
            Tools
          </button>
          <button
            className="bg-gray-300 hover:bg-black hover:text-white w-24 rounded-full mx-4 text-black py-1 px-2 text-md"
            onClick={() => {
              setFilteredList("furniture");
            }}
          >
            Furniture
          </button>
          <button
            className="bg-gray-300 hover:bg-black hover:text-white w-24 rounded-full mx-4 text-black py-1 px-2 text-md"
            onClick={() => {
              setFilteredList("other");
            }}
          >
            Other
          </button>
        </div>
      </div>

      <main>
        <div className="py-6 sm:px-6 lg:px-8">
          {productList
            .filter(
              (product) =>
                product.name.toLowerCase().includes(filteredList) ||
                product.category.toLowerCase().includes(filteredList)
            )
            ?.map((product) => (
              <div className="float-left d-inline-block m-2">
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  description={product.description}
                  price={product.price}
                  sellerId={product.sellerId}
                  image={product.image}
                />
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Marketplace;
