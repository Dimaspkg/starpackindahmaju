import { MetadataRoute } from 'next';
import id from '../locales/id.json';

import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://starpack.co.id';
  const siteUrl = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
  const locales = ['id', 'en', 'zh', 'jp'];
  
  // Extract static article slugs from locales
  let articleSlugs = id.insights?.items?.map((item: any) => `/insights/${item.slug}`) || [];

  // Fetch dynamic article slugs from Database
  try {
    const [rows] = await pool.execute<RowDataPacket[]>("SELECT slug FROM posts WHERE status = 'published'");
    const dbSlugs = rows.map(row => `/insights/${row.slug}`);
    
    // Combine and remove duplicates
    articleSlugs = Array.from(new Set([...articleSlugs, ...dbSlugs]));
  } catch (error) {
    console.error("Failed to fetch posts for sitemap:", error);
  }

  const routes = [
    '',
    '/about',
    '/coating',
    '/contact',
    '/insights',
    '/quality-certification',
    '/technology',
    '/technology/uv-coating',
    '/technology/vacuum-metallizing',
    '/industries/beauty-cosmetics',
    '/industries/electronics',
    '/industries/fashion',
    '/industries/accecories',
    '/industries/home-lifestyle',
    '/industries/automotive',
    '/industries/foot-wear',
    '/industries/many-more',
    '/sitemap',
    '/portfolio',
    ...articleSlugs
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((lang) => {
      // Map alternate languages
      const languagesAlternate: Record<string, string> = {};
      locales.forEach((l) => {
        // Hreflang code for Japanese is 'ja' but the path segment is 'jp'
        const hreflang = l === 'jp' ? 'ja' : l;
        languagesAlternate[hreflang] = `${siteUrl}/${l}${route}`;
      });

      // Add x-default pointing to the default language (id)
      languagesAlternate['x-default'] = `${siteUrl}/id${route}`;

      sitemapEntries.push({
        url: `${siteUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/insights' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route.startsWith('/industries') || route.startsWith('/technology') ? 0.9 : 0.8,
        alternates: {
          languages: languagesAlternate,
        },
      });
    });
  });

  return sitemapEntries;
}
