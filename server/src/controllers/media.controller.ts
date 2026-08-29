import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function listMedia(req: Request, res: Response): Promise<void> {
  try {
    const { type, expeditionId, locationId, category, page = '1', limit = '24' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const where: any = {};
    if (type) where.type = type;
    if (expeditionId) where.expeditionId = expeditionId;
    if (locationId) where.locationId = locationId;
    if (category) where.category = category;

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        include: {
          expedition: { select: { id: true, name: true } },
          tags: { include: { tag: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.media.count({ where }),
    ]);

    res.json({
      data: media.map((m) => ({ ...m, tags: m.tags.map((mt) => mt.tag) })),
      total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list media' });
  }
}

export async function getMedia(req: Request, res: Response): Promise<void> {
  try {
    const media = await prisma.media.findUnique({
      where: { id: req.params.id },
      include: {
        expedition: true,
        location: true,
        tags: { include: { tag: true } },
      },
    });

    if (!media) {
      res.status(404).json({ error: 'Media not found' });
      return;
    }

    res.json({ data: { ...media, tags: media.tags.map((mt) => mt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get media' });
  }
}

export async function createMedia(req: Request, res: Response): Promise<void> {
  try {
    const { tagIds, ...data } = req.body;

    const media = await prisma.media.create({
      data: {
        ...data,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId: string) => ({ tagId })) }
          : undefined,
      },
      include: { tags: { include: { tag: true } } },
    });

    res.status(201).json({ data: { ...media, tags: media.tags.map((mt) => mt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create media' });
  }
}

export async function updateMedia(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { tagIds, ...data } = req.body;

    await prisma.media.update({ where: { id }, data });

    if (tagIds) {
      await prisma.mediaTag.deleteMany({ where: { mediaId: id } });
      if (tagIds.length > 0) {
        await prisma.mediaTag.createMany({
          data: tagIds.map((tagId: string) => ({ mediaId: id, tagId })),
        });
      }
    }

    const updated = await prisma.media.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    });

    res.json({ data: { ...updated, tags: updated!.tags.map((mt) => mt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update media' });
  }
}

export async function deleteMedia(req: Request, res: Response): Promise<void> {
  try {
    await prisma.media.delete({ where: { id: req.params.id } });
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete media' });
  }
}
