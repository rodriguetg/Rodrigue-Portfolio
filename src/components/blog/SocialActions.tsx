import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Twitter, Facebook, LinkedIn, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialActionsProps {
  postId: number;
  initialLikes?: number;
  initialComments?: number;
}

export const SocialActions: React.FC<SocialActionsProps> = ({
  postId,
  initialLikes = 0,
  initialComments = 0,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Découvrez cet article intéressant !";
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setShowCopiedToast(true);
          setTimeout(() => setShowCopiedToast(false), 2000);
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  return (
    <div className="flex items-center gap-4 relative">
      <button
        onClick={handleLike}
        className={`flex items-center gap-1 transition-colors ${
          isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
        }`}
      >
        <motion.div
          whileTap={{ scale: 0.8 }}
          animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </motion.div>
        <span>{likes}</span>
      </button>

      <button className="flex items-center gap-1 text-gray-500 hover:text-primary-500">
        <MessageCircle className="w-5 h-5" />
        <span>{initialComments}</span>
      </button>

      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center gap-1 text-gray-500 hover:text-primary-500"
        >
          <Share2 className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
            >
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LinkedIn className="w-4 h-4" />
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LinkIcon className="w-4 h-4" />
                Copier le lien
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showCopiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 -top-12 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
          >
            Lien copié !
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
