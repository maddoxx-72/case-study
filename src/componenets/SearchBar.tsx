import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useProfiles } from '../contexts/ProfileContext';

const SearchBar: React.FC = () => {
  const { searchProfiles } = useProfiles();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchProfiles(e.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search profiles..."
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 3 }}
    />
  );
};

export default SearchBar;