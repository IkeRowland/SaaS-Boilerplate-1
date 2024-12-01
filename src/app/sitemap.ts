import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/blog',
    '/pricing',
    '/about',
    '/contact',
  ].map(route => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  // Add blog posts
  const posts = [
    'getting-started',
    // Add more post slugs...
  ].map(slug => ({
    url: `${siteConfig.url}/blog/${slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
}
