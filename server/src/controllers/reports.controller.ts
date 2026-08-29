import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function listReports(req: Request, res: Response): Promise<void> {
  try {
    const { expeditionId, type, year, page = '1', limit = '20' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const where: any = {};
    if (expeditionId) where.expeditionId = expeditionId;
    if (type) where.type = type;
    if (year) where.year = parseInt(year as string);

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        include: {
          expedition: { select: { id: true, name: true, region: true } },
          tags: { include: { tag: true } },
        },
        orderBy: { year: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.report.count({ where }),
    ]);

    const transformed = reports.map((r) => ({
      ...r,
      tags: r.tags.map((rt) => rt.tag),
    }));

    res.json({ data: transformed, total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list reports' });
  }
}

export async function getReport(req: Request, res: Response): Promise<void> {
  try {
    const report = await prisma.report.findUnique({
      where: { id: req.params.id },
      include: {
        expedition: true,
        tags: { include: { tag: true } },
      },
    });

    if (!report) {
      res.status(404).json({ error: 'Report not found' });
      return;
    }

    res.json({ data: { ...report, tags: report.tags.map((rt) => rt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get report' });
  }
}

export async function createReport(req: Request, res: Response): Promise<void> {
  try {
    const { tagIds, ...data } = req.body;

    const report = await prisma.report.create({
      data: {
        ...data,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId: string) => ({ tagId })) }
          : undefined,
      },
      include: { tags: { include: { tag: true } } },
    });

    res.status(201).json({ data: { ...report, tags: report.tags.map((rt) => rt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create report' });
  }
}

export async function updateReport(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { tagIds, ...data } = req.body;

    const report = await prisma.report.update({
      where: { id },
      data,
      include: { tags: { include: { tag: true } } },
    });

    if (tagIds) {
      await prisma.reportTag.deleteMany({ where: { reportId: id } });
      if (tagIds.length > 0) {
        await prisma.reportTag.createMany({
          data: tagIds.map((tagId: string) => ({ reportId: id, tagId })),
        });
      }
    }

    const updated = await prisma.report.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    });

    res.json({ data: { ...updated, tags: updated!.tags.map((rt) => rt.tag) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update report' });
  }
}

export async function deleteReport(req: Request, res: Response): Promise<void> {
  try {
    await prisma.report.delete({ where: { id: req.params.id } });
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete report' });
  }
}
