import { NavLink } from "react-router";
import { FaTachometerAlt, FaMapMarkedAlt, FaUser, FaUserShield } from "react-icons/fa";
import "../assets/styles/css/Navbar.css";
import { useAuth } from "./contexts/useAuth";

export default function Nav() {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar">
      {currentUser.role === "User" ?
        <>
          <NavItem to="/" icon={<FaTachometerAlt />} label="Parking" />
          <NavItem to="/map" icon={<FaMapMarkedAlt />} label="Map" />
          <NavItem to="/account" icon={<FaUser />} label="Account" />
        </>
        :
        <>
          <NavItem to="/admin-dashboard" icon={<FaUserShield />} label="Dashboard Admin" />
          <NavItem to="/admin-settings" icon={<FaUser />} label="Account" />
        </>
      }
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
