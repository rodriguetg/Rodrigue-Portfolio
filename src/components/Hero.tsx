import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, GraduationCap, Briefcase, Users, Award, Code, Camera, PenTool } from 'lucide-react';
import { Typewriter } from './ui/Typewriter';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface HeroProps {
  onNavigate?: (sectionId: string) => void;
}

interface Statistic {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const statistics: Statistic[] = [
  {
    icon: <Briefcase className="w-6 h-6" />,
    value: "5+",
    label: "Années d'expérience",
    color: "bg-blue-500"
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "190K+",
    label: "Abonnés gérés",
    color: "bg-green-500"
  },
  {
    icon: <Award className="w-6 h-6" />,
    value: "50+",
    label: "Projets réalisés",
    color: "bg-purple-500"
  },
  {
    icon: <Code className="w-6 h-6" />,
    value: "10+",
    label: "Technologies maîtrisées",
    color: "bg-orange-500"
  }
];

const skillBadges = [
  { name: "No Code", icon: <Code className="w-4 h-4" />, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { name: "IA", icon: <Award className="w-4 h-4" />, color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200" },
  { name: "Marketing Digital", icon: <PenTool className="w-4 h-4" />, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  { name: "Production Vidéo", icon: <Camera className="w-4 h-4" />, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  { name: "Community Management", icon: <Users className="w-4 h-4" />, color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" }
];

export default function Hero({ onNavigate }: HeroProps) {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  const handleScroll = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  // Animation des statistiques
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % statistics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" ref={elementRef} className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary-200 dark:bg-primary-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 right-4 w-72 h-72 bg-primary-300 dark:bg-primary-800/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Rodrigue GBADOU
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-semibold mb-6">
                Brand Content & Marketing Digital
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Passionné par la création de contenu et la stratégie digitale, je développe des solutions marketing innovantes et impactantes.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {skillBadges.map((badge, index) => (
                  <span
                    key={badge.name}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}
                  >
                    {badge.icon}
                    <span className="ml-1">{badge.name}</span>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleScroll('about')}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={() => handleScroll('contact')}
                  className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900"
                >
                  Me contacter
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStatIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className={`w-12 h-12 ${statistics[currentStatIndex].color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                      {statistics[currentStatIndex].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {statistics[currentStatIndex].value}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {statistics[currentStatIndex].label}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Formation</h3>
                  <p className="text-gray-600 dark:text-gray-300">Mastère Brand Content et Marketing Digital</p>
                </motion.div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Expérience</h3>
                <p className="text-gray-600 dark:text-gray-300">5 ans</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}