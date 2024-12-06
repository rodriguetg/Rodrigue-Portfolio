import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '../../types/BlogTypes';

interface BlogSearchProps {
  posts: BlogPost[];
  onSearch: (filteredPosts: BlogPost[]) => void;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({ posts, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extraire tous les tags uniques des posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  // Filtrer les posts en fonction de la recherche et des tags
  useEffect(() => {
    const filtered = posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });

    onSearch(filtered);
  }, [searchTerm, selectedTags, posts, onSearch]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un article..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 pr-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
