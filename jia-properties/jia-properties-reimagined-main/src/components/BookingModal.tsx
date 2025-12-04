import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Bed, Bath, Wifi, Car, Check } from 'lucide-react';
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

interface BookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ property, isOpen, onClose }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG').format(price);
  };

  const imageUrl = propertyImages[property.image] || property1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        message: '',
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-card rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {submitted ? (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
                >
                  <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Booking Request Sent!
                </h3>
                <p className="text-muted-foreground">
                  We'll get back to you within 24 hours to confirm your reservation.
                </p>
              </div>
            ) : (
              <>
                {/* Property Preview */}
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <img
                    src={imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Price Display */}
                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <span className="text-2xl font-bold text-accent">
                      {property.currency} {formatPrice(property.price)}
                    </span>
                    <span className="text-muted-foreground">/{property.priceUnit}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="booking-name" className="text-sm font-medium text-foreground">
                        Full Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={cn(
                          "w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border",
                          "text-foreground placeholder:text-muted-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        )}
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="booking-email" className="text-sm font-medium text-foreground">
                        Email *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={cn(
                          "w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border",
                          "text-foreground placeholder:text-muted-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        )}
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="booking-phone" className="text-sm font-medium text-foreground">
                        Phone Number *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={cn(
                          "w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border",
                          "text-foreground placeholder:text-muted-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        )}
                        placeholder="+256 700 123 456"
                      />
                    </div>

                    {/* Guests */}
                    <div className="space-y-2">
                      <label htmlFor="booking-guests" className="text-sm font-medium text-foreground">
                        Guests
                      </label>
                      <select
                        id="booking-guests"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className={cn(
                          "w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border",
                          "text-foreground appearance-none cursor-pointer",
                          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        )}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Check In */}
                    <div className="space-y-2">
                      <label htmlFor="booking-checkin" className="text-sm font-medium text-foreground">
                        Check-in Date *
                      </label>
                      <input
                        id="booking-checkin"
                        type="date"
                        required
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        className={cn(
                          "w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border",
                          "text-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        )}
                      />
                    </div>

                    {/* Check Out */}
                    <div className="space-y-2">
                      <label htmlFor="booking-checkout" className="text-sm font-medium text-foreground">
                        Check-out Date *
                      </label>
                      <input
                        id="booking-checkout"
                        type="date"
                        required
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className={cn(
                          "w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border",
                          "text-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        )}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="booking-message" className="text-sm font-medium text-foreground">
                      Special Requests
                    </label>
                    <textarea
                      id="booking-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border",
                        "text-foreground placeholder:text-muted-foreground resize-none",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                      )}
                      placeholder="Any special requests or requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-accent w-full h-14 text-lg font-semibold"
                  >
                    Confirm Booking
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
