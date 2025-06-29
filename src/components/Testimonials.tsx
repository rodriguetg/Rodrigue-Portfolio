import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jean Dupont",
    role: "Chef de Projet",
    company: "Tech Solutions",
    content: "Rodrigue a fait preuve d'une excellente capacité d'adaptation et d'une grande créativité dans la résolution de problèmes complexes. Son expertise technique et sa facilité à communiquer ont été des atouts majeurs pour notre projet.",
    image: "/testimonials/person1.jpg" // À remplacer par vos images
  },
  {
    id: 2,
    name: "Marie Laurent",
    role: "Directrice Technique",
    company: "Digital Innovation Labs",
    content: "J'ai eu le plaisir de travailler avec Rodrigue sur plusieurs projets critiques. Sa rigueur technique et sa capacité à livrer dans les délais font de lui un développeur exceptionnel.",
    image: "/testimonials/person2.jpg"
  },
  {
    id: 3,
    name: "Thomas Martin",
    role: "Lead Developer",
    company: "WebTech Pro",
    content: "La contribution de Rodrigue à notre équipe a été remarquable. Son expertise en React et son approche méthodique du développement ont grandement amélioré la qualité de nos produits.",
    image: "/testimonials/person3.jpg"
  }
];

export default function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);

  return (
    <section id="testimonials" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Appréciations
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Ce que disent mes collaborateurs et clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: testimonial.id * 0.2 }}
              className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 relative ${
                selectedTestimonial === testimonial.id ? 'transform scale-105' : ''
              }`}
              onClick={() => setSelectedTestimonial(
                selectedTestimonial === testimonial.id ? null : testimonial.id
              )}
            >
              <div className={`absolute -top-4 left-8 ${
                selectedTestimonial === testimonial.id ? 'bg-primary-600' : 'bg-primary-500'
              } rounded-full p-2`}>
                <Quote className="w-6 h-6 text-white" />
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6 mt-4 italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/150'; // Image par défaut si l'image n'existe pas
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role} - {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
