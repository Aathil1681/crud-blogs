"use client";
import React, { useState } from "react";
import BlogOverlay from "./BlogOverlay";
import { highlightText } from "../utils/highlight";
import { FiUser } from "react-icons/fi"; // ✅ added for icon

interface BlogGridProps {
  blogs: any;
  isLoading: boolean;
  refetch?: () => void;
  searchTerm?: string;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  blogs,
  isLoading,
  refetch,
  searchTerm = "",
}) => {
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!blogs || blogs.items.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.items.map((blog: any) => (
          <article
            key={blog.id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
          >
            {/* Image */}
            <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 relative overflow-hidden">
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-indigo-300 dark:text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {highlightText(blog.title, searchTerm)}
              </h3>

              {/*  Author display section */}
              {blog.Author && (
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                  <FiUser className="w-4 h-4 text-indigo-500" />
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-3 py-1 rounded-full">
                    {blog.Author.firstName} {blog.Author.lastName}
                  </span>
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {highlightText(blog.content || blog.description, searchTerm)}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {blog.slug}
                </span>
                <button
                  onClick={() => {
                    setSelectedBlog(blog);
                    setIsOverlayOpen(true);
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm flex items-center gap-1 transition-colors"
                >
                  Read more
                  <svg
                    className="w-4 h-4 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Overlay for Blog Details */}
      {selectedBlog && (
        <BlogOverlay
          blog={selectedBlog}
          isOpen={isOverlayOpen}
          onClose={() => setIsOverlayOpen(false)}
          onDelete={refetch}
        />
      )}
    </>
  );
};

export default BlogGrid;
