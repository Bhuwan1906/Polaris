import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function listLocations(req: Request, res: Response): Promise<void> {
  try {
    const { region, type } = req.query;

    const where: any = {};
    if (region) where.region = region;
    if (type) where.type = type;

    const locations = await prisma.location.findMany({
      where,
      include: {
        _count: { select: { expeditions: true, media: true } },
      },
      orderBy: { name: 'asc' },
    });

    res.json({ data: locations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list locations' });
  }
}

export async function getLocation(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const location = await prisma.location.findUnique({
      where: { id },
      include: {
        expeditions: {
          include: {
            expedition: {
              include: {
                _count: { select: { reports: true, publications: true, datasets: true, media: true } },
              },
            },
          },
        },
        media: { take: 20 },
      },
    });

    if (!location) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }

    res.json({ data: location });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get location' });
  }
}

export async function createLocation(req: Request, res: Response): Promise<void> {
  try {
    const location = await prisma.location.create({ data: req.body });
    res.status(201).json({ data: location });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create location' });
  }
}

export async function updateLocation(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const location = await prisma.location.update({
      where: { id },
      data: req.body,
    });
    res.json({ data: location });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update location' });
  }
}

export async function deleteLocation(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    await prisma.location.delete({ where: { id } });
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete location' });
  }
}
