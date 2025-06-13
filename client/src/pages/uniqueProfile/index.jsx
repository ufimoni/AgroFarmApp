import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProfileByUserId } from './../../api/profile';
import styles from './../../style/uniqueprofile.module.scss';
import { Chip, Button } from '@mui/material'; // Material UI components

function UniqueProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileByUser = async () => {
      try {
        const response = await getProfileByUserId(id);
        if (response?.success && response.data) {
          setProfile(response.data);
        } else {
          setError('Profile not found');
        }
      } catch (err) {
        setError('Failed to load profile...');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileByUser();
  }, [id]);

  if (loading) return <p className={styles.loadingMessage}>Loading...</p>;

  if (error) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Profile Not Found</h2>
        <p>{error}</p>
        <Button
          variant="contained"
          color="error"
          onClick={() => window.history.back()}
          style={{ marginTop: '1rem' }}
        >
          Go Back
        </Button>
      </div>
    );
  }

  if (!profile) return null;

  const {
    fullName,
    phone,
    bio,
    expertiseAreas = [],
    address = {},
    farmDetails = {},
    user = {},
    Image,
  } = profile;

  return (


    <div className={styles.scrollWrapper}> 
     <div className={styles.profileContainer}>
      <h1>{fullName || `${user.firstname} ${user.lastname}` || 'Unnamed User'}</h1>

      {(Image || user?.image) && (
        <img
          src={Image || user.image}
          alt={`${fullName || user.firstname}'s avatar`}
          className={styles.profileImage}
        />
      )}

      <p><strong>Email:</strong> {user.email || 'Not available'}</p>
      <p><strong>Phone:</strong> {phone || user.phone || 'Not provided'}</p>
      <p><strong>Role:</strong> 
        <Chip label={user.role || 'N/A'} color="primary" variant="outlined" size="small" />
      </p>
      <p><strong>Biography:</strong> {bio || 'No bio available'}</p>

      {expertiseAreas.length > 0 && (
        <div>
          <p><strong>Expertise Areas:</strong></p>
          <ul>
            {expertiseAreas.map((area, i) => (
              <li key={i}>
                <Chip label={area} color="success" variant="outlined" size="small" style={{ margin: '2px' }} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {Object.values(address).some(val => val) && (
        <div>
          <p><strong>Address:</strong></p>
          <p>
            {[address.street, address.city, address.state, address.postalCode, address.country]
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>
      )}

      {farmDetails && Object.keys(farmDetails).length > 0 && (
        <div>
          <p><strong>Farm Details:</strong></p>
          <p><strong>Farm Name:</strong> {farmDetails.farmName || 'N/A'}</p>
          <p><strong>Farm Size:</strong> {farmDetails.farmSize ? `${farmDetails.farmSize} acres` : 'N/A'}</p>
          <p><strong>Crops Grown:</strong> 
            {Array.isArray(farmDetails.cropsGrown) && farmDetails.cropsGrown.length > 0
              ? farmDetails.cropsGrown.join(', ')
              : 'N/A'}
          </p>
        </div>
      )}
    </div>
     </div>
   
  );
}

export default UniqueProfile;
