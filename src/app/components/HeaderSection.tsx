"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { cookieKeys } from "../../config/cookie.config";
import { MdBiotech } from "react-icons/md";

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
        <div className="flex items-center gap-4 p-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <MdBiotech className="text-2xl text-white" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              TECH-
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                TALKS
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-light">
              Discover amazing content and insights
            </p>
          </div>
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
              bg-gradient-to-r from-red-500 to-red-600 
              rounded-xl 
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
