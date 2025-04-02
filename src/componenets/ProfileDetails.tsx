import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Divider, 
  Chip, 
  Button,
  Container,
  Grid,
  Paper
} from '@mui/material';
import { 
  LocationOn, 
  Email, 
  Phone, 
  Interests as InterestsIcon,
  Edit,
  ArrowBack
} from '@mui/icons-material';
import MapView from './MapView';
import { Profile } from '../types/interfaces';
import { useNavigate } from 'react-router-dom';

interface ProfileDetailProps {
  profile: Profile;
  isAdmin?: boolean;
  onEdit?: () => void;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profile, isAdmin = false, onEdit }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Profiles
      </Button>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={profile.photo}
                alt={profile.name}
                sx={{ 
                  width: 200, 
                  height: 200, 
                  mb: 3,
                  border: '3px solid',
                  borderColor: 'primary.main'
                }}
              />
              <Typography variant="h4" gutterBottom textAlign="center">
                {profile.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom textAlign="center">
                {profile.description}
              </Typography>
              
              {isAdmin && onEdit && (
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={onEdit}
                  sx={{ mt: 2 }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn color="primary" sx={{ mr: 1 }} />
                Address
              </Typography>
              <Typography>{profile.address}</Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {profile.contact && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email color="primary" sx={{ mr: 1 }} />
                  Contact
                </Typography>
                <Typography>{profile.contact}</Typography>
              </Box>
            )}

            {profile.interests?.length ? (
              <>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <InterestsIcon color="primary" sx={{ mr: 1 }} />
                    Interests
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {profile.interests.map((interest, index) => (
                      <Chip 
                        key={index} 
                        label={interest} 
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, height: 500 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOn color="primary" sx={{ mr: 1 }} />
          Location
        </Typography>
        <MapView 
          coordinates={profile.coordinates} 
          address={profile.address} 
          zoom={14}
          //style={{ height: '400px' }}
        />
      </Paper>
    </Container>
  );
};
export default ProfileDetail;
