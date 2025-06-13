import { useEffect, useState } from 'react';
import { TextField, Button, Typography, CircularProgress, Box, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createProfile, getMyProfile, updateProfile } from './../../../../api/profile';
import toast from 'react-hot-toast';
import styles from './../farmStyles/profile.module.scss';

const FarmerProfile = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const response = await getMyProfile();
        if (response.success) {
          setProfile(response.data);
          reset(response.data);
        }
      } catch (error) {
        toast.error('Failed to load profile');
      }
      setLoading(false);
    }

    fetchProfile();
  }, [reset]);


const onSubmit = async (data) => {
  setLoading(true);
  try {
    // Convert cropsGrown from string to array
    if (data.farmDetails?.cropsGrown && typeof data.farmDetails.cropsGrown === 'string') {
      data.farmDetails.cropsGrown = data.farmDetails.cropsGrown
        .split(',')
        .map(crop => crop.trim());
    }

    let response;
    if (profile) {
      // if profile found we update.
      const userId = profile.user._id || profile.user; // assuming profile has a `user` field (user's _id)
      response = await updateProfile(userId, data);
    }
    else {
      ///// Create new profile if not found
      toast.success('Creating new Profile .');
      response = await createProfile(data);
    }

    if (response.success) {
      toast.success('Profile updated successfully');
      setProfile(response.data);
      reset(response.data);
    } else {
      toast.error('Failed to update profile');
    }
  } catch (error) {
    toast.error(error.message || 'Error updating profile');
  }
  setLoading(false);
};



  if (loading) {
    return (
      <Box className={styles.loaderWrapper}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.scrollWrapper}> 
        <Paper className={styles.container} elevation={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        {profile ? 'Update' : 'Create'} Farmer Profile
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextField
          label="Full Name"
          {...register('fullName', { required: 'Full name is required' })}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Phone"
          {...register('phone')}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Street"
          {...register('address.street')}
          fullWidth
          margin="normal"
        />

        <TextField
          label="City"
          {...register('address.city')}
          fullWidth
          margin="normal"
        />

        <TextField
          label="State"
          {...register('address.state')}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Country"
          {...register('address.country')}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Bio"
          multiline
          rows={3}
          {...register('bio')}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Farm Name"
          {...register('farmDetails.farmName')}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Farm Size (in acres)"
          type="number"
          {...register('farmDetails.farmSize')}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Crops Grown (comma-separated)"
          {...register('farmDetails.cropsGrown')}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {profile ? 'Update Profile' : 'Create Profile'}
        </Button>
      </form>

      {profile && (
        <Box className={styles.profileDisplay}>
          <Typography variant="h5" component="h2" gutterBottom>
            Profile Details
          </Typography>
          <Typography><strong>Name:</strong> {profile.fullName}</Typography>
          <Typography><strong>Phone:</strong> {profile.phone || 'N/A'}</Typography>
          <Typography>
            <strong>Address:</strong> {profile.address?.street}, {profile.address?.city}, {profile.address?.state}, {profile.address?.country}
          </Typography>
          <Typography><strong>Bio:</strong> {profile.bio || 'N/A'}</Typography>
          <Typography><strong>Farm:</strong> {profile.farmDetails?.farmName} - {profile.farmDetails?.farmSize} acres</Typography>
          <Typography><strong>Crops:</strong> {profile.farmDetails?.cropsGrown?.join(', ') || 'N/A'}</Typography>
        </Box>
      )}
    </Paper>
    </div>
  
  );
};

export default FarmerProfile;

