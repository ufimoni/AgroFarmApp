import styles from './userLists.module.scss'

const UserListPage = ({ users, title, onStartChat, onViewProfile }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>List of {title}</h2>
      <div className={styles.grid}>
        { Array.isArray(users) && users.length > 0 ? (
          users.map(user => (
            <div key={user._id} className={styles.card}>
              <div className={styles.header}>
                <img
                  src={user.avatar || '/default-avatar.png'}
                  alt={`${user.firstname} avatar`}
                  className={styles.avatar}
                />
                <div className={styles.userInfo}>
                  <h3>{user.name}</h3>
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
          <p className={styles.noUsers}>No users available for Now.</p>
        )}
      </div>
    </div>
  );
};

export default UserListPage;