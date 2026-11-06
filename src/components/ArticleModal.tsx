import React from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, Share2 } from 'lucide-react';
import { BlogPost } from '../data/academyData';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ post, onClose }) => {
  useModalScrollLock(!!post, onClose);

  if (!post) return null;

  const modalContent = (
    <div 
      data-lenor-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div 
        className="relative w-full max-w-2xl !bg-white !text-black border border-neutral-200 rounded-[24px] p-6 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto overscroll-contain minimal-scrollbar"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
          aria-label="Close article"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category & Meta */}
        <div className="flex items-center gap-2.5 mb-2.5 text-xs text-neutral-600 font-semibold uppercase tracking-wider">
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-black border border-neutral-300 text-[11px] font-bold">
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
        <h1 className="h1 text-2xl sm:text-3xl lg:text-4xl text-black mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Feature Image */}
        <div className="h-52 sm:h-64 w-full rounded-2xl overflow-hidden mb-5 bg-neutral-100 shadow-md">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Author row */}
        <div className="flex items-center gap-3 py-2.5 border-y border-neutral-200 mb-5 text-xs text-neutral-700">
          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-black font-bold">
            {post.author.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-black">{post.author}</div>
            <div className="text-neutral-500 text-[11px]">{post.authorRole} · Lenor Academy</div>
          </div>
        </div>

        {/* Body content */}
        <div className="space-y-3.5 text-neutral-800 text-sm sm:text-base leading-relaxed font-light">
          {post.content.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
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

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default ArticleModal;
