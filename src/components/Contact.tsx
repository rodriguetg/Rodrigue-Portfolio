import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Contactez-moi
          </h2>
          <p className="text-lg text-gray-600">Discutons de votre projet</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <a href="mailto:rodrigue.gbadou@gmail.com" className="text-purple-600 hover:text-purple-700">
                  rodrigue.gbadou@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Téléphone</h3>
                <a href="tel:0753982480" className="text-purple-600 hover:text-purple-700">
                  07 53 98 24 80
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Localisation</h3>
                <p className="text-gray-600">Strasbourg, France</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                <Linkedin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">LinkedIn</h3>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                  Voir le Profil
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all"
            >
              Envoyer le Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}