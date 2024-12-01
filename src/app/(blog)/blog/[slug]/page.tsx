import { notFound } from 'next/navigation';

import { Meta } from '@/components/seo/meta';
import type { BlogPost } from '@/types/blog';

// This would typically come from your CMS or API
const posts: Record<string, BlogPost> = {
  'getting-started': {
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
};

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = posts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <>
      <Meta
        title={post.title}
        description={post.description}
        image={post.image}
        type="article"
        date={post.date}
      />
      <article className="mx-auto max-w-3xl py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time>
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
        </div>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="mb-8 rounded-lg"
          />
        )}
        <div className="prose prose-slate max-w-none">
          {post.content}
        </div>
      </article>
    </>
  );
}
