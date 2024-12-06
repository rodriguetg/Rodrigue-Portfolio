import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from './blog/BlogCard';
import { BlogSearch } from './blog/BlogSearch';
import { Newsletter } from './blog/Newsletter';
import { BlogPost } from '../types/BlogTypes';

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Les tendances du développement web en 2024",
    excerpt: "Découvrez les technologies et frameworks qui domineront le développement web cette année.",
    content: `
      <h2>L'évolution du développement web</h2>
      <p>Le développement web continue d'évoluer rapidement, avec de nouvelles technologies et approches qui émergent constamment...</p>
    `,
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "Senior Developer"
    },
    date: "15 Jan 2024",
    readTime: "5 min",
    tags: ["Web Dev", "Tendances"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
    slug: "tendances-dev-web-2024"
  },
  {
    id: 2,
    title: "Guide complet de React 18",
    excerpt: "Tout ce que vous devez savoir sur les nouvelles fonctionnalités de React 18.",
    content: `
      <h2>React 18 : Une nouvelle ère</h2>
      <p>React 18 apporte de nombreuses améliorations et nouvelles fonctionnalités...</p>
    `,
    author: {
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "React Expert"
    },
    date: "10 Jan 2024",
    readTime: "8 min",
    tags: ["React", "JavaScript"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    slug: "guide-react-18"
  },
  {
    id: 3,
    title: "L'impact de l'IA sur le développement",
    excerpt: "Comment l'intelligence artificielle transforme le métier de développeur.",
    content: `
      <h2>L'IA et le développement</h2>
      <p>L'intelligence artificielle révolutionne la façon dont nous développons...</p>
    `,
    author: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "AI Developer"
    },
    date: "5 Jan 2024",
    readTime: "6 min",
    tags: ["IA", "Innovation"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    slug: "impact-ia-developpement"
  },
  {
    id: 4,
    title: "Optimisation des performances Web",
    excerpt: "Techniques avancées pour améliorer la vitesse de votre site web.",
    content: `
      <h2>Performance Web</h2>
      <p>La performance est cruciale pour l'expérience utilisateur...</p>
    `,
    author: {
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "Performance Expert"
    },
    date: "1 Jan 2024",
    readTime: "7 min",
    tags: ["Performance", "Web"],
    image: "https://images.unsplash.com/photo-1460925895917-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2015&q=80",
    slug: "optimisation-performances-web"
  }
];

export default function Blog() {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(SAMPLE_POSTS);

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Blog
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Découvrez nos derniers articles sur le développement web et la technologie
          </p>

          {/* Composant de recherche */}
          <BlogSearch posts={SAMPLE_POSTS} onSearch={setFilteredPosts} />

          {/* Grille d'articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">
                Aucun article ne correspond à votre recherche.
              </p>
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-16">
            <Newsletter />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
