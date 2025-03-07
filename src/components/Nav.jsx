import { NavLink } from "react-router";
import { FaTachometerAlt , FaMapMarkedAlt, FaUser } from "react-icons/fa";
import "../assets/styles/css/Navbar.css";
import { BsHouse, BsHouseFill } from "react-icons/bs";

export default function Nav() {
  return (
    <nav className="navbar">
      <NavItem to="/history" icon={<FaTachometerAlt  />} label="History" />
      <NavItem to="/" icon={<BsHouseFill />} label="Dashboard" />
      <NavItem to="/account" icon={<FaUser />} label="Account" />
    </nav>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink to={to} className="nav-item">
      {icon}
      <span className="nav-label">{label}</span>
    </NavLink>
  );
}
