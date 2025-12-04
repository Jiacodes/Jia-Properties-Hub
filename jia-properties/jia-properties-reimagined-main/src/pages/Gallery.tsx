import { motion } from 'framer-motion';
import { GalleryMasonry } from '@/components/GalleryMasonry';
import { Helmet } from 'react-helmet-async';

const Gallery = () => {
  return (
    <>
      <Helmet>
        <title>Gallery - Jia Properties Hub | View Our Properties</title>
        <meta name="description" content="Browse our stunning gallery of luxury apartments, cozy hostels, and unique Airbnb properties across Uganda. See where luxury meets comfort." />
      </Helmet>

      <main className="pt-24 pb-16">
        {/* Page Header */}
        <section className="py-12 lg:py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h1 className="section-heading text-foreground mb-4">
                Property Gallery
              </h1>
              <p className="section-subheading mx-auto">
                Explore our curated collection of stunning accommodations across Uganda. Each property is handpicked to ensure your comfort and satisfaction.
              </p>
            </motion.div>

            <GalleryMasonry />
          </div>
        </section>
      </main>
    </>
  );
};

export default Gallery;
