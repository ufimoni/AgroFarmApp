import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaCog } from 'react-icons/fa';
import styles from './../farmStyles/header.module.scss';

function Header({ user }) {
  const navigate = useNavigate();

 ///// we create a goto Settings function
  const gotoSettings = () =>{
    navigate('settings')
  }

  const notifications = () =>{
   navigate('notifications');
  }

  const FarmerProfile = () =>{
    navigate('farmerProfile');
  }

  return (
    <header
      className={`dashboard-header d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom shadow-sm ${styles.header}`}
    >
      <h5 className={`mb-0 fw-bold ${styles.title}`}>Farmer Dashboard</h5>
      <div className={`d-flex align-items-center gap-4 position-relative ${styles.rightSection}`}>
        <FaBell
          className={` fs-5 cursor-pointer ${styles.bell}`}
          title="Notifications"
          onClick={notifications}
        />
        <div className={`d-flex align-items-center ${styles.userInfo}`}>
          <FaUserCircle className={`text-success fs-4 me-2 ${styles.userIcon} ${styles.icon}`}
          title="User Profile"
          onClick={FarmerProfile}
          />
          <div className={styles.textGroup}>
            <div className="fw-bold">{user?.firstname + ' ' + user?.lastname}</div>
            <small className="text-muted">{user?.role}</small>
          </div>
        </div>

        <FaCog
          className={`fs-5 cursor-pointer ${styles.settings}`}
          title="Settings"
          onClick={gotoSettings}
          tabIndex={0}
          aria-label='go to settings'
        />

      </div>
    </header>
  );
}

export default Header;
