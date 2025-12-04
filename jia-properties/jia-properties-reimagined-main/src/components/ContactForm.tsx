import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPropertyTypes } from '@/api/properties';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const propertyTypes = getPropertyTypes();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (validate()) {
    // POST data to Formspree
    try {
      const response = await fetch('https://formspree.io/f/xeoyzqjy', { // ← replace with your endpoint!
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            property: '',
            message: '',
          });
        }, 3000);
      } else {
        alert("There was an error sending your message. Please try again later.");
      }
    } catch (err) {
      alert("There was an error sending your message. Please try again later.");
    }
  }
};

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-3xl p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-green-500" />
        </motion.div>
        <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Contact Info Cards */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card-hover p-6 rounded-2xl"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">Phone</h3>
          <a
            href="tel:+256707872933"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            +256 707872933
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card-hover p-6 rounded-2xl"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">Email</h3>
          <a
            href="mailto:info@jiapropertieshub.com"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            jiapropertieshub@gmail.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card-hover p-6 rounded-2xl"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">Address</h3>
          <p className="text-muted-foreground">
            Noor Emporium, 2nd floor<br />
            Kampala, Uganda
          </p>
        </motion.div>
      </div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="lg:col-span-2 glass-card rounded-3xl p-8 space-y-6"
      >
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
              Full Name *
            </label>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={cn(
                "w-full h-12 px-4 rounded-xl bg-secondary/50 border",
                "text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-accent",
                errors.name ? 'border-destructive' : 'border-border'
              )}
              placeholder="John Doe"
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
              Email *
            </label>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={cn(
                "w-full h-12 px-4 rounded-xl bg-secondary/50 border",
                "text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-accent",
                errors.email ? 'border-destructive' : 'border-border'
              )}
              placeholder="john@example.com"
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="contact-phone" className="text-sm font-medium text-foreground">
              Phone Number *
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={cn(
                "w-full h-12 px-4 rounded-xl bg-secondary/50 border",
                "text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-accent",
                errors.phone ? 'border-destructive' : 'border-border'
              )}
              placeholder="+256 700 123 456"
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-sm text-destructive" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Property Interest */}
          <div className="space-y-2">
            <label htmlFor="contact-property" className="text-sm font-medium text-foreground">
              Property of Interest
            </label>
            <select
              id="contact-property"
              value={formData.property}
              onChange={(e) => setFormData({ ...formData, property: e.target.value })}
              className={cn(
                "w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border",
                "text-foreground appearance-none cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-accent"
              )}
            >
              <option value="">Select a property type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
            Message *
          </label>
          <textarea
            id="contact-message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className={cn(
              "w-full px-4 py-3 rounded-xl bg-secondary/50 border",
              "text-foreground placeholder:text-muted-foreground resize-none",
              "focus:outline-none focus:ring-2 focus:ring-accent",
              errors.message ? 'border-destructive' : 'border-border'
            )}
            placeholder="How can we help you?"
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-destructive" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-accent w-full sm:w-auto h-14 px-8 flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          <span className="font-semibold">Send Message</span>
        </button>
      </motion.form>
    </div>
  );
};
