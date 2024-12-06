import React, { useState } from 'react';

const ManualVerification: React.FC = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Code de vérification manuelle
    const validCode = '123456'; // À remplacer par votre code réel
    
    if (code === validCode) {
      setMessage('Code valide !');
    } else {
      setMessage('Code invalide. Veuillez réessayer.');
    }
  };

  return (
    <section className="py-16 bg-gray-50" id="verification">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Vérification Manuelle</h2>
        
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleVerification} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Entrez le code de vérification
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Entrez le code"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Vérifier
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded ${message.includes('valide !') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManualVerification;
