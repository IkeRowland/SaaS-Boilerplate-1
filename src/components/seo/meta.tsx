import Head from 'next/head';
import { useRouter } from 'next/router';

import { siteConfig } from '@/config/site';

type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
};

export function Meta({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  type = 'website',
  date,
}: MetaProps) {
  const router = useRouter();
  const url = `${siteConfig.url}${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article specific */}
      {date && <meta property="article:published_time" content={date} />}
    </Head>
  );
}
