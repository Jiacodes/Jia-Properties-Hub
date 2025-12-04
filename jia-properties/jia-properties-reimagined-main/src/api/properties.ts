import propertiesData from '@/data/properties.json';

export interface Property {
  id: string;
  title: string;
  type: 'Apartment' | 'Hostel' | 'Airbnb' | 'Villa' | 'Studio' | 'Commercial';
  location: string;
  price: number;
  currency: string;
  priceUnit: string;
  beds: number | null;
  baths: number | null;
  amenities: string[];
  image: string;
  featured: boolean;
  description: string;
}

export interface SearchFilters {
  type?: string;
  location?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
}

// Simulates API call - can be replaced with actual backend
export const fetchProperties = async (): Promise<Property[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return propertiesData as Property[];
};

export const fetchPropertyById = async (id: string): Promise<Property | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return (propertiesData as Property[]).find(p => p.id === id);
};

export const fetchFeaturedProperties = async (): Promise<Property[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return (propertiesData as Property[]).filter(p => p.featured);
};

export const searchProperties = async (filters: SearchFilters): Promise<Property[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let results = propertiesData as Property[];
  
  if (filters.type && filters.type !== 'all') {
    results = results.filter(p => p.type.toLowerCase() === filters.type?.toLowerCase());
  }
  
  if (filters.location) {
    results = results.filter(p => 
      p.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }
  
  if (filters.guests && filters.guests > 0) {
    results = results.filter(p => {
      if (!p.beds) return true; // Hostels/commercial can accommodate
      return p.beds >= Math.ceil(filters.guests! / 2);
    });
  }
  
  if (filters.minPrice) {
    results = results.filter(p => p.price >= filters.minPrice!);
  }
  
  if (filters.maxPrice) {
    results = results.filter(p => p.price <= filters.maxPrice!);
  }
  
  return results;
};

export const getPropertyTypes = (): string[] => {
  return ['Apartment', 'Hostel', 'Airbnb', 'Villa', 'Studio', 'Commercial'];
};

export const getLocations = (): string[] => {
  const locations = (propertiesData as Property[]).map(p => {
    // Extract city/area from location
    const parts = p.location.split(',');
    return parts[parts.length - 1].trim();
  });
  return [...new Set(locations)];
};
