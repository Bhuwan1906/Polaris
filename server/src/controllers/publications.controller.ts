import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function listPublications(req: Request, res: Response): Promise<void> {
  try {
    const { expeditionId, year, page = '1', limit = '20' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const where: any = {};
    if (expeditionId) where.expeditionId = expeditionId;
    if (year) where.year = parseInt(year as string);

    const [publications, total] = await Promise.all([
      prisma.publication.findMany({
        where,
        include: {
          expedition: { select: { id: true, name: true, region: true } },
          tags: { include: { tag: true } },
        },
        orderBy: { year: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.publication.count({ where }),
    ]);

    const transformed = publications.map((p) => ({
      ...p,
      tags: p.tags.map((pt) => pt.tag),
    }));

    res.json({ data: transformed, total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list publications' });
  }
}

export async function getPublication(req: Request, res: Response): Promise<void> {
  try {
    const pub = await prisma.publication.findUnique({
      where: { id: req.params.id },
      include: { expedition: true, tags: { include: { tag: true } } },
    });

    if (!pub) {
      res.status(404).json({ error: 'Publication not found' });
      return;
    }

    res.json({ data: { ...pub, tags: pub.tags.map((pt) => pt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get publication' });
  }
}

export async function createPublication(req: Request, res: Response): Promise<void> {
  try {
    const { tagIds, ...data } = req.body;

    const pub = await prisma.publication.create({
      data: {
        ...data,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId: string) => ({ tagId })) }
          : undefined,
      },
      include: { tags: { include: { tag: true } } },
    });

    res.status(201).json({ data: { ...pub, tags: pub.tags.map((pt) => pt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create publication' });
  }
}

export async function updatePublication(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { tagIds, ...data } = req.body;

    await prisma.publication.update({ where: { id }, data });

    if (tagIds) {
      await prisma.publicationTag.deleteMany({ where: { publicationId: id } });
      if (tagIds.length > 0) {
        await prisma.publicationTag.createMany({
          data: tagIds.map((tagId: string) => ({ publicationId: id, tagId })),
        });
      }
    }

    const updated = await prisma.publication.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    });

    res.json({ data: { ...updated, tags: updated!.tags.map((pt) => pt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update publication' });
  }
}

export async function deletePublication(req: Request, res: Response): Promise<void> {
  try {
    await prisma.publication.delete({ where: { id: req.params.id } });
    res.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete publication' });
  }
}

export async function getLatestPublications(req: Request, res: Response): Promise<void> {
  try {
    const publications = await prisma.publication.findMany({
      include: {
        expedition: { select: { id: true, name: true, region: true } },
        tags: { include: { tag: true } },
      },
      orderBy: { year: 'desc' },
      take: 6,
    });

    res.json({
      data: publications.map((p) => ({
        ...p,
        tags: p.tags.map((pt) => pt.tag),
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get latest publications' });
  }
}
