"use client";
import useGetBlogs from "@/client-apis/blog/useGetBlogs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useEffect, useState } from "react";
import { GetBlogParam } from "@/types/types";
import Link from "next/link";
import AddBlogModal from "./components/AddBlogModal";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [isAddBlogModalOpen, setIsAddBlogModalOpen] = useState(false);

  useEffect(() => {
    if (searchInput.length > 0) {
      const timer = setTimeout(() => {
        if (searchInput != debouncedValue) {
          setDebouncedValue(searchInput);
        }
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    } else {
      setDebouncedValue("");
    }
  }, [searchInput]);

  const options = useMemo<GetBlogParam>(() => {
    return {
      page: parseInt(searchParams.get("page") || "1", 10),
      size: parseInt(searchParams.get("size") || "6", 10),
      search: debouncedValue || "",
    };
  }, [searchParams, debouncedValue]);

  const {
    data: blogs,
    isPending: isBlogsLoading,
    refetch,
  } = useGetBlogs(options);

  const numOfPages = useMemo(() => {
    const size = parseInt(searchParams.get("size") || "6", 10);
    const count = blogs?.count || 0;
    return Math.ceil(count / size);
  }, [searchParams, blogs]);

  let currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    if (currentPage > numOfPages && numOfPages > 0) {
      const adjustedPage = numOfPages;
      router.replace(
        `/?page=${adjustedPage}&size=${searchParams.get("size") || "6"}`,
      );
    } else if (numOfPages === 0 && currentPage !== 1) {
      router.replace(`/?page=1&size=${searchParams.get("size") || "6"}`);
    }
  }, [currentPage, numOfPages, router, searchParams]);

  if (currentPage > numOfPages && numOfPages > 0) {
    currentPage = numOfPages;
  } else if (numOfPages === 0) {
    currentPage = 1;
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value, 10);
    const totalItems = blogs?.count || 0;
    const newNumOfPages = Math.ceil(totalItems / newSize);

    let adjustedPage = currentPage;
    if (currentPage > newNumOfPages && newNumOfPages > 0) {
      adjustedPage = newNumOfPages;
    } else if (newNumOfPages === 0) {
      adjustedPage = 1;
    }

    const newUrl = `/?page=${adjustedPage}&size=${newSize}`;
    router.replace(newUrl);
  };

  return (
    <section className="w-full min-h-dvh flex flex-col p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Blog Posts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover amazing content and insights
            </p>
          </div>
          <button
            onClick={() => setIsAddBlogModalOpen(true)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Blog
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-7xl mx-auto mb-8">
        <div className="relative max-w-md">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search blogs..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-md dark:text-white"
            aria-label="Search blogs"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="w-full max-w-7xl mx-auto flex-1">
        {isBlogsLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isBlogsLoading &&
            blogs &&
            blogs.items.length > 0 &&
            blogs.items.map((blog) => (
              <article
                key={blog.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* Blog Image */}

                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 relative overflow-hidden">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback if image fails to load
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

                {/* Blog Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {blog.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {blog.slug}
                    </span>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm flex items-center gap-1 transition-colors group/read"
                    >
                      Read more
                      <svg
                        className="w-4 h-4 group-hover/read:translate-x-1 transition-transform"
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
                    </Link>
                  </div>
                </div>
              </article>
            ))}
        </div>

        {/* No Results */}
        {!isBlogsLoading && (!blogs || blogs.items.length === 0) && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No blog posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or create a new blog post.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Section */}
      <div className="w-full max-w-7xl mx-auto mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-gray-200 dark:border-gray-700">
          {/* Items per page selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Show:
            </span>
            <div className="relative">
              <select
                aria-label="Select blogs per page"
                value={searchParams.get("size") || "6"}
                onChange={handleSizeChange}
                className="appearance-none px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white pr-8"
              >
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="18">18</option>
                <option value="24">24</option>
              </select>
              <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            {numOfPages > 0 &&
              Array.from(Array(numOfPages).keys()).map((i) => (
                <Link
                  key={i}
                  href={`/?page=${i + 1}&size=${searchParams.get("size") || "6"}`}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 min-w-[40px] text-center ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
          </div>

          {/* Page info */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {numOfPages || 1}
          </div>
        </div>
      </div>
      <AddBlogModal
        isOpen={isAddBlogModalOpen}
        onClose={() => setIsAddBlogModalOpen(false)}
        onBlogCreated={refetch}
      />
    </section>
  );
};

export default Page;
