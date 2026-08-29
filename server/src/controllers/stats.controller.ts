import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function getOverviewStats(req: Request, res: Response): Promise<void> {
  try {
    const [expeditions, publications, datasets, reports, media, locations, users] = await Promise.all([
      prisma.expedition.count(),
      prisma.publication.count(),
      prisma.dataset.count(),
      prisma.report.count(),
      prisma.media.count(),
      prisma.location.count(),
      prisma.user.count(),
    ]);

    res.json({
      data: { expeditions, publications, datasets, reports, media, locations, users },
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
}

export async function getExpeditionsByYear(req: Request, res: Response): Promise<void> {
  try {
    const expeditions = await prisma.expedition.findMany({
      select: { startDate: true },
      orderBy: { startDate: 'asc' },
    });

    const byYear: Record<number, number> = {};
    expeditions.forEach((e) => {
      const year = e.startDate.getFullYear();
      byYear[year] = (byYear[year] || 0) + 1;
    });

    const data = Object.entries(byYear).map(([year, count]) => ({
      year: parseInt(year),
      count,
    }));

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get expedition stats' });
  }
}

export async function getRegionStats(req: Request, res: Response): Promise<void> {
  try {
    const expeditions = await prisma.expedition.groupBy({
      by: ['region'],
      _count: { region: true },
    });

    const data = expeditions.map((e) => ({
      region: e.region,
      count: e._count.region,
    }));

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get region stats' });
  }
}

export async function getResourcesByType(req: Request, res: Response): Promise<void> {
  try {
    const [reports, publications, datasets, media] = await Promise.all([
      prisma.report.groupBy({ by: ['type'], _count: { type: true } }),
      prisma.media.groupBy({ by: ['type'], _count: { type: true } }),
      prisma.dataset.groupBy({ by: ['format'], _count: { format: true } }),
    ]);

    res.json({
      data: {
        reports: reports.map((r) => ({ type: r.type, count: r._count.type })),
        media: media.map((m) => ({ type: m.type, count: m._count.type })),
        datasets: datasets.map((d) => ({ format: d.format, count: d._count.format })),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get resource stats' });
  }
}
