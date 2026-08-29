// ==========================================
// POLARIS - Shared Zod Validation Schemas
// ==========================================

import { z } from 'zod';

// ---- Auth ----

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
});

// ---- Expedition ----

export const expeditionCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  expeditionNumber: z.number().int().min(1),
  region: z.enum(['ARCTIC', 'ANTARCTIC', 'HIMALAYA', 'SOUTHERN_OCEAN']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  highlights: z.string().optional(),
  status: z.enum(['PLANNED', 'ONGOING', 'COMPLETED', 'ARCHIVED']),
  coverImage: z.string().url().optional().or(z.literal('')),
  locationIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

export const expeditionUpdateSchema = expeditionCreateSchema.partial();

// ---- Location ----

export const locationCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  region: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  type: z.enum(['STATION', 'RESEARCH_SITE', 'WAYPOINT', 'CITY']),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

// ---- Report ----

export const reportCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  type: z.enum(['SCIENTIFIC', 'TECHNICAL', 'EXPEDITION_SUMMARY', 'ENVIRONMENTAL']),
  content: z.string().optional(),
  fileUrl: z.string().url().optional().or(z.literal('')),
  year: z.number().int().min(1981).max(2100),
  expeditionId: z.string().min(1, 'Expedition is required'),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  tagIds: z.array(z.string()).optional(),
});

// ---- Publication ----

export const publicationCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500),
  authors: z.string().min(1, 'Authors are required'),
  journal: z.string().optional(),
  year: z.number().int().min(1981).max(2100),
  doi: z.string().optional(),
  abstract: z.string().optional(),
  fileUrl: z.string().url().optional().or(z.literal('')),
  expeditionId: z.string().min(1, 'Expedition is required'),
  tagIds: z.array(z.string()).optional(),
});

// ---- Dataset ----

export const datasetCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  format: z.enum(['CSV', 'NETCDF', 'GEOTIFF', 'JSON', 'OTHER']),
  source: z.string().optional(),
  year: z.number().int().min(1981).max(2100),
  description: z.string().optional(),
  fileUrl: z.string().url().optional().or(z.literal('')),
  expeditionId: z.string().min(1, 'Expedition is required'),
  region: z.string().min(1),
  tagIds: z.array(z.string()).optional(),
});

// ---- Media ----

export const mediaCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  type: z.enum(['PHOTO', 'VIDEO', 'DOCUMENT', 'INFOGRAPHIC']),
  fileUrl: z.string().min(1, 'File URL is required'),
  thumbnailUrl: z.string().optional(),
  caption: z.string().optional(),
  expeditionId: z.string().optional(),
  locationId: z.string().optional(),
  category: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
});

// ---- Tag ----

export const tagCreateSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(50),
  color: z.string().optional(),
});

// ---- Outreach ----

export const outreachCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  type: z.enum(['SOCIAL_POST', 'WEBSITE_ARTICLE', 'FACT_CARD', 'NEWSLETTER']),
  content: z.string().min(1, 'Content is required'),
  resourceId: z.string().min(1, 'Resource is required'),
  resourceType: z.string().min(1, 'Resource type is required'),
});

export const outreachGenerateSchema = z.object({
  resourceId: z.string().min(1, 'Resource is required'),
  resourceType: z.string().min(1, 'Resource type is required'),
  templateType: z.enum(['SOCIAL_POST', 'WEBSITE_ARTICLE', 'FACT_CARD', 'NEWSLETTER']),
  customNotes: z.string().optional(),
});

// ---- Search ----

export const searchQuerySchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  region: z.string().optional(),
  yearFrom: z.coerce.number().int().optional(),
  yearTo: z.coerce.number().int().optional(),
  researchArea: z.string().optional(),
  location: z.string().optional(),
  expedition: z.string().optional(),
  sort: z.enum(['relevance', 'newest', 'oldest', 'alphabetical']).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
});
