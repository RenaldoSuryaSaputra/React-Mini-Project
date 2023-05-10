import React, { useState, useEffect } from "react";
// component
import AddProduct from "../form/add-product";
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
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const [productId, setProductId] = useState("");

  const navigate = useNavigate();

  // fungsi untuk mendapatkan data seller
  const getSellerDetail = () => {
    onSnapshot(doc(db, "users", `${auth?.currentUser?.uid}`), (doc) => {
      setUserDetail(doc.data());
    });
  };

  // Fungsi untuk get product realtime
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

  // fungsi untuk menghapus product berdasarkan id
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
  };

  // fungsi untuk handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
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
        <Link to="/" className="flex items-center pl-2.5 mb-5">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black">
            Dashboard Seller
          </span>
        </Link>
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
            <li
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 hover:text-white  mt-5"
              onClick={handleLogout}
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>

              <span className="text-lg font-semibold">Logout</span>
            </li>
          </ul>
        </div>
      </nav>
      <div className="relative w-[calc(100%-240px)] bg-gradient-to-t from-gray-200 to-gray-100 left-60 p-6 drop-shadow-lg mb-2">
        <p className="text-3xl font-bold">Welcome, {userDetail?.name}</p>
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
        <div>
          {productList
            .filter(
              (product) =>
                product.name.toLowerCase().includes(filteredList) ||
                product.category.toLowerCase().includes(filteredList)
            )
            ?.map((product) => (
              <div className="border mb-5 text-gray-800 text-center md:text-left">
                <div className="block h-fit rounded-lg shadow-lg bg-white border-2">
                  <div className="flex flex-wrap items-center">
                    <div className="block lg:flex w-full lg:w-6/12 xl:w-3/12">
                      <img
                        src={product.image}
                        alt="Product Image"
                        className="m-2 w-60 h-60 rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                      />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-8/12 ps-5">
                      <h2 className="text-2xl font-bold mb-2 text-black uppercase">
                        {product.name}
                      </h2>
                      <p className="font-bold mb-2 uppercase text-orange-500">
                        {product.category}
                      </p>
                      <p className="text-black mb-2 ">{`${product.description.substring(
                        0,
                        200
                      )} ...`}</p>
                      <p className="font-bold mb-2 text-black">
                        Rp. {product.price}
                      </p>

                      <div className="flex items-center justify-left">
                        <button
                          className="rounded-md bg-[#e4e6eb] p-2 text-black w-40 me-2 font-semibold"
                          onClick={() => {
                            setShowModalDelete(true);
                            setProductId(product.id);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="rounded-md bg-[#e4e6eb] p-2 text-black w-40 ms-2 font-semibold"
                          onClick={() => {
                            setShowModalEdit(true);
                            setProductId(product.id);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>

  {/* Modal Section */}
      <div>
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
                      id={productId}
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
        {showModalDelete ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={() => setShowModalDelete(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product?
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => setShowModalDelete(false)}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => {
                      deleteProduct(productId);
                      setShowModalDelete(false);
                    }}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
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
