import { NavLink } from "react-router";
import { FaTachometerAlt, FaUser, FaUserShield } from "react-icons/fa";
import "../assets/styles/css/Navbar.css";
import { BsHouseFill } from "react-icons/bs";
import { useAuth } from "./contexts/useAuth";

export default function Nav() {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar">
      {currentUser.role === "User" ?
        <>
          <NavItem to="/history" icon={<FaTachometerAlt />} label="History" />
          <NavItem to="/" icon={<BsHouseFill />} label="Dashboard" />
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
