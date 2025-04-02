import React, { useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  CardActions, 
  IconButton, 
  Chip,
  Box // Added missing import
} from '@mui/material';
import { Person, LocationOn, Edit, Delete } from '@mui/icons-material';
import MapView from './MapView';
import { Profile } from '../types/interfaces';

interface ProfileCardProps {
  profile: Profile;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEdit, onDelete, isAdmin = false }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={profile.photo || '/default-profile.jpg'}
        alt={profile.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {profile.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {profile.description}
        </Typography>
        {profile.interests?.length && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {profile.interests.map((interest: string) => ( // Added type annotation
              <Chip key={interest} label={interest} size="small" />
            ))}
          </Box>
        )}
        <Typography variant="body2" color="text.secondary">
          <LocationOn fontSize="small" /> {profile.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<LocationOn />} onClick={() => setShowMap(!showMap)}>
          {showMap ? 'Hide Map' : 'View Location'}
        </Button>
        {isAdmin && (
          <>
            <IconButton aria-label="edit" onClick={() => onEdit && onEdit(profile.id)}>
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => onDelete && onDelete(profile.id)}>
              <Delete />
            </IconButton>
          </>
        )}
      </CardActions>
      {showMap && (
        <Box sx={{ height: 300, p: 2 }}>
          <MapView coordinates={profile.coordinates} address={profile.address} />
        </Box>
      )}
    </Card>
  );
};

export default ProfileCard;