import React , {useState}from "react";
import { useForm } from "react-hook-form";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ModalNotif } from "../modal";

const EditProduct = (props) => {
  const [modalNotif, setModalNotif] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // set file upload name
    const fileName = new Date().getTime() + data.image[0].name;
    
    // firebase collection init
    const productDoc = doc(db, "products", props.id);
    const imageProductRef = ref(storage, `products/${fileName}`);

    // Metode upload gambar pada firebase
    try {
      const uploadTask = uploadBytesResumable(imageProductRef, data.image[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          alert("Error Upload File");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // menambahkan data pada firestore 
            await updateDoc(productDoc, {
              name: data.name,
              category: data.category,
              description: data.description,
              price: data.price,
              image: downloadURL,
            });
            reset()
            setModalNotif(true)
          });
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="w-full max-w-xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Nama Produk
            </label>
            <input
              {...register("name", {
                required: "Input ini wajib diisi",
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/,
                  message: "This input is cannot contain symbols.",
                },
              })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 borderrounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Supra"
            />
            {errors.name && (
              <p className="text-red-700"> {errors?.name?.message} </p>
            )}
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Kategori
            </label>
            <div className="relative">
              <select
                {...register("category", {
                  required: "Input ini wajib diisi",
                })}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Pilih Kategori</option>
                <option value="elektronik">Elektronik</option>
                <option value="pakaian">Pakaian</option>
                <option value="mainan">Mainan</option>
                <option value="peralatan">Peralatan</option>
                <option value="perabotan">Perabotan</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
            {errors.category && (
              <p className="text-red-700"> {errors?.category?.message} </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Deskripsi Produk
            </label>
            <textarea
              {...register("description", {
                required: "Input ini wajib diisi",
              })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              rows="5"
            />
            {errors.description && (
              <p className="text-red-700"> {errors?.description?.message} </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Harga
            </label>
            <input
              {...register("price", {
                required: "Input ini wajib diisi",
                pattern: {
                  value: /^\d+\.\d{3}/,
                  message: "Product price input format must not contain any letters"
                },
              })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="2.000.000"
            />
            {errors.price && (
              <p className="text-red-700"> {errors?.price?.message} </p>
            )}
          </div>

          <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Gambar
            </label>
            <input
              {...register("image", {
                required: "Nohon pilih gambar untuk diupload",
              })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="file"
            />
            {errors.image && (
              <p className="text-red-700"> {errors?.image?.message} </p>
            )}
          </div>
        </div>
        <div className="flex mb-6 justify-end">
          <button
            className="py-4 px-5 font-semibold bg-white text-red-600 rounded-md uppercase me-3"
            onClick={props.closeModal}
          >
            Tutup
          </button>
          <button className="py-4 px-5 font-bold bg-blue-500 text-white rounded-md uppercase">
            perbarui
          </button>
        </div>
      </form>
      <div>
        {modalNotif ? (
          <ModalNotif
            message= "Berhasil memperbarui data"
            onClose={() => {
              setModalNotif(false);
            }}
          />
        ) : null}
      </div>
    </>
  );
};

export default EditProduct;
