import { NavLink } from "react-router-dom";
import { FaSeedling, FaWater, FaTasks, FaTractor, FaCloudSun, FaBug, FaUserTie, FaUserCog } from 'react-icons/fa';
import styles from './../farmStyles/sidebar.module.scss'
import userRoleFilter from './../../../../hooks/userRoleFilter.js';
function Sidebar(){
    const handleRoleClick = userRoleFilter()
 return(
       <div className={`sidebar bg-success text-white p-3 ${styles.sidebar}`}>
      <h4 className={`text-white mb-4 ${styles.title}`}>Farmer Panel</h4>
      <ul className={`list-unstyled ${styles.menu}`}>
        <li><NavLink to="/farmer/crops" className={`${styles.link} d-flex align-items-center mb-3`}><FaSeedling className="me-2" />Crop Management</NavLink></li>
        <li><NavLink to="/farmer/irrigation" className={`${styles.link} d-flex align-items-center mb-3`}><FaWater className="me-2" />Irrigation Control</NavLink></li>
        <li><NavLink to="/farmer/tasks" className={`${styles.link} d-flex align-items-center mb-3`}><FaTasks className="me-2" />Task List</NavLink></li>
        <li><NavLink to="/farmer/equipment" className={`${styles.link} d-flex align-items-center mb-3`}><FaTractor className="me-2" />Equipment Status</NavLink></li>
        <li><NavLink to="/farmer/weather" className={`${styles.link} d-flex align-items-center mb-3`}><FaCloudSun className="me-2" />Weather Forecast</NavLink></li>
        <li><NavLink to="/farmer/alerts" className={`${styles.link} d-flex align-items-center`}><FaBug className="me-2" />Pest & Disease Alerts</NavLink></li>
        <li> <NavLink to="/farmer/managers">  </NavLink></li>
        
      </ul>
    </div>
 )
}
export default Sidebar;