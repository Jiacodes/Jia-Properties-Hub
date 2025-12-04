import faqData from '@/data/faq.json';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const fetchFAQs = async (): Promise<FAQ[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return faqData as FAQ[];
};

export const searchFAQs = async (query: string): Promise<FAQ[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (!query.trim()) {
    return faqData as FAQ[];
  }
  
  const lowerQuery = query.toLowerCase();
  return (faqData as FAQ[]).filter(faq => 
    faq.question.toLowerCase().includes(lowerQuery) ||
    faq.answer.toLowerCase().includes(lowerQuery)
  );
};

export const getFAQCategories = (): string[] => {
  const categories = (faqData as FAQ[]).map(f => f.category);
  return [...new Set(categories)];
};
