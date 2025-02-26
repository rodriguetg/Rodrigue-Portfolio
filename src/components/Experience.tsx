import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Share2, Search } from 'lucide-react';

const experiences = [
  {
    title: "Stage - SEO",
    company: "InnovQube",
    type: "Stage",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: Search,
    tasks: [
      "SEO et analyse de mots-clés",
      "Optimisation on-page",
      "Création de contenu optimisé",
      "Suivi des performances avec SEMrush et Google Analytics"
    ]
  },
  {
    title: "Stage : Marketing digital ET SEO",
    company: "Marketkit",
    type: "Stage",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: Briefcase,
    tasks: [
      "Suivre les performances, reporting et analyse des KPI's",
      "Conception de stratégies d'optimisation SEO (positionnement, trafic et conversions)",
      "Utilisation et intégration d'outil IA"
    ]
  },
  {
    title: "CHEF DE PROJET SOCIAL MEDIA ET COMMUNICATION",
    company: "STUDHELP",
    type: "Stage",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: Users,
    tasks: [
      "Création de contenu (images, audio, vidéo) pour les réseaux sociaux",
      "Participations à l'organisation de projet de distribution alimentaire",
      "Mise en place du calendrier éditorial",
      "Mise en place de calendrier évènementiel"
    ]
  },
  {
    title: "FREELANCE COMMUNITY MANAGER",
    company: "Les Cinéphiles",
    type: "Freelance",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: Share2,
    tasks: [
      "Création de contenus audio et vidéos",
      "Mise en place de projet de partenariat avec d'autres pages d'autorités"
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Expérience Professionnelle
          </h2>
          <p className="text-lg text-gray-600">Mon parcours dans la communication digitale</p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative h-48 md:h-full rounded-xl overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-all duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                      <exp.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-lg text-purple-600">{exp.company}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <ul className="space-y-2">
                          {exp.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}