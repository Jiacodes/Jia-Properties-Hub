import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ContactForm';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Jia Properties Hub | Get in Touch</title>
        <meta name="description" content="Contact Jia Properties Hub for inquiries about apartments, hostels, and Airbnb rentals in Uganda. We're here to help you find your perfect stay." />
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
                Get in Touch
              </h1>
              <p className="section-subheading mx-auto">
                Have questions or need assistance? We're here to help you find your perfect accommodation.
              </p>
            </motion.div>

            <ContactForm />

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16"
            >
              <div className="glass-card rounded-3xl overflow-hidden h-80 lg:h-96">
                {/* REPLACE: Add your Google Maps embed or preferred map service */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.75772082444!2d32.5272389!3d0.3135556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc0f90c86d49%3A0x63914c3f83afbf79!2sKampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jia Properties Hub Location"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
