import { FaUser } from 'react-icons/fa';  // user icon from react-icons
import styles from './userLists.module.scss';

// Get initials from firstname and lastname
// const getUserInitials = (firstname = '', lastname = '') => {
//   const firstInitial = firstname?.[0]?.toUpperCase() || '';
//   const lastInitial = lastname?.[0]?.toUpperCase() || '';
//   return firstInitial + lastInitial;
// };

const renderAvatar = (user) => {
  if (user.image) {
    return <img src={user.image}
     alt={`${user.firstname} 
     ${user.lastname} avatar`}
      className={styles.avatar
        
      } />;
  }

  // const initials = getUserInitials(user.firstname, user.lastname);
  // if (initials) {
  //   return (
  //     <div className={`${styles.avatar} ${styles.initialsAvatar}`}>
  //       {initials}
  //     </div>
  //   );
  // } use this initials

  // fallback user icon
  return (
    <div className={`${styles.avatar} ${styles.iconAvatar}`}>
      <FaUser />
    </div>
  );
};

const UserListPage = ({ users, title, onStartChat, onViewProfile }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>List of {title}</h2>
      <div className={styles.grid}>
        {Array.isArray(users) && users.length > 0 ? (
          users.map(user => (
            <div key={user._id} className={styles.card}>
              <div className={styles.header}>
                {renderAvatar(user)}
                <div className={styles.userInfo}>
                  <h3>{user.firstname} {user.lastname}</h3>
                  <p className={styles.email}>{user.email}</p>
                  <p className={styles.bio}>{user.bio || user.profession || 'No bio available'}</p>
                </div>
              </div>
              <div className={styles.actions}>
                <button 
                  className="btn btn-primary me-2" 
                  onClick={() => onStartChat(user)}
                >
                  Start Chat
                </button>
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => onViewProfile(user)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noUsers}>No users available for now.</p>
        )}
      </div>
    </div>
  );
};

export default UserListPage;

