import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Globe, Laptop, Users, Brain } from 'lucide-react';

const skillCategories = [
  {
    title: "Intelligence Artificielle",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    skills: [
      "Make AI",
      "Windsurf AI",
      "Bolt AI",
      "Perplexity AI",
      "ChatGPT",
      "Claude AI",
      "Prompt Engineering"
    ]
  },
  {
    title: "Compétences Digitales",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    skills: [
      "SEO & Optimisation Web",
      "Gestion des Réseaux Sociaux",
      "Création de Contenu",
      "Développement WordPress",
      "Google Analytics",
      "Search Console",
      "Semrush"
    ]
  },
  {
    title: "Maîtrise Logicielle",
    icon: Laptop,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    skills: [
      "Suite Microsoft Office",
      "Canva",
      "iMovie",
      "CapCut",
      "OpenShot Video Editor",
      "Remove.bg",
      "Amadeus"
    ]
  },
  {
    title: "Compétences Professionnelles",
    icon: Users,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    skills: [
      "Gestion de Projet",
      "Relations Client",
      "Travail d'Équipe",
      "Planification Stratégique",
      "Résolution de Problèmes",
      "Gestion du Temps",
      "Communication"
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Compétences & Expertise
          </h2>
          <p className="text-lg text-gray-600">Vue d'ensemble de mes capacités professionnelles</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <category.icon className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.2) + (skillIndex * 0.1) }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}