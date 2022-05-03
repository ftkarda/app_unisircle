import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MainPage() {
  const activeClassName =
    "block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600";
  const unactiveClassName =
    "block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-white";

  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    Swal.fire("Logout success.", "", "success");
    navigate("/login");
  };
  return (
    <div className="flex">
      <nav aria-label="alternative nav" className="fixed md:fixed">
        <div className="bg-gray-800 shadow-xl h-20 bottom-0 md:relative md:h-screen z-10 w-full md:w-48 content-center pt-4">
          <span
            to="/"
            className="self-center text-4xl font-bold whitespace-nowrap text-white cursor-pointer tracking-widest p-4"
          >
            Apps
          </span>
          <div className="md:w-48 md:left-0 md:top-0 content-center md:content-start text-left justify-between pt-4">
            <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
              <li className="mr-3 flex-1">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? activeClassName : unactiveClassName)}
                >
                  <i className="fas fa-home pr-0 md:pr-3"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                    Dashboard
                  </span>
                </NavLink>
              </li>
              <li className="mr-3 flex-1">
                <NavLink
                  to="categories"
                  className={({ isActive }) => (isActive ? activeClassName : unactiveClassName)}
                >
                  <i className="fa fa-tags pr-0 md:pr-3"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                    Categories
                  </span>
                </NavLink>
              </li>
              <li className="mr-3 flex-1">
                <NavLink
                  to="register"
                  className={({ isActive }) => (isActive ? activeClassName : unactiveClassName)}
                >
                  <i className="fas fa-user-plus pr-0 md:pr-3 "></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                    Register Admin
                  </span>
                </NavLink>
              </li>
              <li className="mr-3 flex-1">
                <a
                  href="#"
                  onClick={logoutHandler}
                  className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-white"
                >
                  <i className="fa fa-sign-out pr-0 md:pr-3"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                    Sign Out
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
