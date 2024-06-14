import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="navbar bg-base-100 bg-primary">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-primary-content">
          Llama Herder
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="text-white text-xl font-bold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/About" className="text-white text-xl font-bold">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
