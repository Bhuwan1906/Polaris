import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

// ---- Stats ----
export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await api.get('/stats/overview');
      return data.data;
    },
  });
}

// ---- Expeditions ----
export function useExpeditions(params?: { region?: string; status?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['expeditions', params],
    queryFn: async () => {
      const { data } = await api.get('/expeditions', { params });
      return data;
    },
  });
}

export function useExpedition(id: string) {
  return useQuery({
    queryKey: ['expedition', id],
    queryFn: async () => {
      const { data } = await api.get(`/expeditions/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useFeaturedExpeditions() {
  return useQuery({
    queryKey: ['featuredExpeditions'],
    queryFn: async () => {
      const { data } = await api.get('/expeditions/featured');
      return data.data;
    },
  });
}

// ---- Publications ----
export function usePublications(params?: { expeditionId?: string; year?: number; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['publications', params],
    queryFn: async () => {
      const { data } = await api.get('/publications', { params });
      return data;
    },
  });
}

export function usePublication(id: string) {
  return useQuery({
    queryKey: ['publication', id],
    queryFn: async () => {
      const { data } = await api.get(`/publications/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useLatestPublications() {
  return useQuery({
    queryKey: ['latestPublications'],
    queryFn: async () => {
      const { data } = await api.get('/publications/latest');
      return data.data;
    },
  });
}

// ---- Datasets ----
export function useDatasets(params?: { expeditionId?: string; region?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['datasets', params],
    queryFn: async () => {
      const { data } = await api.get('/datasets', { params });
      return data;
    },
  });
}

export function useDataset(id: string) {
  return useQuery({
    queryKey: ['dataset', id],
    queryFn: async () => {
      const { data } = await api.get(`/datasets/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

// ---- Media ----
export function useMedia(params?: { type?: string; expeditionId?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['media', params],
    queryFn: async () => {
      const { data } = await api.get('/media', { params });
      return data;
    },
  });
}

// ---- Search ----
export function useSearch(params: Record<string, any>) {
  return useQuery({
    queryKey: ['search', params],
    queryFn: async () => {
      const { data } = await api.get('/search', { params });
      return data;
    },
    enabled: true,
  });
}

// ---- Locations ----
export function useLocations(params?: { region?: string; type?: string }) {
  return useQuery({
    queryKey: ['locations', params],
    queryFn: async () => {
      const { data } = await api.get('/locations', { params });
      return data.data;
    },
  });
}

// ---- Tags ----
export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await api.get('/tags');
      return data.data;
    },
  });
}

// ---- Education ----
export function useEducationResources() {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const { data } = await api.get('/search', { params: { type: 'educational' } });
      return data.data;
    },
  });
}

// ---- Reports ----
export function useReports(params?: { expeditionId?: string; type?: string; page?: number }) {
  return useQuery({
    queryKey: ['reports', params],
    queryFn: async () => {
      const { data } = await api.get('/reports', { params });
      return data;
    },
  });
}
