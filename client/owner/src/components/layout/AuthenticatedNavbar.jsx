import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
// import ThemeSwitcher from "../common/ThemeSwitcher.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/slices/authSlice.js";

const AuthenticatedNavbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state?.auth?.role);

  const path = role === "admin" ? "/admin" : "/owner";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 z-50 shadow-md px-4">
      {/* Left Section */}
      <div className="navbar-start flex items-center gap-2">
        {/* Sidebar Toggle Button (mobile only) */}
        <button
          className="btn btn-ghost lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>

        {/* Logo + Brand Name */}
        <Link
          to={"/"}
          className="btn btn-ghost normal-case text-xl flex items-center gap-2 max-sm:p-0"
        >
          <img
            src="/logo.png"
            alt="BOOK'N'PLAY"
            className="h-10 w-10 mask mask-squircle hidden sm:block"
          />
          <span className="text-base md:text-lg lg:text-xl font-bold">
            BOOK'N'PLAY
          </span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="navbar-end flex items-center gap-2">
        
        <button
          className="btn btn-primary btn-outline sm:btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AuthenticatedNavbar;
