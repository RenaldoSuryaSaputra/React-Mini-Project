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
      <div className="bg-gray-200 flex flex-wrap justify-between place-items-start">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Marketplace
        </h1>
        <input
          type="search"
          className="w-1/ block rounded border border-solid border-black px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)]"
          placeholder="Search"
          onChange={(e) => setFilteredList(e.target.value)}
        />
        <h1>Sort</h1>
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
