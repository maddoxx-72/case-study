import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Grid } from '@mui/material';
import { useProfiles } from '../contexts/ProfileContext';
import ProfileCard from './ProfileCard';

const AdminPanel: React.FC = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = useProfiles();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    contact: '',
    interests: ''
  });

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setFormData({
      name: '',
      photo: '',
      description: '',
      address: '',
      contact: '',
      interests: ''
    });
  };

  const handleEdit = (profile: any) => {
    setCurrentProfile(profile);
    setFormData({
      name: profile.name,
      photo: profile.photo,
      description: profile.description,
      address: profile.address,
      contact: profile.contact || '',
      interests: profile.interests?.join(', ') || ''
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

  const handleSubmit = async () => {
    const profileData = {
      ...formData,
      interests: formData.interests.split(',').map(item => item.trim()).filter(item => item),
      coordinates: { lat: 0, lng: 0 } // In a real app, you'd geocode the address here
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
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 3 }}>
        Add New Profile
      </Button>

      <Grid container spacing={3}>
        {profiles.map(profile => (
          <Grid item key={profile.id} xs={12} sm={6} md={4}>
            <ProfileCard 
              profile={profile} 
              isAdmin={true} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
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
              value={formData.interests}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;