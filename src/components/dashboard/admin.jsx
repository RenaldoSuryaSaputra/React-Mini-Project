import React, { useState, useEffect } from "react";
import AddProduct from "../form/add-product";
import { getDocs, collection, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth, storage } from "../../config/firebase";
import ProductCard from "../product/card";
import EditProduct from "../form/edit-product";


const AdminDashboard = () => {
  const [productList, setProductList] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editId, setEditId] = useState("")

  const productCollectionRef = collection(db, "products");

  const getProductList = async () => {
    try {
      const data = await getDocs(productCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductList(filteredData)
    } catch (err) {
      console.error(err);
    }
  }

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProductList()
  };


  useEffect(() => {
    getProductList()
  }, [])

  return (
    <>
      <div className="bg-slate-200 p-7">
        <p>
        Dasboard Admin
        </p>
        <p>
        {auth?.currentUser?.uid}
        </p>
      </div>
      <div className="container mx-auto">
        <div className="p-4 flex justify-between">
          <p
            className="font-poppins font-[700] text-4xl leading-[54px]"
            data-cy="activity-title"
          >
            List Products
          </p>
          <button
            className="bg-green-400 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Tambah
          </button>
        </div>
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/* <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">Tambah Produk</h3>
                  </div> */}

                  <div className="relative p-12 flex-auto">
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
                  {/* <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">Tambah Produk</h3>
                  </div> */}

                  <div className="relative p-12 flex-auto">
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
      <div>
        {productList?.map((product, index) => (
          <div className="grid grid-cols-2 gap-2">
            <ProductCard 
              key={index}
              name={product.name}
              category={product.category}
              description={product.description}
              price={product.price}
              sellerId={product.sellerId}
              onDeleteItem={() => {
                if (confirm("Ingin hapus data ?")) {
                  deleteProduct(product.id)
                } else {
                  return;
                }
              }}
              onEditItem={ () => {
                setShowModalEdit(true)
                setEditId(product.id)
              }}
            />
          </div>
        ))
        }
      </div>
    </>
  );
};

export default AdminDashboard;
