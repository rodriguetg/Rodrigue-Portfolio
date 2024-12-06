import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { BlogPost } from '../../types/BlogTypes';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-primary-500 text-white px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
