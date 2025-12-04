import { motion } from 'framer-motion';
import { Star, Award, Users, Calendar, ChevronRight } from 'lucide-react';
import ownerImage from '@/assets/dad.jpg';
import teammateImage from '@/assets/me.jpg';
import { Helmet } from 'react-helmet-async';

const stats = [
  { icon: Users, value: '200+', label: 'Happy Guests' },
  { icon: Award, value: '50+', label: 'Properties' },
  { icon: Star, value: '4.5', label: 'Average Rating' },
  { icon: Calendar, value: '7+', label: 'Years Experience' },
];

const milestones = [
  { year: '2019', title: 'The idea', description: 'Quit his job as a professional accountant' },
  { year: '2020', title: 'Company Founded', description: 'Started with just 5 properties in Kiwanga and Zilobwe' },
  { year: '2022', title: 'Physical Office', description: 'Acquired a physical office at Noor Emporium' },
  { year: '2024', title: 'National Coverage', description: 'Expanded to all major cities in Uganda, including Gulu' },
  { year: '2025', title: 'Digital Platform Launch', description: 'Launched online booking system' },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Jia Properties Hub | Our Story</title>
        <meta name="description" content="Learn about Jia Properties Hub, Uganda's trusted property rental platform. Discover our mission, meet our founder, and see why thousands choose us." />
      </Helmet>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-12 lg:py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="section-heading text-foreground mb-4">
                About <span className="text-gradient-accent">Jia Properties Hub</span>
              </h1>
              <p className="section-subheading mx-auto">
                We're on a mission to make finding your perfect accommodation in Uganda easy, affordable, and luxurious.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mission Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  At Jia Properties Hub, we believe everyone deserves access to quality accommodation. Whether you're a business traveler seeking luxury, a backpacker looking for budget-friendly options, or a family planning a memorable vacation, we have the perfect property for you.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We partner with property owners across Uganda to bring you verified, high-quality accommodations at competitive prices. Our rigorous vetting process ensures that every listing meets our standards for cleanliness, safety, and comfort.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-accent">
                    <ChevronRight className="w-5 h-5" />
                    <span className="font-medium">Verified Properties</span>
                  </div>
                  <div className="flex items-center gap-2 text-accent">
                    <ChevronRight className="w-5 h-5" />
                    <span className="font-medium">Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-2 text-accent">
                    <ChevronRight className="w-5 h-5" />
                    <span className="font-medium">24/7 Support</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600"
                    alt="Modern apartment building"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl bg-accent/20 -z-10" />
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-xl bg-primary/20 -z-10" />
              </motion.div>
            </div>

            {/* Founder Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-8 lg:p-12 mb-20"
            >
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <div className="relative w-48 h-48 mx-auto lg:mx-0">
                    {/* REPLACE: Replace owner.jpg with actual owner photo */}
                    <img
                      src={"dad.jpg"}
                      alt="Founder of Jia Properties Hub"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-xl font-semibold text-sm">
                      Founder
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                    Meet Our Founder
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    "I started Jia Properties Hub with a simple vision: to make quality accommodation accessible to everyone visiting or living in Uganda. Having traveled extensively myself, I understood the frustration of finding reliable, comfortable places to stay."
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "Today, we've helped over 200 guests find their perfect home away from home. Our team works tirelessly to maintain the highest standards, and I'm proud of the community we've built."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-foreground font-semibold">Muhwezi John </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="text-muted-foreground text-sm">5+ Years in Hospitality</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* New Teammate Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="glass-card rounded-3xl p-8 lg:p-12 mb-20"
>
  <div className="grid lg:grid-cols-3 gap-8 items-center">
    <div className="lg:col-span-1">
      <div className="relative w-48 h-48 mx-auto lg:mx-0">
        <img
          src={"me.jpg"}
          alt="Your Teammate Name"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-xl font-semibold text-sm">
          Systems Manager {/* or any position/title */}
        </div>
      </div>
    </div>
    <div className="lg:col-span-2 text-center lg:text-left">
      <h3 className="text-2xl font-heading font-bold mb-2">Atwijuka Joanah Irene</h3>
      <p className="text-foreground/80 mb-4">
        {/* Add your teammate's description here! */}
        Responsible for ensuring the online booking system runs smoothly.
      </p>
    </div>
  </div>
</motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground text-center mb-12">
                Our Journey
              </h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border lg:-translate-x-1/2" />

                {/* Timeline Items */}
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative flex items-center gap-6 ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                    >
                      {/* Dot */}
                      <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-accent lg:-translate-x-1/2 z-10" />

                      {/* Content */}
                      <div className={`ml-12 lg:ml-0 lg:w-[calc(50%-3rem)] ${
                        index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                      }`}>
                        <div className="glass-card p-6 rounded-2xl inline-block">
                          <div className="text-accent font-bold text-lg mb-1">
                            {milestone.year}
                          </div>
                          <h4 className="font-heading font-semibold text-foreground mb-2">
                            {milestone.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
