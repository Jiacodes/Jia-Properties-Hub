import { motion } from 'framer-motion';
import { Bed, Bath, Wifi, Car, MapPin, Eye } from 'lucide-react';
import { Property } from '@/api/properties';
import { cn } from '@/lib/utils';

// Import property images
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import property4 from '@/assets/property-4.jpg';
import property5 from '@/assets/property-5.jpg';
import property6 from '@/assets/property-6.jpg';
import property7 from '@/assets/property-7.jpg';
import property8 from '@/assets/property-8.jpg';

const propertyImages: Record<string, string> = {
  'property-1': property1,
  'property-2': property2,
  'property-3': property3,
  'property-4': property4,
  'property-5': property5,
  'property-6': property6,
  'property-7': property7,
  'property-8': property8,
};

interface PropertyCardProps {
  property: Property;
  onBook?: (property: Property) => void;
  onView?: (property: Property) => void;
  index?: number;
}

const typeTagClasses: Record<string, string> = {
  Apartment: 'property-tag-apartment',
  Hostel: 'property-tag-hostel',
  Airbnb: 'property-tag-airbnb',
  Villa: 'property-tag-villa',
  Studio: 'property-tag-studio',
  Commercial: 'property-tag-commercial',
};

const getAmenityIcon = (amenity: string) => {
  const lower = amenity.toLowerCase();
  if (lower.includes('wifi')) return Wifi;
  if (lower.includes('parking') || lower.includes('car')) return Car;
  if (lower.includes('bed')) return Bed;
  if (lower.includes('bath')) return Bath;
  return null;
};

export const PropertyCard = ({ property, onBook, onView, index = 0 }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG').format(price);
  };

  const imageUrl = propertyImages[property.image] || property1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card-hover rounded-2xl overflow-hidden group"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Property Type Tag */}
        <div className="absolute top-4 left-4">
          <span className={cn(typeTagClasses[property.type] || 'property-tag')}>
            {property.type}
          </span>
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onView?.(property)}
          className="absolute top-4 right-4 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card"
          aria-label={`View ${property.title} details`}
        >
          <Eye className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-1">
          {property.title}
        </h3>

        {/* Amenities */}
        <div className="flex flex-wrap gap-3">
          {property.beds && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Bed className="w-4 h-4" />
              <span>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
            </div>
          )}
          {property.baths && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Bath className="w-4 h-4" />
              <span>{property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}</span>
            </div>
          )}
          {property.amenities.slice(0, 2).map((amenity) => {
            const Icon = getAmenityIcon(amenity);
            return Icon ? (
              <div key={amenity} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Icon className="w-4 h-4" />
                <span>{amenity}</span>
              </div>
            ) : null;
          })}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-xl font-bold text-accent">
              {property.currency} {formatPrice(property.price)}
            </span>
            <span className="text-muted-foreground text-sm">/{property.priceUnit}</span>
          </div>
          <button
            onClick={() => onBook?.(property)}
            className="btn-navy text-sm py-2 px-4"
            aria-label={`Book ${property.title}`}
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.article>
  );
};
