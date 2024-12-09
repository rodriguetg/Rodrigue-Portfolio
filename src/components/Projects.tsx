import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyImage } from './ui/LazyImage';
import { Github, ExternalLink, Code2, Linkedin, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
  linkedinLink?: string;
  demoLink: string;
  category: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Love Chat Assistant - Chatbot IA",
    description: "Un chatbot intelligent spécialisé dans les conseils amoureux, utilisant l'intelligence artificielle pour offrir des conseils personnalisés et bienveillants.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    technologies: ["React", "Node.js", "OpenAI", "Express", "TailwindCSS"],
    liveLink: "https://love-chat-assistant-1.onrender.com/",
    demoLink: "https://love-chat-assistant-1.onrender.com/",
    category: ["Web", "IA", "FullStack"]
  },
  {
    id: 2,
    title: "Bande Annonce - Projet Vidéo",
    description: "Création collaborative d'une bande annonce captivante, démontrant nos compétences en production vidéo et storytelling.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    technologies: ["Production Vidéo", "Montage", "Storytelling", "Travail d'équipe"],
    liveLink: "https://youtu.be/hLpx2YvBJ6k",
    demoLink: "https://youtu.be/hLpx2YvBJ6k",
    category: ["Vidéo", "Création"]
  },
  {
    id: 3,
    title: "E-commerce Modern",
    description: "Une plateforme e-commerce moderne avec panier d'achat, paiement en ligne et gestion des commandes.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    linkedinLink: "https://www.linkedin.com/in/rodrigue-gbadou/",
    demoLink: "https://preview.themeforest.net/item/shofy-react-next-js-ecommerce-template/full_screen_preview/45051288",
    category: ["Web", "Frontend", "Backend"]
  },
  {
    id: 4,
    title: "Application de Gestion",
    description: "Système de gestion des ressources et des projets avec tableaux de bord en temps réel.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    linkedinLink: "https://www.linkedin.com/in/rodrigue-gbadou/",
    demoLink: "https://preview.themeforest.net/item/dashcode-react-redux-admin-dashboard-template/full_screen_preview/42434784",
    category: ["Web", "FullStack"]
  },
  {
    id: 5,
    title: "Application Mobile",
    description: "Application mobile de suivi de fitness avec synchronisation cloud.",
    image: "https://images.unsplash.com/photo-1526502900331-3a3e89110bb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    technologies: ["React Native", "Firebase", "TypeScript"],
    linkedinLink: "https://www.linkedin.com/in/rodrigue-gbadou/",
    demoLink: "https://preview.themeforest.net/item/fitclub-gym-fitness-mobile-app-ui-kit/full_screen_preview/42274870",
    category: ["Mobile", "Frontend"]
  }
];

const categories = ["Tous", "Web", "Mobile", "Vidéo", "Frontend", "Backend", "FullStack", "Création", "IA"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project =>
    selectedCategory === "Tous" ? true : project.category.includes(selectedCategory)
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowDemo(true);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mes Projets
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Découvrez mes réalisations récentes
          </p>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-700">
                  {/* Image du projet */}
                  <div className="relative aspect-video">
                    <LazyImage
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Overlay au survol */}
                    <div className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    } flex flex-col items-center justify-center gap-4`}>
                      <span className="text-white text-lg font-semibold">Cliquez pour voir la démo</span>
                      <div className="flex items-center gap-4">
                        {project.linkedinLink && (
                          <a
                            href={project.linkedinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Linkedin className="w-6 h-6" />
                          </a>
                        )}
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-6 h-6" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Contenu du projet */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    
                    {/* Technologies utilisées */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          <Code2 className="w-4 h-4 inline-block mr-1" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal de démo */}
        {showDemo && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setShowDemo(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4">
                {selectedProject.id === 1 ? (
                  // Intégration de la vidéo YouTube pour le projet vidéo
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/hLpx2YvBJ6k"
                      title="Bande Annonce"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  // Pour les autres projets, afficher un lien vers la démo
                  <div className="text-center py-8">
                    <a
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Voir la démo en direct
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
