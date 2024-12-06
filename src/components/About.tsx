import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Users, Globe2 } from 'lucide-react';

const qualities = [
  {
    icon: Users,
    title: "Proactivité",
    description: "Prise d'initiative et adaptation rapide aux nouvelles situations"
  },
  {
    icon: Award,
    title: "Créativité",
    description: "Innovation dans la création de contenu digital"
  },
  {
    icon: Globe2,
    title: "Communication",
    description: "Excellence relationnelle et sens du contact"
  },
  {
    icon: BookOpen,
    title: "Apprentissage",
    description: "Veille technologique et formation continue"
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            À propos
          </h2>
          <div className="w-20 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Je m'appelle Rodrigue GBADOU. Créatif, perfectionniste et persévérant, je suis toujours en quête de nouveaux défis. Depuis septembre 2024, j'ai intégré un Mastère Brand Content et Marketing Digital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualities.map((quality, index) => (
            <motion.div
              key={quality.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                  <quality.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {quality.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {quality.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                À propos de mon parcours
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Actuellement en Master 1 Communication Digitale, je me spécialise dans le développement web et la création de contenu digital.
                Mon objectif est de combiner mes compétences techniques et créatives pour concevoir des solutions innovantes.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-3"></span>
                  Master 1 Communication Digitale
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-3"></span>
                  Projets web full-stack
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-3"></span>
                  Création de contenu digital
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-primary-600/20 dark:from-primary-900/30 dark:to-primary-700/30 rounded-lg transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Espace de travail"
                className="relative rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}