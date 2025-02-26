import { Helmet } from 'react-helmet';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  author?: string;
}

export function SEO({
  title = 'Rodrigue GBADOU',
  description = 'Expert en Intelligence Artificielle, SEO et Marketing Digital | Portfolio professionnel présentant mes projets et compétences',
  image = '/og-image.jpg',
  url = 'https://rodrigue-portfolio.vercel.app',
  type = 'website',
  keywords = [
    'Intelligence Artificielle',
    'Marketing Digital',
    'SEO',
    'Réseaux Sociaux',
    'Gestion de Projet',
    'Portfolio',
    'No Code',
    'Web Development',
    'Rodrigue GBADOU'
  ],
  author = 'Rodrigue GBADOU'
}: SEOProps) {
  const { locale } = useLanguage();
  const siteTitle = `${title} | Portfolio`;
  const canonicalUrl = `${url}${locale === 'en' ? '/en' : ''}`;

  return (
    <Helmet>
      <html lang={locale} />
      <title>{siteTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      
      {/* Métadonnées de base */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Performance et SEO avancé */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="/fonts/main-font.woff2" crossOrigin="anonymous" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:site_name" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@votrecompte" />

      {/* Autres métadonnées importantes */}
      <meta name="theme-color" content="#ffffff" />
      <link rel="alternate" hrefLang="fr" href={`${url}`} />
      <link rel="alternate" hrefLang="en" href={`${url}/en`} />
      <link rel="alternate" hrefLang="x-default" href={`${url}`} />
      
      {/* Structured Data / Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Person",
          "name": author,
          "url": url,
          "sameAs": [
            "https://www.linkedin.com/in/rodrigue-gbadou/",
            "https://github.com/rodriguetg"
          ],
          "jobTitle": "Expert en Intelligence Artificielle et Marketing Digital",
          "image": image,
          "description": description,
          "knowsAbout": ["SEO", "Marketing Digital", "Intelligence Artificielle", "Web Development", "No Code"]
        })}
      </script>
    </Helmet>
  );
}
