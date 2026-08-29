import { Request, Response } from 'express';
import prisma from '../lib/prisma';

const includeRelations = {
  locations: { include: { location: true } },
  reports: { include: { tags: { include: { tag: true } } } },
  publications: { include: { tags: { include: { tag: true } } } },
  datasets: { include: { tags: { include: { tag: true } } } },
  media: { include: { tags: { include: { tag: true } } } },
};

export async function listExpeditions(req: Request, res: Response): Promise<void> {
  try {
    const { region, status, page = '1', limit = '12' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (region) where.region = region;
    if (status) where.status = status;

    const [expeditions, total] = await Promise.all([
      prisma.expedition.findMany({
        where,
        include: {
          locations: { include: { location: true } },
          _count: {
            select: { reports: true, publications: true, datasets: true, media: true },
          },
        },
        orderBy: { startDate: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.expedition.count({ where }),
    ]);

    res.json({
      data: expeditions,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error('List expeditions error:', error);
    res.status(500).json({ error: 'Failed to list expeditions' });
  }
}

export async function getExpedition(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const expedition = await prisma.expedition.findUnique({
      where: { id },
      include: {
        ...includeRelations,
        activities: true,
      },
    });

    if (!expedition) {
      res.status(404).json({ error: 'Expedition not found' });
      return;
    }

    // Transform relations to include tag arrays cleanly
    const transformed = {
      ...expedition,
      locations: expedition.locations.map((le) => le.location),
      reports: expedition.reports.map((r) => ({
        ...r,
        tags: r.tags.map((rt) => rt.tag),
      })),
      publications: expedition.publications.map((p) => ({
        ...p,
        tags: p.tags.map((pt) => pt.tag),
      })),
      datasets: expedition.datasets.map((d) => ({
        ...d,
        tags: d.tags.map((dt) => dt.tag),
      })),
      media: expedition.media.map((m) => ({
        ...m,
        tags: m.tags.map((mt) => mt.tag),
      })),
    };

    res.json({ data: transformed });
  } catch (error) {
    console.error('Get expedition error:', error);
    res.status(500).json({ error: 'Failed to get expedition' });
  }
}

export async function createExpedition(req: Request, res: Response): Promise<void> {
  try {
    const { locationIds, tagIds, ...data } = req.body;

    const expedition = await prisma.expedition.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        locations: locationIds?.length
          ? { create: locationIds.map((id: string) => ({ locationId: id })) }
          : undefined,
      },
      include: { locations: { include: { location: true } } },
    });

    res.status(201).json({ data: expedition });
  } catch (error) {
    console.error('Create expedition error:', error);
    res.status(500).json({ error: 'Failed to create expedition' });
  }
}

export async function updateExpedition(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { locationIds, tagIds, ...data } = req.body;

    // Update basic fields
    const updateData: any = { ...data };
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);

    const expedition = await prisma.expedition.update({
      where: { id },
      data: updateData,
      include: { locations: { include: { location: true } } },
    });

    // Update location relations if provided
    if (locationIds) {
      await prisma.locationExpedition.deleteMany({ where: { expeditionId: id } });
      if (locationIds.length > 0) {
        await prisma.locationExpedition.createMany({
          data: locationIds.map((locationId: string) => ({
            expeditionId: id,
            locationId,
          })),
        });
      }
    }

    const updated = await prisma.expedition.findUnique({
      where: { id },
      include: { locations: { include: { location: true } } },
    });

    res.json({ data: updated });
  } catch (error) {
    console.error('Update expedition error:', error);
    res.status(500).json({ error: 'Failed to update expedition' });
  }
}

export async function deleteExpedition(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    await prisma.expedition.delete({ where: { id } });

    res.json({ message: 'Expedition deleted successfully' });
  } catch (error) {
    console.error('Delete expedition error:', error);
    res.status(500).json({ error: 'Failed to delete expedition' });
  }
}

export async function getFeaturedExpeditions(req: Request, res: Response): Promise<void> {
  try {
    const expeditions = await prisma.expedition.findMany({
      where: { status: 'COMPLETED' },
      include: {
        locations: { include: { location: true } },
        _count: { select: { reports: true, publications: true, datasets: true, media: true } },
      },
      orderBy: { startDate: 'desc' },
      take: 6,
    });

    res.json({ data: expeditions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get featured expeditions' });
  }
}

export async function getExpeditionResources(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { type } = req.query;

    const expedition = await prisma.expedition.findUnique({ where: { id } });
    if (!expedition) {
      res.status(404).json({ error: 'Expedition not found' });
      return;
    }

    const resources: any = {};

    if (!type || type === 'reports') {
      resources.reports = await prisma.report.findMany({
        where: { expeditionId: id },
        include: { tags: { include: { tag: true } } },
      });
      resources.reports = resources.reports.map((r: any) => ({
        ...r,
        tags: r.tags.map((rt: any) => rt.tag),
      }));
    }

    if (!type || type === 'publications') {
      resources.publications = await prisma.publication.findMany({
        where: { expeditionId: id },
        include: { tags: { include: { tag: true } } },
      });
      resources.publications = resources.publications.map((p: any) => ({
        ...p,
        tags: p.tags.map((pt: any) => pt.tag),
      }));
    }

    if (!type || type === 'datasets') {
      resources.datasets = await prisma.dataset.findMany({
        where: { expeditionId: id },
        include: { tags: { include: { tag: true } } },
      });
      resources.datasets = resources.datasets.map((d: any) => ({
        ...d,
        tags: d.tags.map((dt: any) => dt.tag),
      }));
    }

    if (!type || type === 'media') {
      resources.media = await prisma.media.findMany({
        where: { expeditionId: id },
        include: { tags: { include: { tag: true } } },
      });
      resources.media = resources.media.map((m: any) => ({
        ...m,
        tags: m.tags.map((mt: any) => mt.tag),
      }));
    }

    res.json({ data: resources });
  } catch (error) {
    console.error('Get expedition resources error:', error);
    res.status(500).json({ error: 'Failed to get expedition resources' });
  }
}
