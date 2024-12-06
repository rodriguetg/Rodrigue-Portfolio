import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ThumbsUp, MoreVertical } from 'lucide-react';

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsProps {
  postId: number;
}

const SAMPLE_COMMENTS: Comment[] = [
  {
    id: 1,
    author: {
      name: "Marie Laurent",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    content: "Super article ! J'ai particulièrement apprécié la partie sur les nouvelles tendances.",
    date: "Il y a 2 heures",
    likes: 5,
    replies: [
      {
        id: 2,
        author: {
          name: "Thomas Martin",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        content: "Totalement d'accord ! Les exemples sont très pertinents.",
        date: "Il y a 1 heure",
        likes: 2
      }
    ]
  },
  {
    id: 3,
    author: {
      name: "Sophie Dubois",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    content: "Est-ce que vous pourriez développer davantage la partie sur les frameworks ?",
    date: "Il y a 3 heures",
    likes: 3
  }
];

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>(SAMPLE_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleSubmitComment = (e: React.FormEvent, parentId?: number) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now(),
      author: {
        name: "Utilisateur",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      content: newComment,
      date: "À l'instant",
      likes: 0
    };

    if (parentId) {
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === parentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newCommentObj]
              }
            : comment
        )
      );
    } else {
      setComments(prev => [newCommentObj, ...prev]);
    }

    setNewComment('');
    setReplyingTo(null);
  };

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${isReply ? 'ml-12 mt-4' : 'mb-6'}`}
    >
      <img
        src={comment.author.avatar}
        alt={comment.author.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {comment.author.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {comment.date}
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
        </div>
        <div className="flex gap-4 mt-2 text-sm">
          <button className="flex items-center gap-1 text-gray-500 hover:text-primary-500">
            <ThumbsUp className="w-4 h-4" />
            {comment.likes}
          </button>
          <button
            onClick={() => setReplyingTo(comment.id)}
            className="text-gray-500 hover:text-primary-500"
          >
            Répondre
          </button>
        </div>

        {replyingTo === comment.id && (
          <form
            onSubmit={(e) => handleSubmitComment(e, comment.id)}
            className="mt-4"
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Écrire une réponse..."
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={2}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Répondre
              </button>
            </div>
          </form>
        )}

        {comment.replies?.map(reply => (
          <CommentComponent key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        Commentaires ({comments.length})
      </h3>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Écrire un commentaire..."
          className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Commenter
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
