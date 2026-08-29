import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function search(req: Request, res: Response): Promise<void> {
  try {
    const {
      q = '',
      type,
      region,
      yearFrom,
      yearTo,
      expedition,
      sort = 'relevance',
      page = '1',
      limit = '20',
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    const searchTerm = (q as string).trim();

    const results: any[] = [];

    // Search Expeditions
    if (!type || type === 'expedition') {
      const where: any = {};
      if (searchTerm) {
        where.OR = [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { highlights: { contains: searchTerm, mode: 'insensitive' } },
        ];
      }
      if (region) where.region = region;
      if (yearFrom || yearTo) {
        where.startDate = {};
        if (yearFrom) where.startDate.gte = new Date(`${yearFrom}-01-01`);
        if (yearTo) where.startDate.lte = new Date(`${yearTo}-12-31`);
      }

      const expeditions = await prisma.expedition.findMany({
        where,
        include: {
          _count: { select: { reports: true, publications: true, datasets: true, media: true } },
        },
        take: 50,
      });

      expeditions.forEach((e) => {
        results.push({
          id: e.id,
          title: e.name,
          type: 'expedition',
          description: e.description.substring(0, 200),
          thumbnail: e.coverImage,
          region: e.region,
          year: e.startDate.getFullYear(),
          score: searchTerm ? calculateRelevance(e.name, searchTerm) : 1,
          data: e,
        });
      });
    }

    // Search Reports
    if (!type || type === 'report') {
      const where: any = {};
      if (searchTerm) {
        where.OR = [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { content: { contains: searchTerm, mode: 'insensitive' } },
        ];
      }
      if (yearFrom || yearTo) {
        where.year = {};
        if (yearFrom) where.year.gte = parseInt(yearFrom as string);
        if (yearTo) where.year.lte = parseInt(yearTo as string);
      }
      if (expedition) where.expeditionId = expedition;

      const reports = await prisma.report.findMany({
        where,
        include: { expedition: true },
        take: 50,
      });

      reports.forEach((r) => {
        results.push({
          id: r.id,
          title: r.title,
          type: 'report',
          description: r.content?.substring(0, 200),
          region: r.expedition?.region,
          year: r.year,
          expeditionId: r.expeditionId,
          score: searchTerm ? calculateRelevance(r.title, searchTerm) : 1,
          data: r,
        });
      });
    }

    // Search Publications
    if (!type || type === 'publication') {
      const where: any = {};
      if (searchTerm) {
        where.OR = [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { authors: { contains: searchTerm, mode: 'insensitive' } },
          { abstract: { contains: searchTerm, mode: 'insensitive' } },
          { journal: { contains: searchTerm, mode: 'insensitive' } },
        ];
      }
      if (yearFrom || yearTo) {
        where.year = {};
        if (yearFrom) where.year.gte = parseInt(yearFrom as string);
        if (yearTo) where.year.lte = parseInt(yearTo as string);
      }
      if (expedition) where.expeditionId = expedition;

      const publications = await prisma.publication.findMany({
        where,
        include: { expedition: true },
        take: 50,
      });

      publications.forEach((p) => {
        results.push({
          id: p.id,
          title: p.title,
          type: 'publication',
          description: p.abstract?.substring(0, 200) || `By ${p.authors}`,
          region: p.expedition?.region,
          year: p.year,
          expeditionId: p.expeditionId,
          score: searchTerm ? calculateRelevance(p.title + ' ' + p.authors, searchTerm) : 1,
          data: p,
        });
      });
    }

    // Search Datasets
    if (!type || type === 'dataset') {
      const where: any = {};
      if (searchTerm) {
        where.OR = [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { source: { contains: searchTerm, mode: 'insensitive' } },
        ];
      }
      if (region) where.region = region;
      if (yearFrom || yearTo) {
        where.year = {};
        if (yearFrom) where.year.gte = parseInt(yearFrom as string);
        if (yearTo) where.year.lte = parseInt(yearTo as string);
      }
      if (expedition) where.expeditionId = expedition;

      const datasets = await prisma.dataset.findMany({
        where,
        include: { expedition: true },
        take: 50,
      });

      datasets.forEach((d) => {
        results.push({
          id: d.id,
          title: d.title,
          type: 'dataset',
          description: d.description?.substring(0, 200),
          region: d.region,
          year: d.year,
          expeditionId: d.expeditionId,
          score: searchTerm ? calculateRelevance(d.title, searchTerm) : 1,
          data: d,
        });
      });
    }

    // Search Media
    if (!type || type === 'media') {
      const where: any = {};
      if (searchTerm) {
        where.OR = [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { caption: { contains: searchTerm, mode: 'insensitive' } },
        ];
      }
      if (expedition) where.expeditionId = expedition;

      const media = await prisma.media.findMany({
        where,
        include: { expedition: true },
        take: 50,
      });

      media.forEach((m) => {
        results.push({
          id: m.id,
          title: m.title,
          type: 'media',
          description: m.caption?.substring(0, 200),
          thumbnail: m.thumbnailUrl || m.fileUrl,
          region: m.expedition?.region,
          expeditionId: m.expeditionId,
          score: searchTerm ? calculateRelevance(m.title, searchTerm) : 1,
          data: m,
        });
      });
    }

    // Sort results
    results.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return (b.year || 0) - (a.year || 0);
        case 'oldest':
          return (a.year || 0) - (b.year || 0);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'relevance':
        default:
          return b.score - a.score;
      }
    });

    // Paginate
    const total = results.length;
    const paginatedResults = results.slice(skip, skip + limitNum);

    res.json({
      data: paginatedResults,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
}

export async function searchSuggestions(req: Request, res: Response): Promise<void> {
  try {
    const { q = '' } = req.query;
    const searchTerm = (q as string).trim();

    if (searchTerm.length < 2) {
      res.json({ data: [] });
      return;
    }

    const [expeditions, publications] = await Promise.all([
      prisma.expedition.findMany({
        where: { name: { contains: searchTerm, mode: 'insensitive' } },
        select: { id: true, name: true },
        take: 5,
      }),
      prisma.publication.findMany({
        where: { title: { contains: searchTerm, mode: 'insensitive' } },
        select: { id: true, title: true },
        take: 5,
      }),
    ]);

    const suggestions = [
      ...expeditions.map((e) => ({ id: e.id, text: e.name, type: 'expedition' })),
      ...publications.map((p) => ({ id: p.id, text: p.title, type: 'publication' })),
    ];

    res.json({ data: suggestions.slice(0, 8) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
}

function calculateRelevance(text: string, term: string): number {
  const lowerText = text.toLowerCase();
  const lowerTerm = term.toLowerCase();

  if (lowerText === lowerTerm) return 100;
  if (lowerText.startsWith(lowerTerm)) return 90;
  if (lowerText.includes(lowerTerm)) return 70;

  // Partial word match
  const words = lowerTerm.split(' ');
  let matchCount = 0;
  words.forEach((word) => {
    if (lowerText.includes(word)) matchCount++;
  });
  return (matchCount / words.length) * 60;
}
