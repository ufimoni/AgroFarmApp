import { FaBell, FaUserCircle } from 'react-icons/fa';
import styles from './../expertStyles/header.module.scss';
function Header({user}){
 return(
     <header className={`dashboard-header d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom shadow-sm ${styles.header}`}>
      <h5 className={`mb-0 fw-bold ${styles.title}`}>Agricultural Experts Dashboard</h5>
      <div className={`d-flex align-items-center gap-4 ${styles.rightSection}`}>
        <FaBell className={`text-secondary fs-5 cursor-pointer ${styles.icon}`} title="Notifications" />
        <div className={`d-flex align-items-center ${styles.userInfo}`}>
          <FaUserCircle className={`text-success fs-4 me-2 ${styles.userIcon}`} />
          <div className={styles.textGroup}>
            <div className="fw-bold">{user?.firstname + ' ' + user?.lastname}</div>
            <small className="text-muted">{user?.role}</small>
          </div>
        </div>
      </div>
    </header>
 )
}
export default Header;