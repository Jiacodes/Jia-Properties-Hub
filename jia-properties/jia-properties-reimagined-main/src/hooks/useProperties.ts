import { useState, useEffect, useCallback } from 'react';
import { Property, SearchFilters, fetchProperties, searchProperties, fetchFeaturedProperties } from '@/api/properties';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties();
        setProperties(data);
        setError(null);
      } catch (err) {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const search = useCallback(async (filters: SearchFilters) => {
    try {
      setLoading(true);
      const results = await searchProperties(filters);
      setProperties(results);
      setError(null);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProperties();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError('Failed to reset properties');
    } finally {
      setLoading(false);
    }
  }, []);

  return { properties, loading, error, search, reset };
};

export const useFeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedProperties();
        setProperties(data);
        setError(null);
      } catch (err) {
        setError('Failed to load featured properties');
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return { properties, loading, error };
};
