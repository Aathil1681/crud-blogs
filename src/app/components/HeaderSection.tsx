"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { cookieKeys } from "../../config/cookie.config"; // adjust path if needed

interface HeaderSectionProps {
  onAddBlog: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ onAddBlog }) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove(cookieKeys.USER_TOKEN);
    router.push("/login");
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
        {/* --- Text Content --- */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-500 mb-1">
            Blog Posts
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Discover amazing content and insights.
          </p>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex items-center gap-3">
          {/* Add New Post Button */}
          <button
            onClick={onAddBlog}
            className="
              flex items-center gap-2 px-6 py-3 
              font-semibold text-white 
              bg-gradient-to-r from-indigo-600 to-purple-700 
              rounded-xl 
              shadow-lg 
              transition-all duration-300 ease-in-out
              hover:scale-105 
              hover:-translate-y-0.5
              hover:shadow-2xl 
              hover:shadow-indigo-500/40 
              dark:hover:shadow-indigo-400/30
            "
          >
            <svg
              className="w-5 h-5 stroke-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Post
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="
              px-6 py-3 font-semibold text-white 
              bg-gradient-to-r from-red-500 to-red-700 
              rounded-xl shadow-lg 
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:-translate-y-0.5 
              hover:shadow-2xl hover:shadow-red-500/40 
              dark:hover:shadow-red-400/30
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
