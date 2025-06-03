import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaWarehouse,
  FaUsers,
  FaMoneyBill,
  FaChartPie,
  FaUserCog,
  FaUserTie
} from "react-icons/fa";
import styles from "./../managerStyles/sidebar.module.scss";
import userRoleFilter from "../../../../hooks/userRoleFilter";
//// add the bg-dark before the text-white p-3  the sidenar


function SidebarManager() {
  const handleRoleClick = userRoleFilter();
  return (
    <div className={`sidebar text-white p-3 ${styles.sidebar}`}>
      <h4 className={`text-white mb-4 ${styles.title}`}>Manager Panel</h4>
      <ul className={`list-unstyled ${styles.menu}`}>
        <li>
          <NavLink to="/manager/dashboard" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaTachometerAlt className="me-2" />
            Dashboard Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/manager/fields" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaMapMarkedAlt className="me-2" />
            Field Locations
          </NavLink>
        </li>
        <li>
          <NavLink to="/manager/inventory" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaWarehouse className="me-2" />
            Inventory Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/manager/labor" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaUsers className="me-2" />
            Labor Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/manager/finance" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaMoneyBill className="me-2" />
            Financial Records
          </NavLink>
        </li>
        <li>
          <NavLink to="/manager/reports" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaChartPie className="me-2" />
            Reporting & Analytics
          </NavLink>
        </li>
           <li>
          <NavLink to="/manager/farmers" className={`${styles.link} d-flex align-items-center mb-3`}
          onClick={()=>{handleRoleClick('farmer')}}
          >
            <FaUserCog className="me-2" />
            Meet Farmers 
          </NavLink>
        </li>
           <li>
          <NavLink to="/manager/experts" className={`${styles.link} d-flex align-items-center mb-3`}
            onClick={()=>{handleRoleClick('agro-expert')}} 
          >
            <FaUserTie className="me-2" />
            Meet Agric-Experts
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SidebarManager;
