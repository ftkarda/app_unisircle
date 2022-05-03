import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  createProduct,
  fetchItems,
  updateProductById,
} from "../store/actions/itemFunctions";
import Swal from "sweetalert2";

export default function ProductForm({ changeView, children, data }) {
  const [productInput, setProductInput] = useState({
    name: "",
    description: "",
    CompanyId: "",
    // price: "",
    category: "",
    imgUrl: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.companyReducer);

  useEffect(() => {
    if (data)
      setProductInput({
        name: data.name,
        description: data.description,
        category: data.category,
        CompanyId: data.CompanyId,
        // price: data.price,
        imgUrl: data.imgUrl,
      });
  }, [data]);

  function productInputHandler(e) {
    const { value, name } = e.target;
    const newInput = {
      ...productInput,
    };
    newInput[name] = value;
    setProductInput(newInput);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (id) {
      dispatch(updateProductById(id, productInput))
        .then((response) => {
          if (!response.ok) {
            return response.json();
          }
          Swal.fire("Item is updated.", "", "success");
          navigate("/");
        })
        .then((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.message}!`,
          });
        });
    } else {
      dispatch(createProduct(productInput))
        .then((response) => {
          if (!response.ok) {
            return response.json();
          }
          dispatch(fetchItems());
          Swal.fire("Item is created.", "", "success");
          changeView();
        })
        .then((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.message}!`,
          });
        });
    }
  }

  function goBackToMainPage() {
    if (changeView) {
      changeView();
    } else {
      navigate("/");
    }
  }

  return (
    <section className="flex flex-col w-full p-4 px-12 pt-10 md:pt-10 md:px-10 ml-52 mb-10">
      <div className="justify-between flex mb-6 mr-12 ml-8 items-end">
        <h1 className="text-3xl font-semibold">{children}</h1>
        <button
          onClick={goBackToMainPage}
          className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded text-xs w-fit h-fit"
          type="button"
        >
          Back To Home
        </button>
      </div>
      <form
        className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
        onSubmit={submitHandler}
      >
        <div className="space-y-4">
          <div className="mr-4">
            <label
              htmlFor="name"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Item name
            </label>
            <input
              type="text"
              name="name"
              value={productInput.name}
              onChange={productInputHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter Item name"
            />
          </div>
          <div className="mr-4">
            <label
              htmlFor="name"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              category
            </label>
            <input
              type="text"
              name="category"
              value={productInput.category}
              onChange={productInputHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter Item name"
            />
          </div>
          <div className="mr-4">
            <label
              htmlFor="description"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              type="text"
              name="description"
              value={productInput.description}
              onChange={productInputHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter Item description"
            />
          </div>
          <div className="mr-4">
            <label
              htmlFor="CategoryId"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Company
            </label>
            <select
              name="CompanyId"
              value={productInput.CompanyId}
              onChange={productInputHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled value="">
                --select one--
              </option>
              {companies.map((el) => {
                return (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <div className="mr-4">
            <label
              htmlFor="price"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Price
            </label>
            <input
              type="text"
              name="price"
              value={productInput.price}
              onChange={productInputHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter item price"
            />
          </div> */}
          <div className="mr-4">
            <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300">
              Image Url
            </label>
            <input
              type="text"
              name="imgUrl"
              value={productInput.imgUrl}
              onChange={productInputHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter image url"
            />
          </div>
        </div>
        <div className="w-full flex justify-center pt-2">
          <button
            type="submit"
            className="w-full max-w-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {children}
          </button>
        </div>
      </form>
    </section>
  );
}
