import React from 'react';
import { X, Clock, Calendar, User, Share2 } from 'lucide-react';
import { BlogPost } from '../data/academyData';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl !bg-white !text-black border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Meta */}
        <div className="flex items-center gap-3 mb-3 text-xs text-neutral-600 font-semibold uppercase tracking-wider">
          <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-black border border-neutral-300">
            {post.category}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span>·</span>
          <span>{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="h1 text-3xl sm:text-4xl text-black mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Feature Image */}
        <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 bg-neutral-100">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Author row */}
        <div className="flex items-center gap-3 py-3 border-y border-neutral-200 mb-6 text-xs text-neutral-700">
          <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-black font-bold">
            {post.author.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-black">{post.author}</div>
            <div className="text-neutral-500 text-[11px]">{post.authorRole} · Lenor Academy</div>
          </div>
        </div>

        {/* Body content */}
        <div className="space-y-4 text-neutral-800 text-sm sm:text-base leading-relaxed font-light">
          {post.content.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Article link copied to clipboard!");
              }
            }}
            className="btn ghost !h-9 !px-4 text-xs flex items-center gap-1.5 !border-neutral-300 !text-black hover:!bg-neutral-100"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Article
          </button>
          <button onClick={onClose} className="btn !h-9 !px-5 text-xs bg-black text-white hover:bg-neutral-800">
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};

