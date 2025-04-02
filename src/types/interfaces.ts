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

export type { Profile }; // This makes it a module