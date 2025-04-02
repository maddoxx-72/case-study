import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, Avatar, Divider, Chip } from '@mui/material';
import { LocationOn, Email, Phone, Interests } from '@mui/icons-material';
import MapView from '../componenets/MapView';
import { useProfiles } from '../contexts/ProfileContext';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { profiles } = useProfiles();
  const profile = profiles.find(p => p.id === id);

  if (!profile) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography>Profile not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={profile.photo}
              alt={profile.name}
              sx={{ width: 200, height: 200, mb: 2 }}
            />
            <Typography variant="h4" gutterBottom>
              {profile.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {profile.description}
            </Typography>
            
            <Box sx={{ mt: 2, width: '100%' }}>
              <Divider sx={{ my: 2 }} />
              
              {profile.contact && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email color="action" sx={{ mr: 1 }} />
                  <Typography>{profile.contact}</Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn color="action" sx={{ mr: 1 }} />
                <Typography>{profile.address}</Typography>
              </Box>
              
              {profile.interests?.length && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Interests sx={{ mr: 1 }} /> Interests
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {profile.interests.map(interest => (
                      <Chip key={interest} label={interest} />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Box sx={{ height: '500px', mb: 3 }}>
            <MapView 
              coordinates={profile.coordinates} 
              address={profile.address} 
              zoom={14}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;