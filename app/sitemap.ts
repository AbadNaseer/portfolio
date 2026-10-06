import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';
import { work } from '@/content/work';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${profile.siteUrl}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...work.map((w) => ({
      url: `${profile.siteUrl}/work/${w.slug}/`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: w.tier === 'flagship' ? 0.9 : 0.7,
    })),
  ];
}
