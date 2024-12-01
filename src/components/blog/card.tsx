import Image from 'next/image';
import Link from 'next/link';

import type { BlogPost } from '@/types/blog';

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col space-y-2">
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={804}
          height={452}
          className="rounded-md border bg-muted transition-colors"
          priority={false}
        />
      )}
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-muted-foreground">{post.description}</p>
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <time dateTime={post.date}>{post.date}</time>
        {post.readingTime && <span>{post.readingTime}</span>}
      </div>
      <Link href={`/blog/${post.slug}`} className="absolute inset-0">
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
}
