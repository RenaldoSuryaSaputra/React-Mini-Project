<form
  className="shadow-md w-full max-w-lg m-5"
  onSubmit={handleSubmit(onSubmit)}
>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="mb-4 w-96">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 pt-5"
        htmlFor="name"
      >
        Product Name
      </label>
      <input
        {...register("name", {
          required: "This input is required.",
          pattern: {
            value: /^[a-zA-Z0-9 ]*$/,
            message: "This input is cannot contain symbols.",
          },
        })}
        className=""
        type="text"
        placeholder="Handpone"
      />
      {errors.name && <p className="text-red-700"> {errors?.name?.message} </p>}
    </div>
  </div>

  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="name"
    >
      Product Category
    </label>

    <select
      {...register("category", {
        required: "This input is required.",
      })}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
    >
      <option value="">Choose a category</option>
      <option value="kendaraan">Kendaraan</option>
      <option value="elektronik">Elektronik</option>
      <option value="mainan">Mainan</option>
      <option value="pakaian">Pakaian</option>
      <option value="perabotan">Perabotan</option>
      <option value="perkakas">Perkakas</option>
      <option value="lainnya">Lainnya</option>
    </select>
    {errors.category && (
      <p className="text-red-700"> {errors?.category?.message} </p>
    )}
  </div>

  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="name"
    >
      Product Description
    </label>
    <textarea
      {...register("description", {
        required: "This input is required.",
      })}
      id="description"
      rows="4"
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
      placeholder="Isikan detail produk disini ..."
    ></textarea>
    {errors.description && (
      <p className="text-red-700"> {errors?.description?.message} </p>
    )}
  </div>

  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="name"
    >
      Product Price
    </label>
    <input
      {...register("price", {
        required: "This input is required.",
        pattern: {
          value: /^[1-9]+\d*(?:\.\d+)?$/,
          message: "Product price cannot start with 0",
        },
      })}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
      type="number"
      placeholder="2000"
    />
    {errors.price && <p className="text-red-700"> {errors?.price?.message} </p>}
  </div>

  <div className="mb-4">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Upload file
    </label>
    <input
      {...register("image", {
        required: "Please select an image to upload",
      })}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
      aria-describedby="file_input_help"
      id="file_input"
      type="file"
    />
    {errors.image && <p className="text-red-700"> {errors?.image?.message} </p>}
  </div>

  <div>
    <button
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Submit
    </button>
    <button
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={props.closeModal}
    >
      Close
    </button>
  </div>
</form>;
