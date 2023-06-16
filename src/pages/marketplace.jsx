import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ProductCard from "../components/product/card";
import ButtonCategory from "../components/ButtonCategory";
import { ListItem } from "@material-tailwind/react";

const Marketplace = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [productList, setProductList] = useState(filteredList);


  // Fungsi get product realtime
  const getProducts = () => {
    onSnapshot(
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
  };

  // Fungsi untuk pagination
  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="p-4 border-b-2 ">
        <input
          type="search"
          className="xl:w-1/2 md:w-2/3 sm:w-full block m-auto rounded-2xl border border-solid border-black px-3 py-2 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)]"
          placeholder="Pencarian"
          onChange={(e) => setFilteredList(e.target.value)}
        />
        <div className="text-center mt-4">
          <ButtonCategory
            label="Semua"
            onClick={() => {
              setFilteredList("");
            }}
          />
          <ButtonCategory
            label="Elektronik"
            onClick={() => {
              setFilteredList("elektronik");
            }}
          />
          <ButtonCategory
            label="Pakaian"
            onClick={() => {
              setFilteredList("pakaian");
            }}
          />
          <ButtonCategory
            label="Mainan"
            onClick={() => {
              setFilteredList("mainan");
            }}
          />
          <ButtonCategory
            label="Peralatan"
            onClick={() => {
              setFilteredList("peralatan");
            }}
          />
          <ButtonCategory
            label="Perabotan"
            onClick={() => {
              setFilteredList("perabotan");
            }}
          />
          <ButtonCategory
            label="Lainnya"
            onClick={() => {
              setFilteredList("lainnya");
            }}
          />
        </div>
      </div>

      <main>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2 mx-4">
          {productList
            .filter(
              (product) =>
                product.name.toLowerCase().includes(filteredList) ||
                product.category.toLowerCase().includes(filteredList)
            )
            ?.map((product) => (
              <div className="">
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
