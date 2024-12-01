import { BlogCard } from '@/components/blog/card';
import { Meta } from '@/components/seo/meta';
import type { BlogPost } from '@/types/blog';

// This would typically come from your CMS or API
const posts: BlogPost[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Our SaaS',
    description: 'Learn how to get started with our platform in minutes.',
    date: '2024-01-01',
    content: '...',
    author: {
      name: 'John Doe',
      image: '/authors/john.jpg',
    },
    image: '/blog/getting-started.jpg',
    tags: ['tutorial', 'beginners'],
    readingTime: '5 min read',
  },
  // Add more posts...
];

export default function BlogPage() {
  return (
    <>
      <Meta
        title="Blog - SaaS Platform"
        description="Latest articles and tutorials"
      />
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">
            Latest articles and tutorials
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
