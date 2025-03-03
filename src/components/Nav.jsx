import { NavLink } from "react-router";
import { FaTachometerAlt , FaMapMarkedAlt, FaUser } from "react-icons/fa";
import "../assets/styles/css/Navbar.css";

export default function Nav() {
  return (
    <nav className="navbar">
      <NavItem to="/" icon={<FaTachometerAlt  />} label="Parking" />
      <NavItem to="/map" icon={<FaMapMarkedAlt />} label="Map" />
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
