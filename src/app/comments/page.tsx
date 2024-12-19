'use client';

import { useState } from 'react';

interface Comment {
  id: number;
  commentator: string;
  content: string;
  date: Date;
  status: 'Done' | 'In Progress';
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentator, setNewCommentator] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newStatus, setNewStatus] = useState<'Done' | 'In Progress'>('In Progress');

  const addComment = () => {
    if (newCommentator && newContent) {
      const newComment: Comment = {
        id: comments.length + 1,
        commentator: newCommentator,
        content: newContent,
        date: new Date(),
        status: newStatus,
      };
      setComments([...comments, newComment]);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewCommentator('');
    setNewContent('');
    setNewStatus('In Progress');
  };

  const removeComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Comments</h1>
      <div className="flex space-x-2 mb-4">
        <input 
          type="text" 
          value={newCommentator} 
          onChange={(e) => setNewCommentator(e.target.value)} 
          className="border rounded p-1 flex-1"
          placeholder="Name"
        />
        <textarea 
          value={newContent} 
          onChange={(e) => setNewContent(e.target.value)} 
          className="border rounded p-1 flex-1"
          placeholder="Comment"
        />
        <select 
          value={newStatus} 
          onChange={(e) => setNewStatus(e.target.value as 'Done' | 'In Progress')} 
          className="border rounded p-1"
        >
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button 
          onClick={addComment} 
          className="bg-black text-white rounded p-1"
        >
          Add
        </button>
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white shadow-md rounded-lg p-4 mb-2">
            <p className="font-bold">{comment.commentator}</p>
            <p>{comment.content}</p>
            <p className="text-gray-500">{comment.date.toLocaleString()}</p>
            <p className="text-gray-500">Status: {comment.status}</p>
            <button 
              onClick={() => removeComment(comment.id)} 
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}