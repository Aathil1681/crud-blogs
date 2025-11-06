"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { cookieKeys } from "../../config/cookie.config";
import { MdBiotech } from "react-icons/md";

interface HeaderSectionProps {
  onAddBlog: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ onAddBlog }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove(cookieKeys.USER_TOKEN);
    router.push("/login");
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-10">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 p-4 lg:p-6">
        {/* Main Header Content */}
        <div className="flex items-center gap-4 flex-1 w-full">
          {/* Logo with Animation */}
          <div className="relative group">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-indigo-500/25">
              <MdBiotech className="text-2xl text-white transition-transform group-hover:scale-110" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              TECH-
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 bg-size-200 animate-gradient">
                TALKS
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-light">
              Discover amazing content and insights
            </p>
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onAddBlog}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/40"
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

          <button
            onClick={handleLogout}
            className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-red-500/40"
          >
            Logout
          </button>
        </div>

        {/* Mobile Floating Action Button */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <div className="relative">
            {/* Main FAB */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
                menuOpen
                  ? "bg-gradient-to-r from-red-500 to-red-600"
                  : "bg-gradient-to-r from-indigo-600 to-purple-700"
              }`}
            >
              {menuOpen ? (
                // Close icon (X)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Plus icon
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </button>

            {/* Expanded Menu (Visible when open) */}
            {menuOpen && (
              <div className="absolute bottom-16 right-0 flex flex-col gap-2 transition-all duration-300">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onAddBlog();
                  }}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg whitespace-nowrap flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  Add New Post
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg whitespace-nowrap"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
