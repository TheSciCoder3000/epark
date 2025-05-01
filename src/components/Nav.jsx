import { NavLink } from "react-router";
import { FaTachometerAlt, FaUser, FaUserShield, FaHistory, FaCar } from "react-icons/fa";
import "../assets/styles/css/Navbar.css";
import { BsHouseFill } from "react-icons/bs";
import { useAuth } from "./contexts/Auth/hooks";

export default function Nav() {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar">
      {currentUser.role === "User" ?
        <>
          <NavItem to="/history" icon={<FaTachometerAlt />} />
          <NavItem to="/" icon={<BsHouseFill />} />
        </>
        :
        <>
          <NavItem to="/admin-dashboard" icon={<FaUserShield />} />
          <NavItem to="/admin-parkinglots" icon={<FaCar />} />
          <NavItem to="/admin-history" icon={<FaHistory />} />
        </>
      }
    </nav>
  );
}

function NavItem({ to, icon }) {
  return (
    <NavLink to={to} className="nav-item">
      {icon}
    </NavLink>
  );
}
