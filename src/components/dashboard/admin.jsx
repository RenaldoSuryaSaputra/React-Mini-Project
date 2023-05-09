import React, { useState, useEffect } from "react";
// component
import AddProduct from "../form/add-product";
import ProductCard from "../product/card";
import EditProduct from "../form/edit-product";

// Firebase
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

// router dom
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [productList, setProductList] = useState(filteredList);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [userDetail, setUserDetail] = useState([]);

  const navigate = useNavigate();

  const getSellerDetail = () => {
    onSnapshot(doc(db, "users", `${auth?.currentUser?.uid}`), (doc) => {
      setUserDetail(doc.data());
    });
  };

  const getProductList = () => {
    const productCollectionRef = collection(db, "products");
    const produtQuery = query(
      productCollectionRef,
      where("sellerId", "==", `${auth?.currentUser?.uid}`)
    );
    onSnapshot(
      produtQuery,
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

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Logout Sukses");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  useEffect(() => {
    getProductList();
    getSellerDetail();
  }, []);

  return (
    <>
      <nav className="fixed border-r-4 bg-slate-100 h-screen w-60 p-6 ">
        <a href="/" className="flex items-center pl-2.5 mb-5">
          <img src="" className="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black">
            Seller Area
          </span>
        </a>
        <div className="relative h-full mt-6">
          <ul>
            <li>
              <div className="mb-3">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                  <input
                    type="search"
                    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border-2 border-solid border-black px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)]"
                    placeholder="Search"
                    onChange={(e) => setFilteredList(e.target.value)}
                  />
                </div>
              </div>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 hover:text-white my-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mx-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <span className="text-lg font-semibold">Home</span>
              </Link>
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 hover:text-white  mt-5"
            onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mx-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>

                <span className="text-lg font-semibold">Logout</span>
            </li>
          </ul>
        </div>
      </nav>
      <div className="relative w-[calc(100%-240px)] bg-gradient-to-t from-gray-200 to-gray-100 left-60 p-6 drop-shadow-lg mb-2">
        <p className="text-3xl font-bold">Welcome, {userDetail?.seller}</p>
        <p className="text-xl font-md mt-2">You can manage your product here</p>
      </div>

      <main className="left-60 w-[calc(100%-240px)] relative h-screen bg-white p-3">
        <div className="">
          <button
            className="bg-blue-500 rounded p-2 text-white font-semibold hover:bg-blue-300 mb-4"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add Product
          </button>
        </div>
        <div className="bg-black">
          {productList
          .filter(
            (product) =>
              product.name.toLowerCase().includes(filteredList) ||
              product.category.toLowerCase().includes(filteredList)
          )
          ?.map((product, index) => (
            <div className="float-left d-inline-block me-4 mb-4">
              <ProductCard
                key={index}
                id={product.id}
                name={product.name}
                category={product.category}
                description={product.description}
                price={product.price}
                sellerId={product.sellerId}
                image={product.image}
                onDeleteItem={() => {
                  if (confirm("Ingin hapus data ?")) {
                    deleteProduct(product.id);
                  } else {
                    return;
                  }
                }}
                onEditItem={() => {
                  setShowModalEdit(true);
                  setEditId(product.id);
                }}
              />
            </div>
          ))}
        </div>
      </main>

      <div className="">
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto mx-auto max-w-3xl">
                <div className="shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font-semibold">Add Product</h3>
                  </div>

                  <div className="px-10 pt-6">
                    <AddProduct
                      closeModal={() => {
                        setShowModal(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {showModalEdit ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font-semibold">Edit Product</h3>
                  </div>

                  <div className="relative px-10 pt-6">
                    <EditProduct
                      id={editId}
                      closeModal={() => {
                        setShowModalEdit(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default AdminDashboard;
