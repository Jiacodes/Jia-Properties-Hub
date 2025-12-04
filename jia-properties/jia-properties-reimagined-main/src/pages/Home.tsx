import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroWithBooking } from '@/components/HeroWithBooking';
import { PropertyCarousel } from '@/components/PropertyCarousel';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { BookingModal } from '@/components/BookingModal';
import { PropertyCard } from '@/components/PropertyCard';
import { useProperties, useFeaturedProperties } from '@/hooks/useProperties';
import { Property, SearchFilters } from '@/api/properties';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const { properties, loading, search, reset } = useProperties();
  const { properties: featuredProperties } = useFeaturedProperties();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    await search(filters);
    setHasSearched(true);
    // Scroll to results
    document.getElementById('properties-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBook = (property: Property) => {
    setSelectedProperty(property);
    setIsBookingOpen(true);
  };

  const handleView = (property: Property) => {
    setSelectedProperty(property);
    setIsBookingOpen(true);
  };

  const handleReset = async () => {
    await reset();
    setHasSearched(false);
  };

  return (
    <>
      <Helmet>
        <title>Jia Properties Hub - Luxury Accommodations in Uganda</title>
        <meta name="description" content="Find luxury apartments, cozy hostels, and unique Airbnb experiences across Uganda. Book your perfect stay with Jia Properties Hub - where luxury meets comfort." />
        <meta name="keywords" content="Uganda accommodation, Kampala apartments, Uganda hostels, Airbnb Uganda, luxury stay Uganda" />
      </Helmet>

      <main>
        {/* Hero Section with Booking */}
        <HeroWithBooking onSearch={handleSearch} />

        {/* Featured Properties Carousel */}
        <PropertyCarousel
          properties={featuredProperties}
          onBook={handleBook}
          onView={handleView}
        />

        {/* Search Results or All Properties */}
        {hasSearched && (
          <section id="properties-section" className="py-16 lg:py-24">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
              >
                <div>
                  <h2 className="section-heading text-foreground mb-2">
                    Search Results
                  </h2>
                  <p className="text-muted-foreground">
                    Found {properties.length} {properties.length === 1 ? 'property' : 'properties'} matching your criteria
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="btn-navy text-sm"
                >
                  Clear Filters
                </button>
              </motion.div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading properties...</p>
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground mb-4">
                    No properties found matching your criteria
                  </p>
                  <button onClick={handleReset} className="btn-accent">
                    View All Properties
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {properties.map((property, index) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onBook={handleBook}
                      onView={handleView}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Booking Modal */}
        <BookingModal
          property={selectedProperty}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      </main>
    </>
  );
};

export default Home;
