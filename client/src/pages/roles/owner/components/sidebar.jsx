import { NavLink } from "react-router-dom";
import {
  FaPlusCircle,
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaWarehouse,
  FaUsers,
  FaUserTie,
  FaUserCog,
  FaChartLine,
  FaCogs
} from "react-icons/fa";
import styles from "./../ownerStyles/sidebar.module.scss"; // create this SCSS module
import userRoleFilter from "../../../../hooks/userRoleFilter";

function SidebarOwner() {
  const handleRoleClick = userRoleFilter();

  return (
    <div className={`sidebar bg-dark text-white p-3 ${styles.sidebar}`}>
      <h4 className={`text-white mb-4 ${styles.title}`}>Owner Panel</h4>
      <ul className={`list-unstyled ${styles.menu}`}>

        <li>
          <NavLink to="/owner/create-farm" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaPlusCircle className="me-2" />
            Create New Farm
          </NavLink>
        </li>

        <li>
          <NavLink to="/owner/dashboard" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaTachometerAlt className="me-2" />
            Dashboard Overview
          </NavLink>
        </li>

        <li>
          <NavLink to="/owner/fields" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaMapMarkedAlt className="me-2" />
            Field Locations
          </NavLink>
        </li>

        <li>
          <NavLink to="/owner/inventory" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaWarehouse className="me-2" />
            Inventory Records
          </NavLink>
        </li>

        <li>
          <NavLink to="/owner/farmers" className={`${styles.link} d-flex align-items-center mb-3`} onClick={() => handleRoleClick('farmer')}>
            <FaUserCog className="me-2" />
            Manage Farmers
          </NavLink>
        </li>

        <li>
          <NavLink to="/owner/managers" className={`${styles.link} d-flex align-items-center mb-3`} onClick={() => handleRoleClick('farm-manager')}>
            <FaUsers className="me-2" />
            Manage Managers
          </NavLink>
        </li>

        <li>
          <NavLink to="/owner/experts" className={`${styles.link} d-flex align-items-center mb-3`} onClick={() => handleRoleClick('agro-expert')}>
            <FaUserTie className="me-2" />
            Manage Experts
          </NavLink>
        </li>

        <li>
          <NavLink to="/owner/analytics" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaChartLine className="me-2" />
            View Analytics
          </NavLink>
        </li>

        <li>
          <NavLink to="/owner/settings" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaCogs className="me-2" />
            System Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SidebarOwner;
