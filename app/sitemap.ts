import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Core pages
  const routes = [
    '',
    '/shop',
    '/about',
    '/innovation',
    '/fame-network',
    '/news',
    '/faq',
    '/sustainability',
    '/contact',
    '/careers',
    '/investors',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
    '/cookie-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '/shop' || route === '/news' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1 : route === '/shop' ? 0.9 : 0.7,
  }));

  // Note: For a real production app with hundreds of products, 
  // you would fetch product IDs from the database here and map them.
  // Example dynamic product routes:
  /*
  const products = await db.select({ id: products.id }).from(products);
  const productRoutes = products.map(p => ({
    url: `${baseUrl}/shop/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  return [...routes, ...productRoutes];
  */

  return routes;
}
