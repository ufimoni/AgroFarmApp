import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar' // should be in smaller s.
import Header from './components/Header'
import { Outlet } from 'react-router-dom';
import styles from './farmStyles/dashboard.module.scss';
import { getLoggedUser } from './../../../api/user';
function Dashboard() {
  const [ user, setUser ] = useState(null);


  useEffect(() => {
    async function fetchUser() {
      const response = await getLoggedUser();
      if (response.success) {
        setUser(response.data);
      }
    }
    fetchUser();
  }, []);
  return (
    <div className={`dashboard d-flex ${styles.dashboard}`}>
      <Sidebar />
      <div className={`main-content flex-grow-1 ${styles.mainContent}`}>
        <Header user={user}/>
        <main className={`p-3 ${styles.main}`}> 
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Dashboard;