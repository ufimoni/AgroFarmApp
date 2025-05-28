import { NavLink } from "react-router-dom";
import {
  FaSeedling,
  FaWater,
  FaTasks,
  FaTractor,
  FaCloudSun,
  FaBug,
  FaUserTie,
  FaUserCog,
} from "react-icons/fa";
import styles from "./../farmStyles/sidebar.module.scss";
import useUserRoleFilter from "./../../../../hooks/userRoleFilter";

function Sidebar() {
  const handleRoleClick = useUserRoleFilter();

  return (
    <div className={`sidebar bg-success text-white p-3 ${styles.sidebar}`}>
      <h4 className={`text-white mb-4 ${styles.title}`}>Farmer Panel</h4>
      <ul className={`list-unstyled ${styles.menu}`}>
        <li>
          <NavLink
            to="/farmer/crops"
            className={`${styles.link} d-flex align-items-center mb-3`}
          >
            <FaSeedling className="me-2" />
            Crop Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmer/irrigation"
            className={`${styles.link} d-flex align-items-center mb-3`}
          >
            <FaWater className="me-2" />
            Irrigation Control
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmer/tasks"
            className={`${styles.link} d-flex align-items-center mb-3`}
          >
            <FaTasks className="me-2" />
            Task List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmer/equipment"
            className={`${styles.link} d-flex align-items-center mb-3`}
          >
            <FaTractor className="me-2" />
            Equipment Status
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmer/weather"
            className={`${styles.link} d-flex align-items-center mb-3`}
          >
            <FaCloudSun className="me-2" />
            Weather Forecast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmer/alerts"
            className={`${styles.link} d-flex align-items-center mb-3`}
          >
            <FaBug className="me-2" />
            Pest & Disease Alerts
          </NavLink>
        </li>

        {/* View Managers */}
        <li>
          <NavLink
            to="/farmer/managers"
            className={`${styles.link} d-flex align-items-center mb-3`}
            onClick={() => handleRoleClick("farm-manager")}
          >
            <FaUserCog className="me-2" />
            View Farm Managers
          </NavLink>
        </li>

        {/* View Agricultural Experts */}
        <li>
          <NavLink
            to="/farmer/experts"
            className={`${styles.link} d-flex align-items-center mb-3`}
            onClick={() => handleRoleClick("agro-expert")}
          >
            <FaUserTie className="me-2" />
            View Agro Experts
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
