import { NavLink } from "react-router-dom";
import {
  FaLightbulb,
  FaClipboardList,
  FaChartLine,
  FaBook,
  FaComments,
  FaTractor,
  FaUserCog
} from "react-icons/fa";
import styles from "./../expertStyles/sidebar.module.scss";
import userRoleFilter from "./../../../../hooks/userRoleFilter";



// add bg-info inside the sidebar text-white p-3 to make it blue
function SidebarExpert() {
const handleRoleClick = userRoleFilter();

  return (
    <div className={`sidebar text-white p-3 ${styles.sidebar}`}>
      <h4 className={`text-white mb-4 ${styles.title}`}>Agro Expert Panel</h4>
      <ul className={`list-unstyled ${styles.menu}`}>
        <li>
          <NavLink to="/expert/research" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaLightbulb className="me-2" />
            Research & Tips
          </NavLink>
        </li>
        <li>
          <NavLink to="/expert/visits" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaClipboardList className="me-2" />
            Field Visits
          </NavLink>
        </li>
        <li>
          <NavLink to="/expert/analytics" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaChartLine className="me-2" />
            Data Analysis
          </NavLink>
        </li>
        <li>
          <NavLink to="/expert/knowledge" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaBook className="me-2" />
            Knowledge Base
          </NavLink>
        </li>
        <li>
          <NavLink to="/expert/chat" className={`${styles.link} d-flex align-items-center mb-3`}>
            <FaComments className="me-2" />
            Collaborate & Chat
          </NavLink>
        </li>
        <li>
          <NavLink to="/expert/farmers" className={`${styles.link} d-flex align-items-center mb-3`}
          onClick={() =>{ handleRoleClick('farmer')}}
          >
          <FaTractor className="me-2"/>
          View Farmers
          </NavLink>
        </li>

        <li>
          <NavLink to="/expert/managers" className={`${styles.link} d-flex align-items-center mb-3 `}
          onClick={() =>{ handleRoleClick('farm-manager')}}
          >
          <FaUserCog className="me-2"/>
          View Farm Managers
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default SidebarExpert;
