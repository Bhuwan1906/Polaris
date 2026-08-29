// ==========================================
// POLARIS - Seed Script
// Demo data based on publicly available information
// about India's polar research programme
// ==========================================

import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🧊 Seeding POLARIS database...\n');

  // Clear existing data
  await prisma.educationTag.deleteMany();
  await prisma.activityTag.deleteMany();
  await prisma.mediaTag.deleteMany();
  await prisma.datasetTag.deleteMany();
  await prisma.publicationTag.deleteMany();
  await prisma.reportTag.deleteMany();
  await prisma.locationExpedition.deleteMany();
  await prisma.outreachContent.deleteMany();
  await prisma.educationalResource.deleteMany();
  await prisma.institutionalActivity.deleteMany();
  await prisma.media.deleteMany();
  await prisma.dataset.deleteMany();
  await prisma.publication.deleteMany();
  await prisma.report.deleteMany();
  await prisma.expedition.deleteMany();
  await prisma.location.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  // ---- Create Users ----
  console.log('👤 Creating users...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@polaris.gov.in',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  const researcher = await prisma.user.create({
    data: {
      email: 'researcher@polaris.gov.in',
      password: userPassword,
      name: 'Dr. Priya Sharma',
      role: 'RESEARCHER',
    },
  });

  const educator = await prisma.user.create({
    data: {
      email: 'educator@polaris.gov.in',
      password: userPassword,
      name: 'Prof. Ananya Das',
      role: 'EDUCATOR',
    },
  });

  const publicUser = await prisma.user.create({
    data: {
      email: 'user@polaris.gov.in',
      password: userPassword,
      name: 'Ravi Kumar',
      role: 'PUBLIC',
    },
  });

  console.log('  ✅ Created 4 users (admin, researcher, educator, public)\n');

  // ---- Create Tags ----
  console.log('🏷️ Creating tags...');

  const tagData = [
    { name: 'Climate Change', color: '#EF4444' },
    { name: 'Glaciology', color: '#3B82F6' },
    { name: 'Oceanography', color: '#06B6D4' },
    { name: 'Atmospheric Science', color: '#8B5CF6' },
    { name: 'Geology', color: '#F59E0B' },
    { name: 'Biology', color: '#10B981' },
    { name: 'Marine Ecology', color: '#14B8A6' },
    { name: 'Paleoclimatology', color: '#F97316' },
    { name: 'Cryosphere', color: '#60A5FA' },
    { name: 'Biodiversity', color: '#22C55E' },
    { name: 'Space Weather', color: '#A855F7' },
    { name: 'Geophysics', color: '#D946EF' },
    { name: 'Microbiology', color: '#84CC16' },
    { name: 'Environmental Monitoring', color: '#2DD4BF' },
  ];

  const tags: Record<string, any> = {};
  for (const t of tagData) {
    tags[t.name] = await prisma.tag.create({ data: t });
  }
  console.log(`  ✅ Created ${tagData.length} tags\n`);

  // ---- Create Locations ----
  console.log('📍 Creating locations...');

  const locations: Record<string, any> = {};

  locations.dakshinGangotri = await prisma.location.create({
    data: {
      name: 'Dakshin Gangotri',
      region: 'ANTARCTIC',
      latitude: -70.75,
      longitude: 11.73,
      type: 'STATION',
      description:
        "India's first permanent research station in Antarctica, established in 1983. Decommissioned in 1990 after becoming buried under ice. Now serves as a historical site and supply base.",
    },
  });

  locations.maitri = await prisma.location.create({
    data: {
      name: 'Maitri',
      region: 'ANTARCTIC',
      latitude: -70.7667,
      longitude: 11.7319,
      type: 'STATION',
      description:
        "India's second Antarctic research station, established in 1989 on the Schirmacher Oasis. Conducts experiments in geology, geography, and medicine. Named after the Sanskrit word for friendship.",
    },
  });

  locations.bharati = await prisma.location.create({
    data: {
      name: 'Bharati',
      region: 'ANTARCTIC',
      latitude: -69.408,
      longitude: 76.1874,
      type: 'STATION',
      description:
        "India's newest and third Antarctic research station, commissioned in 2012 beside the Larsemann Hills. Built from 134 shipping containers. Focuses on oceanographic and geological research.",
    },
  });

  locations.himadri = await prisma.location.create({
    data: {
      name: 'Himadri',
      region: 'ARCTIC',
      latitude: 78.917,
      longitude: 11.933,
      type: 'STATION',
      description:
        "India's first permanent Arctic research station, inaugurated in 2008 at Ny-Ålesund, Svalbard, Norway. Named after the Himalayan range. 1,200 km from the North Pole.",
    },
  });

  locations.mumbai = await prisma.location.create({
    data: {
      name: 'Mumbai',
      region: 'ANTARCTIC',
      latitude: 19.076,
      longitude: 72.8777,
      type: 'CITY',
      description: 'Departure point for Indian Antarctic expeditions.',
    },
  });

  locations.capeTown = await prisma.location.create({
    data: {
      name: 'Cape Town',
      region: 'ANTARCTIC',
      latitude: -33.9249,
      longitude: 18.4241,
      type: 'CITY',
      description: 'Transit point for Indian Antarctic expeditions, South Africa.',
    },
  });

  locations.goa = await prisma.location.create({
    data: {
      name: 'NCPOR, Goa',
      region: 'ANTARCTIC',
      latitude: 15.38,
      longitude: 73.83,
      type: 'CITY',
      description:
        'Headquarters of the National Centre for Polar and Ocean Research (NCPOR) in Vasco da Gama, Goa.',
    },
  });

  locations.prydzBay = await prisma.location.create({
    data: {
      name: 'Prydz Bay',
      region: 'ANTARCTIC',
      latitude: -69.0,
      longitude: 75.0,
      type: 'RESEARCH_SITE',
      description: 'Research area near Bharati station, focus of multi-institutional oceanographic studies.',
    },
  });

  locations.schirmacher = await prisma.location.create({
    data: {
      name: 'Schirmacher Oasis',
      region: 'ANTARCTIC',
      latitude: -70.75,
      longitude: 11.8,
      type: 'RESEARCH_SITE',
      description: 'Antarctic oasis where Maitri station is located, featuring a freshwater lake system.',
    },
  });

  locations.kongsfjorden = await prisma.location.create({
    data: {
      name: 'Kongsfjorden',
      region: 'ARCTIC',
      latitude: 78.9,
      longitude: 11.9,
      type: 'RESEARCH_SITE',
      description: 'Arctic fjord near Himadri station. Site of IndARC underwater observatory.',
    },
  });

  locations.nyAlesund = await prisma.location.create({
    data: {
      name: 'Ny-Ålesund',
      region: 'ARCTIC',
      latitude: 78.92,
      longitude: 11.93,
      type: 'CITY',
      description: 'International Arctic research settlement in Svalbard, Norway. Home to Himadri station.',
    },
  });

  console.log(`  ✅ Created ${Object.keys(locations).length} locations\n`);

  // ---- Create Expeditions ----
  console.log('🚀 Creating expeditions...');

  const expeditions: Record<string, any> = {};

  expeditions.isea1 = await prisma.expedition.create({
    data: {
      name: '1st Indian Scientific Expedition to Antarctica',
      expeditionNumber: 1,
      region: 'ANTARCTIC',
      startDate: new Date('1981-12-10'),
      endDate: new Date('1982-03-20'),
      description:
        'The first Indian expedition to Antarctica, code-named "Operation Gangotri". A 21-member team led the historic journey, marking India\'s entry into Antarctic research. The expedition laid the foundation for India\'s polar research programme.',
      highlights:
        'First Indian flag unfurled in Antarctica. Established India\'s presence in polar research. Collected geological and biological samples.',
      status: 'COMPLETED',
      coverImage: '/images/expeditions/isea-01.jpg',
    },
  });

  expeditions.isea4 = await prisma.expedition.create({
    data: {
      name: '4th Indian Scientific Expedition to Antarctica',
      expeditionNumber: 4,
      region: 'ANTARCTIC',
      startDate: new Date('1984-11-15'),
      endDate: new Date('1985-03-25'),
      description:
        'This expedition led to the establishment of India\'s first permanent research station, Dakshin Gangotri, at 70°45\'S, 11°44\'E. The station was built and became operational, marking a milestone in India\'s Antarctic programme.',
      highlights:
        'Construction of Dakshin Gangotri station. India signed the Antarctic Treaty in 1983. Became the 15th Consultative Member.',
      status: 'COMPLETED',
    },
  });

  expeditions.isea15 = await prisma.expedition.create({
    data: {
      name: '15th Indian Scientific Expedition to Antarctica',
      expeditionNumber: 15,
      region: 'ANTARCTIC',
      startDate: new Date('1995-11-20'),
      endDate: new Date('1996-03-28'),
      description:
        'Major expedition focused on geoscience and atmospheric studies. Research conducted at Maitri station included geological mapping, seismological observations, and atmospheric monitoring.',
      highlights:
        'Expanded geological mapping around Schirmacher Oasis. Atmospheric monitoring experiments. Multi-institutional collaboration.',
      status: 'COMPLETED',
    },
  });

  expeditions.isea30 = await prisma.expedition.create({
    data: {
      name: '30th Indian Scientific Expedition to Antarctica',
      expeditionNumber: 30,
      region: 'ANTARCTIC',
      startDate: new Date('2010-11-18'),
      endDate: new Date('2011-04-05'),
      description:
        'Conducted comprehensive studies in atmospheric sciences, glaciology, and marine biology. Research included ice core analysis and Southern Ocean biodiversity surveys.',
      highlights:
        'Ice core drilling operations. Southern Ocean biodiversity documentation. Climate data collection.',
      status: 'COMPLETED',
    },
  });

  expeditions.isea42 = await prisma.expedition.create({
    data: {
      name: '42nd Indian Scientific Expedition to Antarctica',
      expeditionNumber: 42,
      region: 'ANTARCTIC',
      startDate: new Date('2022-11-05'),
      endDate: new Date('2023-04-10'),
      description:
        'Conducted multidisciplinary research focusing on climate change signatures in the Antarctic region. Studies included atmospheric chemistry, glacial dynamics, and marine ecosystem monitoring.',
      highlights:
        'Climate change impact assessment. Bharati and Maitri station operations. International collaboration with multiple Antarctic programmes.',
      status: 'COMPLETED',
    },
  });

  expeditions.isea44 = await prisma.expedition.create({
    data: {
      name: '44th Indian Scientific Expedition to Antarctica',
      expeditionNumber: 44,
      region: 'ANTARCTIC',
      startDate: new Date('2024-10-25'),
      endDate: new Date('2025-04-15'),
      description:
        'The 44th ISEA focuses on "Climate Change and its signatures in the Polar Regions". Research activities at Bharati and Maitri stations include atmospheric science, oceanography, glaciology, and biological sciences.',
      highlights:
        'Focus on climate change signatures. Multi-institutional research teams. Amery Ice Shelf/Lambert Glacier studies.',
      status: 'COMPLETED',
    },
  });

  expeditions.isea45 = await prisma.expedition.create({
    data: {
      name: '45th Indian Scientific Expedition to Antarctica',
      expeditionNumber: 45,
      region: 'ANTARCTIC',
      startDate: new Date('2025-10-31'),
      endDate: new Date('2026-04-01'),
      description:
        "India's ongoing 45th Antarctic expedition. Summer and winter-over teams conducting year-round scientific observations at Maitri and Bharati stations.",
      highlights: 'Continuing polar research legacy. Year-round station operations. New research projects.',
      status: 'ONGOING',
    },
  });

  expeditions.iae1 = await prisma.expedition.create({
    data: {
      name: '1st Indian Arctic Expedition',
      expeditionNumber: 1,
      region: 'ARCTIC',
      startDate: new Date('2007-07-01'),
      endDate: new Date('2007-09-30'),
      description:
        "India's first Arctic expedition. Scientists from multiple institutions conducted atmospheric, glaciological, and marine studies in the Svalbard region.",
      highlights:
        "India's entry into Arctic research. Collaborative international research. Atmospheric science studies.",
      status: 'COMPLETED',
    },
  });

  expeditions.iae2 = await prisma.expedition.create({
    data: {
      name: '2nd Indian Arctic Expedition',
      expeditionNumber: 2,
      region: 'ARCTIC',
      startDate: new Date('2008-06-15'),
      endDate: new Date('2008-09-20'),
      description:
        'Established Himadri, India\'s first permanent Arctic research station, at Ny-Ålesund, Svalbard. The station was inaugurated on 1st July 2008 by the Minister of Earth Sciences.',
      highlights:
        'Inauguration of Himadri station. Long-term Arctic monitoring initiated. International collaboration at Ny-Ålesund.',
      status: 'COMPLETED',
    },
  });

  expeditions.iae14 = await prisma.expedition.create({
    data: {
      name: '14th Indian Arctic Expedition',
      expeditionNumber: 14,
      region: 'ARCTIC',
      startDate: new Date('2023-07-15'),
      endDate: new Date('2023-10-20'),
      description:
        'Advanced research in atmospheric sciences, space weather, and fjord dynamics at Himadri station. Deployed IndARC underwater observatory systems.',
      highlights:
        'IndARC observatory deployment. Kongsfjorden dynamics study. Space weather monitoring.',
      status: 'COMPLETED',
    },
  });

  expeditions.iae16 = await prisma.expedition.create({
    data: {
      name: '16th Indian Arctic Expedition',
      expeditionNumber: 16,
      region: 'ARCTIC',
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-10-30'),
      description:
        'Scheduled Indian Arctic expedition to Himadri station. Research areas include atmospheric science, marine biology, and polar governance studies.',
      highlights: 'Upcoming research activities. New instrument deployments.',
      status: 'PLANNED',
    },
  });

  const expeditionCount = Object.keys(expeditions).length;
  console.log(`  ✅ Created ${expeditionCount} expeditions\n`);

  // ---- Assign locations to expeditions ----
  console.log('🔗 Linking expeditions to locations...');

  const expeditionLocationLinks = [
    { expeditionId: expeditions.isea1.id, locationId: locations.mumbai.id },
    { expeditionId: expeditions.isea1.id, locationId: locations.capeTown.id },
    { expeditionId: expeditions.isea4.id, locationId: locations.dakshinGangotri.id },
    { expeditionId: expeditions.isea15.id, locationId: locations.maitri.id },
    { expeditionId: expeditions.isea15.id, locationId: locations.schirmacher.id },
    { expeditionId: expeditions.isea30.id, locationId: locations.maitri.id },
    { expeditionId: expeditions.isea42.id, locationId: locations.maitri.id },
    { expeditionId: expeditions.isea42.id, locationId: locations.bharati.id },
    { expeditionId: expeditions.isea42.id, locationId: locations.prydzBay.id },
    { expeditionId: expeditions.isea44.id, locationId: locations.bharati.id },
    { expeditionId: expeditions.isea44.id, locationId: locations.maitri.id },
    { expeditionId: expeditions.isea44.id, locationId: locations.prydzBay.id },
    { expeditionId: expeditions.isea45.id, locationId: locations.maitri.id },
    { expeditionId: expeditions.isea45.id, locationId: locations.bharati.id },
    { expeditionId: expeditions.iae1.id, locationId: locations.nyAlesund.id },
    { expeditionId: expeditions.iae1.id, locationId: locations.kongsfjorden.id },
    { expeditionId: expeditions.iae2.id, locationId: locations.himadri.id },
    { expeditionId: expeditions.iae2.id, locationId: locations.nyAlesund.id },
    { expeditionId: expeditions.iae14.id, locationId: locations.himadri.id },
    { expeditionId: expeditions.iae14.id, locationId: locations.kongsfjorden.id },
    { expeditionId: expeditions.iae16.id, locationId: locations.himadri.id },
  ];

  await prisma.locationExpedition.createMany({ data: expeditionLocationLinks });
  console.log(`  ✅ Created ${expeditionLocationLinks.length} location-expedition links\n`);

  // ---- Create Reports ----
  console.log('📄 Creating reports...');

  const reportData = [
    {
      title: '[DEMO] Scientific Report: 1st ISEA - Operation Gangotri',
      type: 'EXPEDITION_SUMMARY' as const,
      content:
        'Comprehensive report of the first Indian Scientific Expedition to Antarctica. Documents the journey, establishment of initial research camps, geological surveys, and biological observations.',
      year: 1982,
      expeditionId: expeditions.isea1.id,
      status: 'PUBLISHED' as const,
    },
    {
      title: '[DEMO] Atmospheric Observations from Maitri Station',
      type: 'SCIENTIFIC' as const,
      content:
        'Analysis of atmospheric data collected at Maitri station over multiple seasons. Includes temperature profiles, wind patterns, and aerosol measurements.',
      year: 1996,
      expeditionId: expeditions.isea15.id,
      status: 'PUBLISHED' as const,
    },
    {
      title: '[DEMO] Geological Survey of Schirmacher Oasis',
      type: 'SCIENTIFIC' as const,
      content:
        'Detailed geological mapping and mineral analysis of the Schirmacher Oasis region near Maitri station.',
      year: 1997,
      expeditionId: expeditions.isea15.id,
      status: 'PUBLISHED' as const,
    },
    {
      title: '[DEMO] Southern Ocean Biodiversity Assessment 2010-11',
      type: 'SCIENTIFIC' as const,
      content:
        'Survey of marine biodiversity in the Southern Ocean, documenting species diversity and ecosystem health indicators.',
      year: 2011,
      expeditionId: expeditions.isea30.id,
      status: 'PUBLISHED' as const,
    },
    {
      title: '[DEMO] Climate Change Signatures in Antarctic Ice Cores',
      type: 'SCIENTIFIC' as const,
      content:
        'Analysis of ice core samples from the Antarctic region providing evidence of climate change patterns over the past several decades.',
      year: 2023,
      expeditionId: expeditions.isea42.id,
      status: 'PUBLISHED' as const,
    },
    {
      title: '[DEMO] Environmental Impact Assessment - Bharati Station Operations',
      type: 'ENVIRONMENTAL' as const,
      content:
        'Assessment of environmental impact of station operations and research activities at Bharati research station.',
      year: 2023,
      expeditionId: expeditions.isea42.id,
      status: 'PUBLISHED' as const,
    },
    {
      title: '[DEMO] 44-ISEA Expedition Summary Report',
      type: 'EXPEDITION_SUMMARY' as const,
      content:
        'Summary of the 44th Indian Scientific Expedition to Antarctica focusing on climate change research at Bharati and Maitri stations.',
      year: 2025,
      expeditionId: expeditions.isea44.id,
      status: 'PUBLISHED' as const,
    },
    {
      title: '[DEMO] Kongsfjorden Fjord Dynamics Study',
      type: 'SCIENTIFIC' as const,
      content:
        'Monitoring data and analysis of Kongsfjorden fjord dynamics near Himadri station, including water temperature, salinity, and ice coverage.',
      year: 2023,
      expeditionId: expeditions.iae14.id,
      status: 'PUBLISHED' as const,
    },
    {
      title: '[DEMO] Technical Report: IndARC Observatory Deployment',
      type: 'TECHNICAL' as const,
      content:
        'Technical documentation for the design, deployment, and operation of the IndARC underwater observatory in Kongsfjorden.',
      year: 2024,
      expeditionId: expeditions.iae14.id,
      status: 'PUBLISHED' as const,
    },
    {
      title: '[DEMO] 45-ISEA Winter-Over Operations Report',
      type: 'EXPEDITION_SUMMARY' as const,
      content:
        'Preliminary operations report for the winter-over component of the 45th Indian Scientific Expedition to Antarctica.',
      year: 2026,
      expeditionId: expeditions.isea45.id,
      status: 'DRAFT' as const,
    },
  ];

  const createdReports = await Promise.all(
    reportData.map((r) => prisma.report.create({ data: r }))
  );
  console.log(`  ✅ Created ${createdReports.length} reports\n`);

  // ---- Create Publications ----
  console.log('📚 Creating publications...');

  const pubData = [
    {
      title: '[DEMO] Indian Antarctic Programme: Four Decades of Polar Research',
      authors: 'Rajesh, K.M., Sharma, P., Gupta, A.K.',
      journal: 'Polar Science',
      year: 2021,
      doi: '10.1016/j.polar.2021.001',
      abstract:
        'A comprehensive review of India\'s Antarctic research activities over four decades, covering scientific achievements, station operations, and contributions to global polar science.',
      expeditionId: expeditions.isea42.id,
    },
    {
      title: '[DEMO] Climate Change Indicators from Antarctic Ice Core Analysis',
      authors: 'Sharma, P., Mehta, R., Nair, S.',
      journal: 'Journal of Glaciology',
      year: 2023,
      doi: '10.1017/jog.2023.045',
      abstract:
        'Analysis of ice core samples from the Antarctic region revealing long-term climate change patterns and their implications for global climate models.',
      expeditionId: expeditions.isea42.id,
    },
    {
      title: '[DEMO] Biodiversity of the Southern Ocean: Indian Contributions',
      authors: 'Das, A., Menon, M., Patel, V.',
      journal: 'Deep-Sea Research Part II',
      year: 2011,
      doi: '10.1016/j.dsr2.2011.001',
      abstract:
        'Comprehensive survey of marine biodiversity in the Southern Ocean from Indian research expeditions, documenting new species records.',
      expeditionId: expeditions.isea30.id,
    },
    {
      title: '[DEMO] Atmospheric Aerosol Studies from Indian Antarctic Stations',
      authors: 'Kumar, R., Singh, D., Joshi, P.',
      journal: 'Atmospheric Environment',
      year: 2024,
      doi: '10.1016/j.atmosenv.2024.119902',
      abstract:
        'Measurement and analysis of atmospheric aerosol concentrations at Bharati and Maitri stations, providing baseline data for polar atmospheric studies.',
      expeditionId: expeditions.isea44.id,
    },
    {
      title: '[DEMO] IndARC: India\'s Underwater Arctic Observatory',
      authors: 'Rao, S., Tiwari, M., Sengupta, R.',
      journal: 'IEEE Journal of Oceanic Engineering',
      year: 2024,
      doi: '10.1109/JOE.2024.001',
      abstract:
        'Design, deployment, and preliminary results from the IndARC underwater observatory in Kongsfjorden, Arctic.',
      expeditionId: expeditions.iae14.id,
    },
    {
      title: '[DEMO] Glacial Retreat Patterns in the Himalayan-Arctic Comparison',
      authors: 'Gupta, A.K., Sharma, P., Patel, R.',
      journal: 'Nature Climate Change',
      year: 2023,
      doi: '10.1038/nclimate.2023.089',
      abstract:
        'Comparative study of glacial retreat patterns between Himalayan and Arctic regions using data from Indian polar expeditions.',
      expeditionId: expeditions.isea42.id,
    },
    {
      title: '[DEMO] Space Weather Monitoring from the Arctic: Himadri Observations',
      authors: 'Singh, D., Kumar, A., Nair, V.',
      journal: 'Space Weather',
      year: 2024,
      doi: '10.1029/2024SW001',
      abstract:
        'Analysis of space weather data collected at Himadri station, contributing to global magnetospheric research.',
      expeditionId: expeditions.iae14.id,
    },
    {
      title: '[DEMO] Microbial Diversity in Antarctic Permafrost',
      authors: 'Menon, M., Das, A., Reddy, K.',
      journal: 'Antarctic Science',
      year: 2023,
      doi: '10.1017/as.2023.012',
      abstract:
        'Discovery and characterization of microbial communities in Antarctic permafrost samples collected during recent Indian expeditions.',
      expeditionId: expeditions.isea42.id,
    },
  ];

  const createdPubs = await Promise.all(
    pubData.map((p) => prisma.publication.create({ data: p }))
  );
  console.log(`  ✅ Created ${createdPubs.length} publications\n`);

  // ---- Create Datasets ----
  console.log('📊 Creating datasets...');

  const datasetData = [
    {
      title: '[DEMO] Antarctic Temperature Records (1981-2025)',
      format: 'CSV' as const,
      source: 'NCPOR Weather Station',
      year: 2025,
      description: 'Continuous temperature observations from Maitri and Bharati stations.',
      expeditionId: expeditions.isea44.id,
      region: 'ANTARCTIC',
    },
    {
      title: '[DEMO] Southern Ocean Salinity Profiles',
      format: 'NETCDF' as const,
      source: 'NCPOR Oceanography Division',
      year: 2023,
      description: 'Ocean salinity measurements collected during Southern Ocean research cruises.',
      expeditionId: expeditions.isea42.id,
      region: 'ANTARCTIC',
    },
    {
      title: '[DEMO] Kongsfjorden Water Temperature Data',
      format: 'CSV' as const,
      source: 'Himadri Station Sensors',
      year: 2024,
      description: 'Continuous water temperature monitoring data from IndARC observatory in Kongsfjorden.',
      expeditionId: expeditions.iae14.id,
      region: 'ARCTIC',
    },
    {
      title: '[DEMO] Antarctic Ice Core Analysis Results',
      format: 'JSON' as const,
      source: 'NCPOR Cryosphere Lab',
      year: 2023,
      description: 'Chemical analysis results from Antarctic ice core samples.',
      expeditionId: expeditions.isea42.id,
      region: 'ANTARCTIC',
    },
    {
      title: '[DEMO] Arctic Atmospheric Aerosol Measurements',
      format: 'CSV' as const,
      source: 'Himadri Atmospheric Lab',
      year: 2024,
      description: 'Aerosol concentration and composition data from Himadri station.',
      expeditionId: expeditions.iae14.id,
      region: 'ARCTIC',
    },
    {
      title: '[DEMO] Antarctic Marine Species Database',
      format: 'JSON' as const,
      source: 'NCPOR Marine Biology',
      year: 2023,
      description: 'Catalogue of marine species observed and documented during Indian Antarctic expeditions.',
      expeditionId: expeditions.isea42.id,
      region: 'ANTARCTIC',
    },
    {
      title: '[DEMO] Prydz Bay Bathymetry Data',
      format: 'GEOTIFF' as const,
      source: 'NCPOR Oceanography',
      year: 2024,
      description: 'High-resolution bathymetric data of Prydz Bay near Bharati station.',
      expeditionId: expeditions.isea44.id,
      region: 'ANTARCTIC',
    },
    {
      title: '[DEMO] Schirmacher Oasis Geological Survey Data',
      format: 'CSV' as const,
      source: 'NCPOR Geoscience',
      year: 2022,
      description: 'Geological survey and mineral composition data from the Schirmacher Oasis region.',
      expeditionId: expeditions.isea42.id,
      region: 'ANTARCTIC',
    },
  ];

  const createdDatasets = await Promise.all(
    datasetData.map((d) => prisma.dataset.create({ data: d }))
  );
  console.log(`  ✅ Created ${createdDatasets.length} datasets\n`);

  // ---- Create Media ----
  console.log('📸 Creating media entries...');

  const mediaData = [
    {
      title: '[DEMO] Maitri Station Panoramic View',
      type: 'PHOTO' as const,
      fileUrl: '/images/demo/maitri-panorama.jpg',
      caption: 'Panoramic view of Maitri research station on Schirmacher Oasis.',
      expeditionId: expeditions.isea42.id,
      locationId: locations.maitri.id,
      category: 'Station',
    },
    {
      title: '[DEMO] Bharati Station from Above',
      type: 'PHOTO' as const,
      fileUrl: '/images/demo/bharati-aerial.jpg',
      caption: 'Aerial view of Bharati station built from 134 shipping containers at Larsemann Hills.',
      expeditionId: expeditions.isea44.id,
      locationId: locations.bharati.id,
      category: 'Station',
    },
    {
      title: '[DEMO] Himadri Station in Snow',
      type: 'PHOTO' as const,
      fileUrl: '/images/demo/himadri-snow.jpg',
      caption: 'Himadri station blanketed in snow during Arctic winter at Ny-Ålesund.',
      expeditionId: expeditions.iae2.id,
      locationId: locations.himadri.id,
      category: 'Station',
    },
    {
      title: '[DEMO] Antarctic Ice Landscape',
      type: 'PHOTO' as const,
      fileUrl: '/images/demo/antarctic-ice.jpg',
      caption: 'Vast Antarctic ice sheet landscape captured during expedition traverse.',
      expeditionId: expeditions.isea44.id,
      category: 'Landscape',
    },
    {
      title: '[DEMO] Scientists at Work in Laboratory',
      type: 'PHOTO' as const,
      fileUrl: '/images/demo/lab-work.jpg',
      caption: 'Indian scientists conducting atmospheric research in the laboratory at Maitri station.',
      expeditionId: expeditions.isea42.id,
      locationId: locations.maitri.id,
      category: 'Research',
    },
    {
      title: '[DEMO] Southern Ocean Research Vessel',
      type: 'PHOTO' as const,
      fileUrl: '/images/demo/research-vessel.jpg',
      caption: 'Research vessel used for Southern Ocean studies during Indian Antarctic expedition.',
      expeditionId: expeditions.isea44.id,
      category: 'Expedition',
    },
    {
      title: '[DEMO] Emperor Penguins Colony',
      type: 'PHOTO' as const,
      fileUrl: '/images/demo/penguins.jpg',
      caption: 'Emperor penguin colony observed near the expedition route.',
      expeditionId: expeditions.isea44.id,
      category: 'Wildlife',
    },
    {
      title: '[DEMO] Northern Lights from Himadri',
      type: 'PHOTO' as const,
      fileUrl: '/images/demo/aurora.jpg',
      caption: 'Aurora Borealis (Northern Lights) captured from Himadri station in the Arctic.',
      expeditionId: expeditions.iae14.id,
      locationId: locations.himadri.id,
      category: 'Phenomena',
    },
    {
      title: '[DEMO] Ice Core Extraction Process',
      type: 'VIDEO' as const,
      fileUrl: '/videos/demo/ice-core.mp4',
      thumbnailUrl: '/images/demo/ice-core-thumb.jpg',
      caption: 'Video documenting the ice core extraction and analysis process at Antarctic stations.',
      expeditionId: expeditions.isea42.id,
      category: 'Research',
    },
    {
      title: '[DEMO] Life at Maitri Station - Documentary',
      type: 'VIDEO' as const,
      fileUrl: '/videos/demo/maitri-life.mp4',
      thumbnailUrl: '/images/demo/maitri-life-thumb.jpg',
      caption: 'A day in the life of scientists at Maitri research station in Antarctica.',
      expeditionId: expeditions.isea44.id,
      locationId: locations.maitri.id,
      category: 'Expedition',
    },
    {
      title: '[DEMO] Arctic Fjord Timelapse',
      type: 'VIDEO' as const,
      fileUrl: '/videos/demo/fjord-timelapse.mp4',
      thumbnailUrl: '/images/demo/fjord-thumb.jpg',
      caption: 'Timelapse of Kongsfjorden through changing seasons near Himadri station.',
      expeditionId: expeditions.iae14.id,
      locationId: locations.kongsfjorden.id,
      category: 'Landscape',
    },
    {
      title: '[DEMO] Deploying IndARC Observatory',
      type: 'VIDEO' as const,
      fileUrl: '/videos/demo/indarc-deploy.mp4',
      thumbnailUrl: '/images/demo/indarc-thumb.jpg',
      caption: 'Deployment of the IndARC underwater observatory in Kongsfjorden, Arctic.',
      expeditionId: expeditions.iae14.id,
      locationId: locations.kongsfjorden.id,
      category: 'Research',
    },
  ];

  const createdMedia = await Promise.all(
    mediaData.map((m) => prisma.media.create({ data: m }))
  );
  console.log(`  ✅ Created ${createdMedia.length} media entries\n`);

  // ---- Create Institutional Activities ----
  console.log('🏛️ Creating institutional activities...');

  const activityData = [
    {
      title: '[DEMO] International Polar Year Conference 2024',
      date: new Date('2024-06-15'),
      description:
        'NCPOR organized a major conference on polar research collaborations, bringing together scientists from 20 countries.',
      type: 'CONFERENCE' as const,
      expeditionId: expeditions.isea44.id,
    },
    {
      title: '[DEMO] Polar Science Workshop for Educators',
      date: new Date('2024-09-20'),
      description:
        'Workshop conducted for school and college educators to promote polar science education in India.',
      type: 'WORKSHOP' as const,
    },
    {
      title: '[DEMO] India-Japan Antarctic Research Collaboration',
      date: new Date('2023-05-10'),
      description:
        'Joint research agreement between NCPOR and Japan Antarctic Research Expedition (JARE) for collaborative studies.',
      type: 'COLLABORATION' as const,
      expeditionId: expeditions.isea42.id,
    },
    {
      title: '[DEMO] Antarctic Treaty Consultative Meeting 2023',
      date: new Date('2023-06-01'),
      description:
        'India\'s participation in the Antarctic Treaty Consultative Meeting, presenting research findings and policy positions.',
      type: 'CONFERENCE' as const,
    },
    {
      title: '[DEMO] Polar Safety Training Programme',
      date: new Date('2024-08-10'),
      description:
        'Comprehensive safety and survival training for members of upcoming Antarctic expeditions.',
      type: 'TRAINING' as const,
    },
    {
      title: '[DEMO] Public Lecture Series: Exploring the Poles',
      date: new Date('2024-11-05'),
      description:
        'Public outreach lecture series at multiple venues across India, sharing experiences from polar expeditions.',
      type: 'PUBLIC_OUTREACH' as const,
    },
  ];

  const createdActivities = await Promise.all(
    activityData.map((a) => prisma.institutionalActivity.create({ data: a }))
  );
  console.log(`  ✅ Created ${createdActivities.length} institutional activities\n`);

  // ---- Create Educational Resources ----
  console.log('📚 Creating educational resources...');

  const eduData = [
    {
      title: '[DEMO] What is Polar Science?',
      content:
        'Polar science is the study of Earth\'s polar regions — the Arctic and Antarctic. It encompasses atmospheric science, oceanography, glaciology, biology, and geology. Scientists study polar regions to understand climate change, global weather patterns, and unique ecosystems. India has been contributing to polar science since 1981 through its Antarctic Programme and since 2007 through its Arctic Programme.',
      difficulty: 'BEGINNER' as const,
      category: 'INTRODUCTION',
    },
    {
      title: '[DEMO] India\'s Polar Research Stations',
      content:
        'India operates four polar research stations:\n\n1. **Dakshin Gangotri** (1983-1990, decommissioned) — India\'s first Antarctic station\n2. **Maitri** (1989-present) — Located on Schirmacher Oasis in Antarctica\n3. **Bharati** (2012-present) — Located at Larsemann Hills, built from 134 shipping containers\n4. **Himadri** (2008-present) — India\'s Arctic station at Ny-Ålesund, Svalbard, Norway',
      difficulty: 'BEGINNER' as const,
      category: 'STATIONS',
    },
    {
      title: '[DEMO] The Indian Antarctic Programme',
      content:
        'The Indian Antarctic Programme was initiated in 1981 with the first expedition to Antarctica. Over 44 expeditions have been completed, making India one of the active Antarctic research nations. The programme is managed by NCPOR under the Ministry of Earth Sciences. Key achievements include establishing three research stations, conducting multidisciplinary research, and contributing over 300 research publications.',
      difficulty: 'INTERMEDIATE' as const,
      category: 'EXPEDITIONS',
    },
    {
      title: '[DEMO] Understanding Glaciology',
      content:
        'Glaciology is the study of glaciers and ice sheets. In polar regions, glaciers cover vast areas and hold critical information about Earth\'s climate history. Scientists drill ice cores — long cylinders of ice — that contain trapped air bubbles and chemical signatures dating back hundreds of thousands of years. These records help us understand past climate conditions and predict future changes.',
      difficulty: 'INTERMEDIATE' as const,
      category: 'RESEARCH',
    },
    {
      title: '[DEMO] Fascinating Polar Facts',
      content:
        '• Antarctica is the coldest, driest, and windiest continent\n• The Arctic is actually an ocean surrounded by land, while Antarctica is land surrounded by ocean\n• India\'s Bharati station was built from 134 shipping containers\n• Himadri station is 1,200 km from the North Pole\n• Scientists at polar stations must train in shooting for polar bear protection in the Arctic\n• India has published over 300 research papers based on Antarctic studies\n• Over 1,300 Indians have visited Antarctica through the programme',
      difficulty: 'BEGINNER' as const,
      category: 'FACTS',
    },
    {
      title: '[DEMO] Climate Change in the Polar Regions',
      content:
        'Polar regions are experiencing climate change at rates two to three times faster than the global average. This includes rising temperatures, melting ice sheets, retreating glaciers, and changing ecosystems. Indian scientists at Maitri, Bharati, and Himadri stations contribute to global climate monitoring through continuous atmospheric and oceanic observations. The data collected helps improve climate models and inform global policy.',
      difficulty: 'INTERMEDIATE' as const,
      category: 'RESEARCH',
    },
  ];

  const createdEdu = await Promise.all(
    eduData.map((e) => prisma.educationalResource.create({ data: e }))
  );
  console.log(`  ✅ Created ${createdEdu.length} educational resources\n`);

  // ---- Tag some resources ----
  console.log('🏷️ Tagging resources...');

  // Tag some reports
  await prisma.reportTag.createMany({
    data: [
      { reportId: createdReports[0].id, tagId: tags['Climate Change'].id },
      { reportId: createdReports[1].id, tagId: tags['Atmospheric Science'].id },
      { reportId: createdReports[2].id, tagId: tags['Geology'].id },
      { reportId: createdReports[3].id, tagId: tags['Biology'].id },
      { reportId: createdReports[3].id, tagId: tags['Marine Ecology'].id },
      { reportId: createdReports[4].id, tagId: tags['Climate Change'].id },
      { reportId: createdReports[4].id, tagId: tags['Cryosphere'].id },
      { reportId: createdReports[7].id, tagId: tags['Oceanography'].id },
      { reportId: createdReports[7].id, tagId: tags['Cryosphere'].id },
    ],
  });

  // Tag some publications
  await prisma.publicationTag.createMany({
    data: [
      { publicationId: createdPubs[0].id, tagId: tags['Climate Change'].id },
      { publicationId: createdPubs[1].id, tagId: tags['Paleoclimatology'].id },
      { publicationId: createdPubs[1].id, tagId: tags['Cryosphere'].id },
      { publicationId: createdPubs[2].id, tagId: tags['Biology'].id },
      { publicationId: createdPubs[2].id, tagId: tags['Marine Ecology'].id },
      { publicationId: createdPubs[3].id, tagId: tags['Atmospheric Science'].id },
      { publicationId: createdPubs[4].id, tagId: tags['Oceanography'].id },
      { publicationId: createdPubs[5].id, tagId: tags['Glaciology'].id },
      { publicationId: createdPubs[5].id, tagId: tags['Climate Change'].id },
      { publicationId: createdPubs[6].id, tagId: tags['Space Weather'].id },
      { publicationId: createdPubs[7].id, tagId: tags['Microbiology'].id },
      { publicationId: createdPubs[7].id, tagId: tags['Biodiversity'].id },
    ],
  });

  // Tag some datasets
  await prisma.datasetTag.createMany({
    data: [
      { datasetId: createdDatasets[0].id, tagId: tags['Climate Change'].id },
      { datasetId: createdDatasets[0].id, tagId: tags['Atmospheric Science'].id },
      { datasetId: createdDatasets[1].id, tagId: tags['Oceanography'].id },
      { datasetId: createdDatasets[2].id, tagId: tags['Oceanography'].id },
      { datasetId: createdDatasets[3].id, tagId: tags['Paleoclimatology'].id },
      { datasetId: createdDatasets[3].id, tagId: tags['Cryosphere'].id },
      { datasetId: createdDatasets[4].id, tagId: tags['Atmospheric Science'].id },
      { datasetId: createdDatasets[5].id, tagId: tags['Biodiversity'].id },
      { datasetId: createdDatasets[5].id, tagId: tags['Marine Ecology'].id },
    ],
  });

  // Tag some media
  await prisma.mediaTag.createMany({
    data: [
      { mediaId: createdMedia[3].id, tagId: tags['Cryosphere'].id },
      { mediaId: createdMedia[4].id, tagId: tags['Atmospheric Science'].id },
      { mediaId: createdMedia[6].id, tagId: tags['Biodiversity'].id },
      { mediaId: createdMedia[7].id, tagId: tags['Space Weather'].id },
    ],
  });

  console.log('  ✅ Tagged resources successfully\n');

  // ---- Summary ----
  console.log('══════════════════════════════════════════');
  console.log('  🧊 POLARIS Seed Complete!');
  console.log('══════════════════════════════════════════');
  console.log(`  Users:              4`);
  console.log(`  Tags:               ${tagData.length}`);
  console.log(`  Locations:          ${Object.keys(locations).length}`);
  console.log(`  Expeditions:        ${expeditionCount}`);
  console.log(`  Reports:            ${createdReports.length}`);
  console.log(`  Publications:       ${createdPubs.length}`);
  console.log(`  Datasets:           ${createdDatasets.length}`);
  console.log(`  Media:              ${createdMedia.length}`);
  console.log(`  Activities:         ${createdActivities.length}`);
  console.log(`  Educational:        ${createdEdu.length}`);
  console.log('══════════════════════════════════════════');
  console.log('\n  Demo accounts:');
  console.log('  Admin:     admin@polaris.gov.in / admin123');
  console.log('  Research:  researcher@polaris.gov.in / user123');
  console.log('  Educator:  educator@polaris.gov.in / user123');
  console.log('  Public:    user@polaris.gov.in / user123');
  console.log('══════════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
