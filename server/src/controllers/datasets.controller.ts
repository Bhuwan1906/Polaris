import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function listDatasets(req: Request, res: Response): Promise<void> {
  try {
    const { expeditionId, region, format, year, page = '1', limit = '20' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const where: any = {};
    if (expeditionId) where.expeditionId = expeditionId;
    if (region) where.region = region;
    if (format) where.format = format;
    if (year) where.year = parseInt(year as string);

    const [datasets, total] = await Promise.all([
      prisma.dataset.findMany({
        where,
        include: {
          expedition: { select: { id: true, name: true, region: true } },
          tags: { include: { tag: true } },
        },
        orderBy: { year: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.dataset.count({ where }),
    ]);

    res.json({
      data: datasets.map((d) => ({ ...d, tags: d.tags.map((dt) => dt.tag) })),
      total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list datasets' });
  }
}

export async function getDataset(req: Request, res: Response): Promise<void> {
  try {
    const dataset = await prisma.dataset.findUnique({
      where: { id: req.params.id },
      include: { expedition: true, tags: { include: { tag: true } } },
    });

    if (!dataset) {
      res.status(404).json({ error: 'Dataset not found' });
      return;
    }

    res.json({ data: { ...dataset, tags: dataset.tags.map((dt) => dt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get dataset' });
  }
}

export async function createDataset(req: Request, res: Response): Promise<void> {
  try {
    const { tagIds, ...data } = req.body;

    const dataset = await prisma.dataset.create({
      data: {
        ...data,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId: string) => ({ tagId })) }
          : undefined,
      },
      include: { tags: { include: { tag: true } } },
    });

    res.status(201).json({ data: { ...dataset, tags: dataset.tags.map((dt) => dt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create dataset' });
  }
}

export async function updateDataset(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { tagIds, ...data } = req.body;

    await prisma.dataset.update({ where: { id }, data });

    if (tagIds) {
      await prisma.datasetTag.deleteMany({ where: { datasetId: id } });
      if (tagIds.length > 0) {
        await prisma.datasetTag.createMany({
          data: tagIds.map((tagId: string) => ({ datasetId: id, tagId })),
        });
      }
    }

    const updated = await prisma.dataset.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    });

    res.json({ data: { ...updated, tags: updated!.tags.map((dt) => dt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update dataset' });
  }
}

export async function deleteDataset(req: Request, res: Response): Promise<void> {
  try {
    await prisma.dataset.delete({ where: { id: req.params.id } });
    res.json({ message: 'Dataset deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete dataset' });
  }
}
