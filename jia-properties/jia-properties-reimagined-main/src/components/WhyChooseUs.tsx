import { motion } from 'framer-motion';
import { Shield, Search, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your payments are protected with bank-level security and instant confirmation for peace of mind.',
  },
  {
    icon: Search,
    title: 'Easy Search',
    description: 'Find exactly what you\'re looking for with our advanced filtering system tailored to your needs.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated customer service team is always ready to help you with any questions or concerns.',
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-foreground mb-4">
            Why Choose Jia Properties Hub?
          </h2>
          <p className="section-subheading mx-auto">
            We make finding your perfect accommodation luxurious, affordable, and hassle-free
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card-hover p-8 rounded-2xl text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
