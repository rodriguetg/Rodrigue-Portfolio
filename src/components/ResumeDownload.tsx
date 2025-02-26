import React, { useState } from 'react';

interface ResumeDownloadProps {
  cvUrl?: string;
}

const ResumeDownload: React.FC<ResumeDownloadProps> = ({
  cvUrl = '/CV_Rodrigue_GBADOU.pdf'
}) => {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <section id="resume" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mon CV
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Consultez mon parcours complet et mes compétences en détail
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Télécharger mon CV
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Découvrez mon parcours, mes compétences et mes réalisations
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={cvUrl}
                  download
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Télécharger le CV
                </a>
                <button
                  onClick={() => setShowPdf(!showPdf)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {showPdf ? 'Masquer l\'aperçu' : 'Consulter en ligne'}
                </button>
              </div>
            </div>
            
            <div className="relative w-40 h-56 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">📄</div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">CV</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rodrigue GBADOU</p>
              </div>
            </div>
          </div>
          
          {showPdf && (
            <div className="mt-8">
              <div className="w-full h-[600px] overflow-hidden rounded-lg shadow-lg bg-white">
                <iframe
                  src={`${cvUrl}#view=FitH`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title="Aperçu du CV"
                >
                  <p className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded">
                    Votre navigateur ne supporte pas l'affichage intégré des PDFs.
                    <a 
                      href={cvUrl} 
                      download
                      className="text-primary-600 hover:underline ml-2"
                    >
                      Télécharger le CV
                    </a>
                  </p>
                </iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeDownload;
