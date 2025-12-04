import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '@/api/properties';
import { PropertyCard } from './PropertyCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PropertyCarouselProps {
  properties: Property[];
  onBook?: (property: Property) => void;
  onView?: (property: Property) => void;
}

export const PropertyCarousel = ({ properties, onBook, onView }: PropertyCarouselProps) => {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="section-subheading mx-auto">
            Hand-picked accommodations for your perfect stay, curated just for you
          </p>
        </motion.div>

        <div className="relative group">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: '.carousel-prev',
              nextEl: '.carousel-next',
            }}
            pagination={{
              clickable: true,
              el: '.carousel-pagination',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {properties.map((property, index) => (
              <SwiperSlide key={property.id}>
                <PropertyCard
                  property={property}
                  onBook={onBook}
                  onView={onView}
                  index={index}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className="carousel-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-card shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent disabled:opacity-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="carousel-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-card shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent disabled:opacity-50"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Custom Pagination */}
          <div className="carousel-pagination flex justify-center gap-2 mt-8" />
        </div>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: hsl(var(--muted));
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: hsl(var(--accent));
          width: 30px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  );
};
