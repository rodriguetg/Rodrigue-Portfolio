import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export const SEOHead: React.FC<SEOProps> = ({
  title = "Rodrigue GBADOU - Portfolio",
  description = "Portfolio professionnel de Rodrigue GBADOU - Développeur Full Stack",
  keywords = "développeur, full stack, react, typescript, portfolio",
  image = "/og-image.jpg" // Assurez-vous d'ajouter une image par défaut dans le dossier public
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Autres meta tags importants */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href="https://votresite.com" />
    </Helmet>
  );
};
