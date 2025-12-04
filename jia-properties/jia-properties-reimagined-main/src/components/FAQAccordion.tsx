import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQ, searchFAQs, fetchFAQs } from '@/api/faq';
import { useEffect } from 'react';

interface AccordionItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const AccordionItem = ({ faq, isOpen, onToggle, index }: AccordionItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-border last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span className="font-medium text-foreground group-hover:text-accent transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180 text-accent'
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQAccordion = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFaqs = async () => {
      const data = await fetchFAQs();
      setFaqs(data);
      setLoading(false);
    };
    loadFaqs();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim()) {
        const results = await searchFAQs(searchQuery);
        setFaqs(results);
      } else {
        const data = await fetchFAQs();
        setFaqs(data);
      }
    };
    performSearch();
  }, [searchQuery]);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Search Input */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search frequently asked questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            "w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border",
            "text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
            "transition-all duration-200"
          )}
          aria-label="Search FAQs"
        />
      </div>

      {/* FAQ List */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading FAQs...
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No FAQs found matching your search.
          </div>
        ) : (
          faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};
