import { FaBell, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function TopBar({ accountPath }) {
    return (
        <div className="top-bar">
            <NavItem to={accountPath} icon={<FaUser />} />
            <h1>E-Park</h1>
            <button className="notif-btn nav-item">
              <FaBell />
            </button>
        </div>
    )
}

function NavItem({ to, icon }) {
    return (
      <NavLink to={to} className="nav-item">
        {icon}
      </NavLink>
    );
}

export default TopBar