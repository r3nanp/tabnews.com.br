import { getServerSideSitemap } from 'next-sitemap';

/** @type {import('next').GetServerSideProps} */
export async function getServerSideProps(ctx) {
  const response = await fetch('/api/v1/contents');
  const allContents = await response.json();

  const fields = allContents.map((content) => {
    /** @type {import('next-sitemap').ISitemapField} */
    const field = {
      loc: `/${content.owner_username}/${content.slug}`,
      lastmod: content.updated_at,
      changefreq: 'daily',
      priority: 1,
    };

    return field;
  });

  return getServerSideSitemap(ctx, fields);
}

export default function Sitemap() {
  // Just an empty page to generate the sitemap content via getServerSideProps
  return null;
}
