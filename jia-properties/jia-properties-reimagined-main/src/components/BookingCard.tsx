import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, ChevronDown } from 'lucide-react';
import { SearchFilters, getPropertyTypes, getLocations } from '@/api/properties';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  onSearch: (filters: SearchFilters) => void;
}

export const BookingCard = ({ onSearch }: BookingCardProps) => {
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState(1);
  
  const propertyTypes = ['all', ...getPropertyTypes()];
  const locations = getLocations();

  const handleSearch = () => {
    onSearch({
      type: propertyType,
      location,
      guests,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-card rounded-3xl p-6 md:p-8 w-full max-w-4xl mx-auto"
      whileHover={{ y: -4, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Property Type */}
        <div className="space-y-2">
          <label 
            htmlFor="property-type" 
            className="text-sm font-medium text-muted-foreground"
          >
            Property Type
          </label>
          <div className="relative">
            <select
              id="property-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className={cn(
                "w-full h-12 px-4 pr-10 rounded-xl bg-secondary/50 border border-border",
                "text-foreground appearance-none cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
                "transition-all duration-200"
              )}
              aria-label="Select property type"
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label 
            htmlFor="location" 
            className="text-sm font-medium text-muted-foreground"
          >
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={cn(
                "w-full h-12 pl-10 pr-10 rounded-xl bg-secondary/50 border border-border",
                "text-foreground appearance-none cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
                "transition-all duration-200"
              )}
              aria-label="Select location"
            >
              <option value="">Any Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label 
            htmlFor="guests" 
            className="text-sm font-medium text-muted-foreground"
          >
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className={cn(
                "w-full h-12 pl-10 pr-10 rounded-xl bg-secondary/50 border border-border",
                "text-foreground appearance-none cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
                "transition-all duration-200"
              )}
              aria-label="Select number of guests"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Search Button */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-transparent hidden sm:block">
            Search
          </label>
          <button
            onClick={handleSearch}
            className="btn-accent w-full h-12 flex items-center justify-center gap-2 rounded-xl"
            aria-label="Search properties"
          >
            <Search className="w-5 h-5" />
            <span className="font-semibold">Search</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
