import React from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import ProfileCard from './ProfileCard';
import { useProfiles } from '../contexts/ProfileContext';


const ProfileList: React.FC = () => {
  const { filteredProfiles, loading, error } = useProfiles();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (filteredProfiles.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography>No profiles found</Typography>
      </Box>
    );
  }
};

export default ProfileList;