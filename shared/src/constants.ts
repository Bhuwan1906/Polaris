// ==========================================
// POLARIS - Shared Constants
// ==========================================

// User Roles
export const ROLES = {
  PUBLIC: 'PUBLIC',
  RESEARCHER: 'RESEARCHER',
  EDUCATOR: 'EDUCATOR',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = keyof typeof ROLES;

// Expedition Regions
export const REGIONS = {
  ARCTIC: 'ARCTIC',
  ANTARCTIC: 'ANTARCTIC',
  HIMALAYA: 'HIMALAYA',
  SOUTHERN_OCEAN: 'SOUTHERN_OCEAN',
} as const;

export const REGION_LABELS: Record<string, string> = {
  ARCTIC: 'Arctic',
  ANTARCTIC: 'Antarctic',
  HIMALAYA: 'Himalaya',
  SOUTHERN_OCEAN: 'Southern Ocean',
};

export const REGION_COLORS: Record<string, string> = {
  ARCTIC: '#4FC3F7',
  ANTARCTIC: '#81D4FA',
  HIMALAYA: '#80CBC4',
  SOUTHERN_OCEAN: '#29B6F6',
};

// Expedition Status
export const EXPEDITION_STATUS = {
  PLANNED: 'PLANNED',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
} as const;

export const STATUS_LABELS: Record<string, string> = {
  PLANNED: 'Planned',
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
};

// Content Status
export const CONTENT_STATUS = {
  DRAFT: 'DRAFT',
  REVIEW: 'REVIEW',
  APPROVED: 'APPROVED',
  PUBLISHED: 'PUBLISHED',
} as const;

export const CONTENT_STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Draft',
  REVIEW: 'In Review',
  APPROVED: 'Approved',
  PUBLISHED: 'Published',
};

// Media Types
export const MEDIA_TYPES = {
  PHOTO: 'PHOTO',
  VIDEO: 'VIDEO',
  DOCUMENT: 'DOCUMENT',
  INFOGRAPHIC: 'INFOGRAPHIC',
} as const;

export const MEDIA_TYPE_LABELS: Record<string, string> = {
  PHOTO: 'Photograph',
  VIDEO: 'Video',
  DOCUMENT: 'Document',
  INFOGRAPHIC: 'Infographic',
};

// Report Types
export const REPORT_TYPES = {
  SCIENTIFIC: 'SCIENTIFIC',
  TECHNICAL: 'TECHNICAL',
  EXPEDITION_SUMMARY: 'EXPEDITION_SUMMARY',
  ENVIRONMENTAL: 'ENVIRONMENTAL',
} as const;

export const REPORT_TYPE_LABELS: Record<string, string> = {
  SCIENTIFIC: 'Scientific Report',
  TECHNICAL: 'Technical Report',
  EXPEDITION_SUMMARY: 'Expedition Summary',
  ENVIRONMENTAL: 'Environmental Report',
};

// Dataset Formats
export const DATASET_FORMATS = {
  CSV: 'CSV',
  NETCDF: 'NETCDF',
  GEOTIFF: 'GEOTIFF',
  JSON: 'JSON',
  OTHER: 'OTHER',
} as const;

// Outreach Content Types
export const OUTREACH_TYPES = {
  SOCIAL_POST: 'SOCIAL_POST',
  WEBSITE_ARTICLE: 'WEBSITE_ARTICLE',
  FACT_CARD: 'FACT_CARD',
  NEWSLETTER: 'NEWSLETTER',
} as const;

export const OUTREACH_TYPE_LABELS: Record<string, string> = {
  SOCIAL_POST: 'Social Media Post',
  WEBSITE_ARTICLE: 'Website Article',
  FACT_CARD: 'Fact Card',
  NEWSLETTER: 'Newsletter',
};

// Research Areas
export const RESEARCH_AREAS = [
  'Glaciology',
  'Atmospheric Science',
  'Oceanography',
  'Geology',
  'Marine Biology',
  'Ecology',
  'Climate Change',
  'Geophysics',
  'Paleoclimatology',
  'Polar Medicine',
  'Space Weather',
  'Cryosphere Studies',
  'Biodiversity',
  'Microbiology',
] as const;

// Location Types
export const LOCATION_TYPES = {
  STATION: 'STATION',
  RESEARCH_SITE: 'RESEARCH_SITE',
  WAYPOINT: 'WAYPOINT',
  CITY: 'CITY',
} as const;

// Activity Types
export const ACTIVITY_TYPES = {
  WORKSHOP: 'WORKSHOP',
  CONFERENCE: 'CONFERENCE',
  COLLABORATION: 'COLLABORATION',
  TRAINING: 'TRAINING',
  PUBLIC_OUTREACH: 'PUBLIC_OUTREACH',
} as const;

export const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  WORKSHOP: 'Workshop',
  CONFERENCE: 'Conference',
  COLLABORATION: 'Collaboration',
  TRAINING: 'Training Program',
  PUBLIC_OUTREACH: 'Public Outreach',
};

// Education Categories
export const EDUCATION_CATEGORIES = {
  INTRODUCTION: 'INTRODUCTION',
  STATIONS: 'STATIONS',
  EXPEDITIONS: 'EXPEDITIONS',
  RESEARCH: 'RESEARCH',
  FACTS: 'FACTS',
  GLOSSARY: 'GLOSSARY',
} as const;

export const EDUCATION_CATEGORY_LABELS: Record<string, string> = {
  INTRODUCTION: 'Introduction to Polar Science',
  STATIONS: 'Research Stations',
  EXPEDITIONS: 'Indian Expeditions',
  RESEARCH: 'Research Topics',
  FACTS: 'Interesting Facts',
  GLOSSARY: 'Glossary',
};

// Pagination defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 12;
export const MAX_LIMIT = 50;

// Search
export const SEARCH_MIN_LENGTH = 2;
export const SEARCH_DEBOUNCE_MS = 300;
