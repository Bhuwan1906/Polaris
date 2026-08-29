import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Template-based content generation (no AI)
function generateSocialPost(data: any): string {
  return `🌍 **${data.title}**

📍 Region: ${data.region || 'Polar Region'}
📅 Year: ${data.year || 'N/A'}

${data.description || data.highlights || ''}

🔬 Part of India's polar research program under NCPOR, Ministry of Earth Sciences.

#PolarResearch #India #Arctic #Antarctic #NCPOR #SIH2026`;
}

function generateWebsiteArticle(data: any): string {
  return `# ${data.title}

## Overview

${data.description || ''}

## Key Highlights

${data.highlights || 'Research contributions from India\'s polar expeditions.'}

## Research Context

This ${data.resourceType} is part of India's ongoing polar research program conducted under the National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Government of India.

## Timeline

- **Start Date:** ${data.startDate || 'N/A'}
- **End Date:** ${data.endDate || 'Ongoing'}

---

*This content is generated from verified database entries in the POLARIS platform.*
*All information is sourced from official expedition records.*
`;
}

function generateFactCard(data: any): string {
  return `📋 FACT CARD: ${data.title}

━━━━━━━━━━━━━━━━━━━━━━━
🔬 Type: ${data.resourceType}
📍 Region: ${data.region || 'Polar Region'}
📅 Year: ${data.year || 'N/A'}
━━━━━━━━━━━━━━━━━━━━━━━

${data.description || data.highlights || ''}

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇳 Part of India's Polar Research Program
🏛️ NCPOR | Ministry of Earth Sciences
━━━━━━━━━━━━━━━━━━━━━━━`;
}

function generateNewsletter(data: any): string {
  return `📰 POLARIS POLAR NEWS

${data.title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━

In this edition:

📌 ${data.title}

${data.description || ''}

Key achievements:
${data.highlights || 'Continued India\'s legacy in polar research.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source: POLARIS - Polar Research & Information System
NCPOR | Ministry of Earth Sciences, Government of India`;
}

const generators: Record<string, (data: any) => string> = {
  SOCIAL_POST: generateSocialPost,
  WEBSITE_ARTICLE: generateWebsiteArticle,
  FACT_CARD: generateFactCard,
  NEWSLETTER: generateNewsletter,
};

async function getResourceData(resourceId: string, resourceType: string): Promise<any> {
  switch (resourceType) {
    case 'expedition': {
      const exp = await prisma.expedition.findUnique({
        where: { id: resourceId },
        include: {
          locations: { include: { location: true } },
          _count: { select: { reports: true, publications: true, datasets: true, media: true } },
        },
      });
      if (!exp) return null;
      return {
        title: exp.name,
        description: exp.description,
        highlights: exp.highlights,
        region: exp.region,
        year: exp.startDate.getFullYear(),
        startDate: exp.startDate.toISOString().split('T')[0],
        endDate: exp.endDate?.toISOString().split('T')[0],
        resourceType: 'Expedition',
      };
    }
    case 'publication': {
      const pub = await prisma.publication.findUnique({
        where: { id: resourceId },
        include: { expedition: true },
      });
      if (!pub) return null;
      return {
        title: pub.title,
        description: `Authors: ${pub.authors}${pub.journal ? `\nJournal: ${pub.journal}` : ''}`,
        region: pub.expedition?.region,
        year: pub.year,
        resourceType: 'Publication',
      };
    }
    case 'dataset': {
      const ds = await prisma.dataset.findUnique({
        where: { id: resourceId },
        include: { expedition: true },
      });
      if (!ds) return null;
      return {
        title: ds.title,
        description: ds.description || `Format: ${ds.format}`,
        region: ds.region,
        year: ds.year,
        resourceType: 'Dataset',
      };
    }
    default:
      return null;
  }
}

export async function generateContent(req: Request, res: Response): Promise<void> {
  try {
    const { resourceId, resourceType, templateType, customNotes } = req.body;

    const resourceData = await getResourceData(resourceId, resourceType);
    if (!resourceData) {
      res.status(404).json({ error: 'Resource not found' });
      return;
    }

    const generator = generators[templateType];
    if (!generator) {
      res.status(400).json({ error: 'Invalid template type' });
      return;
    }

    const generatedContent = generator(resourceData);

    const title = `${resourceData.title} - ${templateType.replace('_', ' ')}`;

    const outreach = await prisma.outreachContent.create({
      data: {
        title,
        type: templateType as any,
        content: customNotes ? `${generatedContent}\n\n---\nNotes: ${customNotes}` : generatedContent,
        resourceId,
        resourceType,
        status: 'DRAFT',
        createdBy: req.user!.userId,
      },
      include: { creator: { select: { id: true, name: true, email: true, role: true } } },
    });

    res.status(201).json({ data: outreach });
  } catch (error) {
    console.error('Generate content error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
}

export async function listOutreach(req: Request, res: Response): Promise<void> {
  try {
    const { status, page = '1', limit = '20' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const where: any = {};
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      prisma.outreachContent.findMany({
        where,
        include: { creator: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.outreachContent.count({ where }),
    ]);

    res.json({ data: items, total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list outreach content' });
  }
}

export async function getOutreach(req: Request, res: Response): Promise<void> {
  try {
    const item = await prisma.outreachContent.findUnique({
      where: { id: req.params.id },
      include: { creator: { select: { id: true, name: true, email: true } } },
    });

    if (!item) {
      res.status(404).json({ error: 'Outreach content not found' });
      return;
    }

    res.json({ data: item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get outreach content' });
  }
}

export async function updateOutreach(req: Request, res: Response): Promise<void> {
  try {
    const item = await prisma.outreachContent.update({
      where: { id: req.params.id },
      data: req.body,
      include: { creator: { select: { id: true, name: true, email: true } } },
    });

    res.json({ data: item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update outreach content' });
  }
}

export async function updateOutreachStatus(req: Request, res: Response): Promise<void> {
  try {
    const { status } = req.body;

    const validTransitions: Record<string, string[]> = {
      DRAFT: ['REVIEW'],
      REVIEW: ['APPROVED', 'DRAFT'],
      APPROVED: ['PUBLISHED', 'REVIEW'],
      PUBLISHED: ['DRAFT'],
    };

    const item = await prisma.outreachContent.findUnique({ where: { id: req.params.id } });
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    const allowed = validTransitions[item.status] || [];
    if (!allowed.includes(status)) {
      res.status(400).json({ error: `Cannot transition from ${item.status} to ${status}` });
      return;
    }

    const updateData: any = { status };
    if (status === 'APPROVED') updateData.approvedBy = req.user!.userId;

    const updated = await prisma.outreachContent.update({
      where: { id: req.params.id },
      data: updateData,
      include: { creator: { select: { id: true, name: true, email: true } } },
    });

    res.json({ data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
}

export async function deleteOutreach(req: Request, res: Response): Promise<void> {
  try {
    await prisma.outreachContent.delete({ where: { id: req.params.id } });
    res.json({ message: 'Outreach content deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete outreach content' });
  }
}
