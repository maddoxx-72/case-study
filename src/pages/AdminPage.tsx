import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import ProfileCard from "Y:/code/case study program/.vscode/App/profile-explorer/src/componenets/ProfileCard";
import { useProfiles } from '../contexts/ProfileContext';
import { Profile } from '../types/interfaces';

const AdminPage: React.FC = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = useProfiles();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  
  const [formData, setFormData] = useState<Omit<Profile, 'id'>>({
    name: '',
    photo: '',
    description: '',
    address: '',
    coordinates: { lat: 0, lng: 0 },
    contact: '',
    interests: []
  });

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setFormData({
      name: '',
      photo: '',
      description: '',
      address: '',
      coordinates: { lat: 0, lng: 0 },
      contact: '',
      interests: []
    });
  };

  const handleEdit = (profile: Profile) => {
    setCurrentProfile(profile);
    setFormData({
      name: profile.name,
      photo: profile.photo,
      description: profile.description,
      address: profile.address,
      coordinates: profile.coordinates,
      contact: profile.contact || '',
      interests: profile.interests || []
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      await deleteProfile(id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({ ...prev, interests }));
  };

  const handleSubmit = async () => {
    const profileData = {
      ...formData,
      // In a real app, you would geocode the address here
      coordinates: formData.coordinates || { lat: 0, lng: 0 }
    };

    if (editMode && currentProfile) {
      await updateProfile(currentProfile.id, profileData);
    } else {
      await addProfile(profileData);
    }
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={handleOpen}
        >
          Add New Profile
        </Button>
      </Box>

      <Grid container spacing={3}>
        {profiles.map(profile => (
          <Grid item key={profile.id} xs={12} sm={6} md={4}>
            <ProfileCard 
              profile={profile}
              isAdmin
              onEdit={() => handleEdit(profile)}
              onDelete={() => handleDelete(profile.id)}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Profile' : 'Add New Profile'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="photo"
              label="Photo URL"
              value={formData.photo}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="contact"
              label="Contact"
              value={formData.contact}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="interests"
              label="Interests (comma separated)"
              value={formData.interests.join(', ')}
              onChange={handleInterestsChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage;