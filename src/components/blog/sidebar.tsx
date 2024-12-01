import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const categories = [
  {
    title: 'All Posts',
    href: '/blog',
  },
  {
    title: 'Tutorials',
    href: '/blog/tutorials',
  },
  {
    title: 'Guides',
    href: '/blog/guides',
  },
  {
    title: 'News',
    href: '/blog/news',
  },
];

export function BlogSidebar() {
  const pathname = usePathname();

  return (
    <div className="relative overflow-hidden px-3 py-4">
      <div className="space-y-4">
        <div className="py-2">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            Categories
          </h4>
          <div className="grid grid-flow-row auto-rows-max text-sm">
            {categories.map(category => (
              <Link
                key={category.href}
                href={category.href}
                className={cn(
                  'flex w-full items-center rounded-md p-2 hover:underline',
                  pathname === category.href
                    ? 'font-medium text-primary'
                    : 'text-muted-foreground',
                )}
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
