import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://starpack.co.id';
  
  const routes = [
    '',
    '/about',
    '/contact',
    '/insights',
    '/quality-certification',
    '/technology',
    '/technology/uv-coating',
    '/technology/vacuum-metallizing',
    '/industries/beauty-cosmetics',
    '/industries/electronics',
    '/industries/fashion-accessories',
    '/industries/home-lifestyle',
    '/industries/automotive',
    '/industries/many-more',
    '/sitemap'
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/insights' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/industries') || route.startsWith('/technology') ? 0.9 : 0.8,
  }));
}
