// services/mockApi.ts
import { Profile } from '../types/interfaces';

let mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'John Doe',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Software Developer',
    address: '1600 Amphitheatre Parkway, Mountain View, CA',
    coordinates: { lat: 37.422, lng: -122.084 },
    contact: 'john.doe@example.com',
    interests: ['Programming', 'Hiking', 'Photography']
  },
  {
    id: '2',
    name: 'Jane Smith',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    description: 'UX Designer',
    address: '1 Infinite Loop, Cupertino, CA',
    coordinates: { lat: 37.3318, lng: -122.0311 },
    contact: 'jane.smith@example.com',
    interests: ['Design', 'Art', 'Travel']
  }
];

export const getProfiles = async (): Promise<Profile[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockProfiles), 500));
};

export const addProfile = async (profile: Omit<Profile, 'id'>): Promise<Profile> => {
  return new Promise(resolve => setTimeout(() => {
    const newProfile = { ...profile, id: Math.random().toString(36).substring(7) };
    mockProfiles = [...mockProfiles, newProfile];
    resolve(newProfile);
  }, 500));
};

export const updateProfile = async (id: string, profile: Partial<Profile>): Promise<Profile> => {
  return new Promise(resolve => setTimeout(() => {
    const index = mockProfiles.findIndex(p => p.id === id);
    const updatedProfile = { ...mockProfiles[index], ...profile };
    mockProfiles = [...mockProfiles.slice(0, index), updatedProfile, ...mockProfiles.slice(index + 1)];
    resolve(updatedProfile);
  }, 500));
};

export const deleteProfile = async (id: string): Promise<void> => {
  return new Promise(resolve => setTimeout(() => {
    mockProfiles = mockProfiles.filter(p => p.id !== id);
    resolve();
  }, 500));
};
