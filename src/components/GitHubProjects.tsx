import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, Code2 } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

const demoProjects = [
  {
    id: 1,
    name: "Portfolio-Digital",
    description: "Portfolio personnel présentant mes projets et compétences en communication digitale et marketing.",
    html_url: "https://www.linkedin.com/in/rodrigue-gbadou/",
    stargazers_count: 5,
    language: "React"
  },
  {
    id: 2,
    name: "Bande-Annonce-Project",
    description: "Projet collaboratif de création d'une bande annonce captivante.",
    html_url: "https://youtu.be/hLpx2YvBJ6k",
    stargazers_count: 4,
    language: "Video Production"
  },
  {
    id: 3,
    name: "Digital-Marketing-Tools",
    description: "Collection d'outils et de ressources pour le marketing digital et la communication.",
    html_url: "https://www.linkedin.com/in/rodrigue-gbadou/",
    stargazers_count: 3,
    language: "Marketing"
  }
];

export default function GitHubProjects() {
  const [repos, setRepos] = useState<Repository[]>(demoProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (loading) return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
  );

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Mes Projets
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Découvrez mes dernières réalisations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Github className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {repo.name.replace(/-/g, ' ')}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-[3rem]">
                {repo.description || 'Pas de description'}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Code2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">
                    {repo.language}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-gray-500 dark:text-gray-400">
                    {repo.stargazers_count}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
