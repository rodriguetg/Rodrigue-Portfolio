import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, X, Loader2 } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Veuillez entrer votre email');
      return;
    }

    setStatus('loading');

    // Simuler un appel API (à remplacer par votre véritable API)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setMessage('Merci de votre inscription !');
      setEmail('');
      
      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6 text-primary-500" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Newsletter
        </h3>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Abonnez-vous pour recevoir mes derniers articles et actualités directement dans votre boîte mail.
      </p>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={status === 'loading' || status === 'success'}
        />

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="mt-4 w-full bg-primary-500 hover:bg-primary-600 
                   text-white font-medium py-3 px-6 rounded-lg
                   transition-colors duration-200
                   disabled:opacity-60 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Inscription en cours...
            </>
          ) : status === 'success' ? (
            <>
              <Check className="w-5 h-5" />
              Inscrit !
            </>
          ) : (
            "S'abonner"
          )}
        </button>
      </form>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
              status === 'error'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            }`}
          >
            {status === 'error' ? (
              <X className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5" />
            )}
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Pas de spam, uniquement des articles pertinents. Vous pouvez vous désabonner à tout moment.
      </p>
    </div>
  );
};
