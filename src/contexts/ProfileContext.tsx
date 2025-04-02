import { createContext, useContext, useState, useEffect } from 'react';
import { getProfiles, addProfile, updateProfile, deleteProfile } from '../services/mockApi';

interface Profile {
  id: string;
  name: string;
  photo: string;
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  contact?: string;
  interests?: string[];
}

interface ProfileContextType {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
  addProfile: (profile: Omit<Profile, 'id'>) => Promise<void>;
  updateProfile: (id: string, profile: Partial<Profile>) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  searchProfiles: (query: string) => void;
  filteredProfiles: Profile[];
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileContextType> = ({}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const data = await getProfiles();
        setProfiles(data);
        setFilteredProfiles(data);
      } catch (err) {
        setError('Failed to load profiles');
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleAddProfile = async (profile: Omit<Profile, 'id'>) => {
    try {
      const newProfile = await addProfile(profile);
      setProfiles(prev => [...prev, newProfile]);
      setFilteredProfiles(prev => [...prev, newProfile]);
    } catch (err) {
      setError('Failed to add profile');
    }
  };

  const handleUpdateProfile = async (id: string, updates: Partial<Profile>) => {
    try {
      const updatedProfile = await updateProfile(id, updates);
      setProfiles(prev => prev.map(p => p.id === id ? updatedProfile : p));
      setFilteredProfiles(prev => prev.map(p => p.id === id ? updatedProfile : p));
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleDeleteProfile = async (id: string) => {
    try {
      await deleteProfile(id);
      setProfiles(prev => prev.filter(p => p.id !== id));
      setFilteredProfiles(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete profile');
    }
  };

  const searchProfiles = (query: string) => {
    if (!query) {
      setFilteredProfiles(profiles);
      return;
    }
    const filtered = profiles.filter(profile =>
      profile.name.toLowerCase().includes(query.toLowerCase()) ||
      profile.description.toLowerCase().includes(query.toLowerCase()) ||
      profile.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProfiles(filtered);
  };

  return (
    <ProfileContext.Provider value={{
      profiles,
      filteredProfiles,
      loading,
      error,
      addProfile: handleAddProfile,
      updateProfile: handleUpdateProfile,
      deleteProfile: handleDeleteProfile,
      searchProfiles
    }}>
      {}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};
