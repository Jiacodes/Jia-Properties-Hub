import { motion } from 'framer-motion';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>FAQ - Jia Properties Hub | Frequently Asked Questions</title>
        <meta name="description" content="Find answers to common questions about booking, payments, cancellations, and more at Jia Properties Hub. Get the information you need." />
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
                Frequently Asked Questions
              </h1>
              <p className="section-subheading mx-auto">
                Find answers to common questions about our properties, booking process, and services.
              </p>
            </motion.div>

            <FAQAccordion />

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="glass-card rounded-3xl p-8 lg:p-12 max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Still have questions?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Can't find the answer you're looking for? Our friendly team is here to help.
                </p>
                <Link to="/contact" className="btn-accent inline-flex items-center gap-2">
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQ;
