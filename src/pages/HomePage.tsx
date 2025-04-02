import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ProfileList from '../componenets/ProfileList';
import SearchBar from   '../componenets/SearchBar';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Profile Explorer
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Browse profiles and explore their locations
        </Typography>
        
        {/* Search Bar Component */}
        <Box sx={{ mb: 4 }}>
          <SearchBar />
        </Box>
        
        {/* Profile List Component */}
        <ProfileList />
      </Box>
    </Container>
  );
};

export default HomePage;