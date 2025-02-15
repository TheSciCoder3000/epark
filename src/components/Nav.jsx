import { Link } from "react-router-dom";
import { FaCar, FaMapMarkedAlt, FaUser } from "react-icons/fa";
import "./styles.css"; 

export default function Nav() {
  return (
    <nav className="navbar">
      <NavItem to="/" icon={<FaCar />} label="Parking" />
      <NavItem to="/map" icon={<FaMapMarkedAlt />} label="Map" />
      <NavItem to="/account" icon={<FaUser />} label="Account" />
    </nav>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <Link to={to} className="nav-item">
      {icon}
      <span className="nav-label">{label}</span>
    </Link>
  );
}
