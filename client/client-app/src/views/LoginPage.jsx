import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginHandler } from "../store/actions/userFunctions";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    const newInput = {
      ...userInput,
    };
    newInput[name] = value;
    setUserInput(newInput);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginHandler(userInput))
      .then((response) => {
        if (!response.ok) {
          throw {
            name: response.statusText,
            message: "Invalid email/password",
          };
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire("Login success.", "", "success");
        localStorage.setItem("access_token", data.accessToken);
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.message}!`,
        });
      });
  };
  return (
    <div id="signin-page" className="text-gray-700 antialiased">
      <section className="relative w-full h-full py-10 min-h-screen bg-gray-800">
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="flex justify-center mb-8 mt-3">
                    <img
                      src="https://png.pngtree.com/png-vector/20210313/ourlarge/pngtree-letter-x-logo-png-png-image_3045052.jpg"
                      className="w-1/3"
                    />
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-gray-500 text-center mb-3 font-bold">
                    <small>Sign in to your account</small>
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={inputHandler}
                        value={userInput.email}
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={inputHandler}
                        value={userInput.password}
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                      />
                    </div>
                    <div className="text-center mt-12">
                      <button
                        className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Login
                      </button>
                      <Link
                        to="/register"
                        className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Register
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
