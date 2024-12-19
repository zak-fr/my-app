'use client';

import { useState } from 'react';

interface Comment {
  id: number;
  commentator: string;
  content: string;
  date: Date;
  status: 'Done' | 'In Progress';
}

interface CommentsPageProps {
  initialComments?: Comment[];
}

export default function CommentsPage({ initialComments = [] }: CommentsPageProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newCommentator, setNewCommentator] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newStatus, setNewStatus] = useState<'Done' | 'In Progress'>('In Progress');

  const addComment = () => {
    if (newCommentator.trim() && newContent.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        commentator: newCommentator,
        content: newContent,
        date: new Date(),
        status: newStatus,
      };

      setComments([...comments, newComment]);
      setNewCommentator('');
      setNewContent('');
      setNewStatus('In Progress');
    }
  };

  const removeComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Comments</h1>
      <p className="text-gray-600 mb-6">Manage your comments below.</p>
      <div className="mt-4 flex items-center space-x-2">
        <input 
          type="text" 
          value={newCommentator} 
          onChange={(e) => setNewCommentator(e.target.value)} 
          className="border border-gray-300 bg-white rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 h-10"
          placeholder="Commentator name"
        />
        <textarea 
          value={newContent} 
          onChange={(e) => setNewContent(e.target.value)} 
          className="border border-gray-300 bg-white rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 h-10"
          placeholder="Add a comment"
        />
        <select 
          value={newStatus} 
          onChange={(e) => setNewStatus(e.target.value as 'Done' | 'In Progress')} 
          className="border border-gray-300 bg-white rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
        >
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button 
          onClick={addComment} 
          className="bg-black text-white rounded p-1 hover:bg-gray-800 transition h-10"
        >
          Add Comment
        </button>
      </div>
      <div className="space-y-4 mt-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col border border-gray-300">
            <p className="font-bold">{comment.commentator}</p>
            <p>{comment.content}</p>
            <p className="text-gray-500">{comment.date.toLocaleString()}</p>
            <p className="text-gray-500">Status: {comment.status}</p>
            <button 
              onClick={() => removeComment(comment.id)} 
              className="text-red-500 hover:text-red-700 mt-2"
              aria-label="Remove comment"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}