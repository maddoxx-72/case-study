export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
    if (!window.google) {
      throw new Error('Google Maps API not loaded');
    }
  
    const geocoder = new window.google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results?.[0]?.geometry?.location) {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });
        } else {
          reject(new Error('Geocode was not successful: ' + status));
        }
      });
    });
  };