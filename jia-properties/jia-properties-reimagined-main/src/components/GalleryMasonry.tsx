import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import all property images
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import property4 from '@/assets/property-4.jpg';
import property5 from '@/assets/property-5.jpg';
import property6 from '@/assets/property-6.jpg';
import property7 from '@/assets/property-7.jpg';
import property8 from '@/assets/property-8.jpg';
import heroBg from '@/assets/hero-bg.jpg';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  height: 'short' | 'medium' | 'tall';
}

const galleryImages: GalleryImage[] = [
  { id: '1', src: property1, alt: 'Luxury apartment interior', title: 'Luxury Bunga Apartment', location: 'Bunga, Soya', height: 'tall' },
  { id: '2', src: property2, alt: 'Modern hostel room', title: 'Central Entebbe Hostel', location: 'Seguku, Entebbe', height: 'short' },
  { id: '3', src: property3, alt: 'Lakeside villa', title: 'Lake Victoria View Villa', location: 'Munyonyo', height: 'medium' },
  { id: '4', src: property4, alt: 'Cozy studio', title: 'Kololo Studio Apartment', location: 'Kololo', height: 'short' },
  { id: '5', src: property5, alt: 'Girls hostel', title: 'Girls Hostel Nakasero', location: 'Nakasero', height: 'medium' },
  { id: '6', src: property6, alt: 'Treehouse', title: 'Bwindi Treehouse', location: 'Bwindi National Park', height: 'tall' },
  { id: '7', src: property7, alt: 'Penthouse view', title: 'Kampala Skyline Penthouse', location: 'Kampala City', height: 'medium' },
  { id: '8', src: property8, alt: 'Commercial space', title: 'Modern Co-Working Space', location: 'Industrial Area', height: 'short' },
  { id: '9', src: heroBg, alt: 'Resort exterior', title: 'Luxury Resort', location: 'Kampala', height: 'tall' },
];

const heightClasses = {
  short: 'h-48 md:h-56',
  medium: 'h-64 md:h-72',
  tall: 'h-80 md:h-96',
};

interface LightboxModalProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const LightboxModal = ({ images, currentIndex, isOpen, onClose, onPrev, onNext }: LightboxModalProps) => {
  const currentImage = images[currentIndex];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'Escape') onClose();
  };

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95"
            onClick={onClose}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image & Details */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative flex flex-col lg:flex-row items-center gap-8 max-w-7xl w-full px-4"
          >
            {/* Image */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-h-[70vh] max-w-full object-contain rounded-2xl"
              />
            </div>

            {/* Details Panel */}
            <div className="lg:w-80 text-white text-center lg:text-left">
              <h3 className="text-2xl font-heading font-bold mb-2">
                {currentImage.title}
              </h3>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-white/70 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{currentImage.location}</span>
              </div>
              <p className="text-white/60 text-sm">
                Image {currentIndex + 1} of {images.length}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const GalleryMasonry = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };

  return (
    <>
      <div className="masonry-grid">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="masonry-item"
          >
            <div
              className={cn(
                'relative overflow-hidden rounded-2xl group cursor-pointer',
                heightClasses[image.height]
              )}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              aria-label={`View ${image.title}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white font-heading font-semibold text-lg mb-1">
                    {image.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-white/70 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{image.location}</span>
                  </div>
                </div>
                
                {/* Expand Icon */}
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  aria-label="Expand image"
                >
                  <Expand className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <LightboxModal
        images={galleryImages}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  );
};
