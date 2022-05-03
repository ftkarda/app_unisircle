import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../store/actions/userFunctions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    role: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { value, name } = e.target;

    const newInput = {
      ...userInput,
    };
    newInput[name] = value;
    setUserInput(newInput);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(userInput))
      .then((response) => {
        if (!response.ok) {
          return response.json();
        }
        Swal.fire("Admin is created.", "", "success");
        navigate("/");
      })
      .then((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}!`,
        });
      });
  };
  return (
    <section className="flex flex-col w-screen p-4 pt-10 md:pt-10 mb-10">
      <div className="flex mb-6 ml-8 items-start">
        <h1 className="text-3xl font-semibold">Register </h1>
      </div>
      <form
        onSubmit={submitHandler}
        className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
      >
        <div className="space-y-4">
          <div className="mr-4">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userInput.name}
              onChange={inputHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter Name"
            />
          </div>
          <div className="mr-4">
            <label
              htmlFor="username"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={userInput.username}
              onChange={inputHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter username"
            />
          </div>
          <div className="mr-4">
            <label
              htmlFor="email"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userInput.email}
              onChange={inputHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter email"
            />
          </div>
          <div className="mr-4">
            <label
              htmlFor="password"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              value={userInput.password}
              onChange={inputHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter password"
            />
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Select an option
          </label>
          <select
            name="role"
            value={userInput.role}
            onChange={inputHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a role</option>
            <option value="Waiters">Waiters</option>
            <option value="Cashiers">Cashiers</option>
          </select>
        </div>
        <div className="w-full flex justify-center pt-2 gap-10">
          <button
            type="submit"
            className="w-full max-w-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <Link
            to="/login"
            type="submit"
            className="w-full max-w-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Back
          </Link>
        </div>
      </form>
    </section>
  );
}
