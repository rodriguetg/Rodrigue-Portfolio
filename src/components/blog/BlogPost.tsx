import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Share2, Twitter, Facebook, Linkedin, ArrowLeft } from 'lucide-react';
import { BlogPost as BlogPostType } from '../../types/BlogTypes';

const SAMPLE_POST: BlogPostType = {
  id: 1,
  title: "Les tendances du développement web en 2024",
  excerpt: "Découvrez les technologies et frameworks qui domineront le développement web cette année.",
  content: `
    <h2>L'évolution du développement web</h2>
    <p>Le développement web continue d'évoluer rapidement, avec de nouvelles technologies et approches qui émergent constamment...</p>
    
    <h3>1. Les frameworks JavaScript modernes</h3>
    <p>React, Vue, et Angular continuent de dominer le paysage, mais de nouveaux challengers apparaissent...</p>
    
    <h3>2. L'importance croissante de la performance</h3>
    <p>La vitesse de chargement et l'optimisation deviennent des critères de plus en plus cruciaux...</p>
    
    <h3>3. L'accessibilité au premier plan</h3>
    <p>Les développeurs accordent une attention particulière à l'accessibilité de leurs applications...</p>
  `,
  author: {
    name: "John Doe",
    avatar: "/images/avatar1.jpg",
    role: "Senior Developer"
  },
  date: "15 Jan 2024",
  readTime: "5 min",
  tags: ["Web Dev", "Tendances"],
  image: "/images/blog1.jpg",
  slug: "tendances-dev-web-2024"
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = SAMPLE_POST;

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-800">
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          {/* Bouton retour */}
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux articles
          </Link>

          {/* En-tête de l'article */}
          <header className="mb-12">
            <div className="flex gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-primary-500 text-white px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {post.title}
            </h1>
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm">{post.author.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
                <span>{post.date}</span>
              </div>
            </div>
          </header>

          {/* Image principale */}
          <div className="mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          {/* Contenu de l'article */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Actions sociales */}
          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-12">
            <SocialActions postId={post.id} initialLikes={42} initialComments={12} />
          </div>

          {/* Section commentaires */}
          <Comments postId={post.id} />
        </div>
      </motion.article>
    </div>
  );
};
