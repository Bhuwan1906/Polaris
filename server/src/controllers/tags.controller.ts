import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function listTags(req: Request, res: Response): Promise<void> {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });
    res.json({ data: tags });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list tags' });
  }
}

export async function createTag(req: Request, res: Response): Promise<void> {
  try {
    const tag = await prisma.tag.create({ data: req.body });
    res.status(201).json({ data: tag });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tag' });
  }
}

export async function deleteTag(req: Request, res: Response): Promise<void> {
  try {
    await prisma.tag.delete({ where: { id: req.params.id } });
    res.json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tag' });
  }
}
