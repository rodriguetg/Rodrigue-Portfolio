import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = 'Mon Portfolio',
  description = 'Portfolio personnel présentant mes projets et compétences en développement web',
  image = '/og-image.jpg',
  url = 'https://votre-domaine.com',
  type = 'website'
}: SEOProps) {
  const siteTitle = `${title} | Portfolio`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
