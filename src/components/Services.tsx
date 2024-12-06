import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Smartphone, 
  Layout, 
  Database, 
  Cloud,
  Search,
  Shield,
  Zap,
  ChevronRight
} from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Développement Web Full Stack",
    description: "Création d'applications web complètes et performantes",
    icon: <Code2 size={40} />,
    color: "from-blue-400 to-blue-600",
    details: [
      "Applications React/Vue.js modernes",
      "APIs RESTful et GraphQL",
      "Bases de données SQL et NoSQL",
      "Architecture microservices"
    ]
  },
  {
    id: 2,
    title: "Développement Mobile",
    description: "Applications mobiles natives et cross-platform",
    icon: <Smartphone size={40} />,
    color: "from-green-400 to-green-600",
    details: [
      "Applications React Native",
      "UI/UX mobile optimisée",
      "Intégration API natives",
      "Publication sur les stores"
    ]
  },
  {
    id: 3,
    title: "Architecture Cloud",
    description: "Solutions cloud scalables et sécurisées",
    icon: <Cloud size={40} />,
    color: "from-purple-400 to-purple-600",
    details: [
      "Architecture AWS/Azure",
      "Containerisation Docker",
      "Orchestration Kubernetes",
      "CI/CD automatisé"
    ]
  },
  {
    id: 4,
    title: "Optimisation & Performance",
    description: "Amélioration des performances et de l'expérience utilisateur",
    icon: <Zap size={40} />,
    color: "from-yellow-400 to-yellow-600",
    details: [
      "Optimisation du temps de chargement",
      "SEO technique",
      "Performance monitoring",
      "Optimisation des ressources"
    ]
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Services & Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Des solutions sur mesure pour vos projets digitaux
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: service.id * 0.1 }}
              className="relative group"
            >
              <div
                className={`h-full rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedService === service.id
                    ? 'bg-gradient-to-r ' + service.color + ' text-white transform scale-105'
                    : 'bg-white dark:bg-gray-700 hover:shadow-xl'
                }`}
                onClick={() => setSelectedService(
                  selectedService === service.id ? null : service.id
                )}
              >
                {/* Icon et Titre */}
                <div className="flex items-center mb-4">
                  <div className={`${
                    selectedService === service.id
                      ? 'text-white'
                      : 'text-primary-500 dark:text-primary-400'
                  }`}>
                    {service.icon}
                  </div>
                </div>

                <h3 className={`text-xl font-semibold mb-2 ${
                  selectedService === service.id
                    ? 'text-white'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {service.title}
                </h3>

                <p className={`mb-4 ${
                  selectedService === service.id
                    ? 'text-white/90'
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {service.description}
                </p>

                {/* Détails */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: selectedService === service.id ? 'auto' : 0,
                    opacity: selectedService === service.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 mt-4">
                    {service.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <ChevronRight size={16} className="mr-2" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Indicateur d'expansion */}
                <div className={`absolute bottom-4 right-4 transition-transform duration-300 ${
                  selectedService === service.id ? 'rotate-180' : ''
                }`}>
                  <ChevronRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
