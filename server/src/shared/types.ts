// ==========================================
// POLARIS - Shared Type Definitions
// ==========================================

// ---- Auth & User ----

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'PUBLIC' | 'RESEARCHER' | 'EDUCATOR' | 'ADMIN';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// ---- Expedition ----

export interface Expedition {
  id: string;
  name: string;
  expeditionNumber: number;
  region: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights?: string;
  status: 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'ARCHIVED';
  coverImage?: string;
  locations: Location[];
  reports: Report[];
  publications: Publication[];
  datasets: Dataset[];
  media: Media[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface ExpeditionCreate {
  name: string;
  expeditionNumber: number;
  region: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights?: string;
  status: string;
  coverImage?: string;
  locationIds?: string[];
  tagIds?: string[];
}

// ---- Location ----

export interface Location {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  type: 'STATION' | 'RESEARCH_SITE' | 'WAYPOINT' | 'CITY';
  description?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface LocationCreate {
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  type: string;
  description?: string;
  imageUrl?: string;
}

// ---- Reports ----

export interface Report {
  id: string;
  title: string;
  type: 'SCIENTIFIC' | 'TECHNICAL' | 'EXPEDITION_SUMMARY' | 'ENVIRONMENTAL';
  content?: string;
  fileUrl?: string;
  year: number;
  expeditionId: string;
  expedition?: Expedition;
  status: 'DRAFT' | 'PUBLISHED';
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface ReportCreate {
  title: string;
  type: string;
  content?: string;
  fileUrl?: string;
  year: number;
  expeditionId: string;
  status?: string;
  tagIds?: string[];
}

// ---- Publications ----

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal?: string;
  year: number;
  doi?: string;
  abstract?: string;
  fileUrl?: string;
  expeditionId: string;
  expedition?: Expedition;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface PublicationCreate {
  title: string;
  authors: string;
  journal?: string;
  year: number;
  doi?: string;
  abstract?: string;
  fileUrl?: string;
  expeditionId: string;
  tagIds?: string[];
}

// ---- Datasets ----

export interface Dataset {
  id: string;
  title: string;
  format: 'CSV' | 'NETCDF' | 'GEOTIFF' | 'JSON' | 'OTHER';
  source?: string;
  year: number;
  description?: string;
  fileUrl?: string;
  expeditionId: string;
  expedition?: Expedition;
  region: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface DatasetCreate {
  title: string;
  format: string;
  source?: string;
  year: number;
  description?: string;
  fileUrl?: string;
  expeditionId: string;
  region: string;
  tagIds?: string[];
}

// ---- Media ----

export interface Media {
  id: string;
  title: string;
  type: 'PHOTO' | 'VIDEO' | 'DOCUMENT' | 'INFOGRAPHIC';
  fileUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  expeditionId?: string;
  expedition?: Expedition;
  locationId?: string;
  location?: Location;
  category?: string;
  tags: Tag[];
  createdAt: string;
}

export interface MediaCreate {
  title: string;
  type: string;
  fileUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  expeditionId?: string;
  locationId?: string;
  category?: string;
  tagIds?: string[];
}

// ---- Tags ----

export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface TagCreate {
  name: string;
  color?: string;
}

// ---- Outreach Content ----

export interface OutreachContent {
  id: string;
  title: string;
  type: 'SOCIAL_POST' | 'WEBSITE_ARTICLE' | 'FACT_CARD' | 'NEWSLETTER';
  content: string;
  resourceId: string;
  resourceType: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'PUBLISHED';
  createdBy: string;
  creator?: User;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OutreachCreate {
  title: string;
  type: string;
  content: string;
  resourceId: string;
  resourceType: string;
}

export interface OutreachGenerateRequest {
  resourceId: string;
  resourceType: string;
  templateType: string;
  customNotes?: string;
}

// ---- Institutional Activity ----

export interface InstitutionalActivity {
  id: string;
  title: string;
  date: string;
  description: string;
  type: string;
  expeditionId?: string;
  expedition?: Expedition;
  mediaId?: string;
  tags: Tag[];
  createdAt: string;
}

// ---- Education ----

export interface EducationalResource {
  id: string;
  title: string;
  content: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  expeditionId?: string;
  expedition?: Expedition;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

// ---- Search ----

export interface SearchResult {
  id: string;
  title: string;
  type: string;
  description?: string;
  thumbnail?: string;
  region?: string;
  year?: number;
  expeditionId?: string;
  score: number;
}

export interface SearchFilters {
  query?: string;
  type?: string;
  region?: string;
  yearFrom?: number;
  yearTo?: number;
  researchArea?: string;
  location?: string;
  expedition?: string;
  sort?: 'relevance' | 'newest' | 'oldest' | 'alphabetical';
  page?: number;
  limit?: number;
}

// ---- API Responses ----

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiStats {
  expeditions: number;
  publications: number;
  datasets: number;
  reports: number;
  media: number;
  locations: number;
  users: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ---- Stats for charts ----

export interface YearlyStats {
  year: number;
  count: number;
}

export interface RegionStats {
  region: string;
  count: number;
}

export interface TypeStats {
  type: string;
  count: number;
}
