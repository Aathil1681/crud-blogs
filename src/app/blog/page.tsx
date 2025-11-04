"use client";
import useGetBlogs from "@/client-apis/blog/useGetBlogs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useEffect, useState } from "react";
import { GetBlogParam } from "../api/blog/types";
import Link from "next/link";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");

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
      size: parseInt(searchParams.get("size") || "2", 10),
      search: debouncedValue || "",
    };
  }, [searchParams, debouncedValue]);

  const { data: blogs, isPending: isBlogsLoading } = useGetBlogs(options);

  const numOfPages = useMemo(() => {
    const size = parseInt(searchParams.get("size") || "2", 10);
    const count = blogs?.count || 0;
    return Math.ceil(count / size);
  }, [searchParams, blogs]);

  let currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    if (currentPage > numOfPages && numOfPages > 0) {
      const adjustedPage = numOfPages;
      router.replace(
        `/blog?page=${adjustedPage}&size=${searchParams.get("size") || "2"}`,
      );
    } else if (numOfPages === 0 && currentPage !== 1) {
      router.replace(`/blog?page=1&size=${searchParams.get("size") || "2"}`);
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

    const newUrl = `/blog?page=${adjustedPage}&size=${newSize}`;
    router.replace(newUrl);
  };

  return (
    <section className="w-full min-h-dvh flex flex-col p-5 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/50 p-5 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.2)]">
        {isBlogsLoading && (
          <p className="text-center text-gray-500 animate-pulse">Loading...</p>
        )}

        <div className="relative mb-5">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Blogs"
            className="w-full pl-10 pr-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
            aria-label="Search blogs"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {!isBlogsLoading &&
            blogs &&
            blogs.items.length > 0 &&
            blogs.items.map((blog) => (
              <div
                key={blog.id}
                className="p-5 border border-gray-200/50 bg-white/60 backdrop-blur-lg rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-indigo-300/70"
              >
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight transition-colors duration-300 hover:text-indigo-600">
                  {blog.title}
                </h3>
                <p className="text-sm/6 text-gray-700 mt-2 leading-relaxed">
                  {blog.content}
                </p>
              </div>
            ))}

          {!isBlogsLoading && (!blogs || blogs.items.length === 0) && (
            <p className="text-center text-gray-500">
              No blog posts available.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 mt-5">
          <div className="relative">
            <select
              aria-label="Select blogs per page"
              value={searchParams.get("size") || "2"}
              onChange={handleSizeChange}
              className="appearance-none px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-light transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_10px_rgba(99,102,241,0.3)] pr-8"
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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

          <div className="flex items-center gap-2">
            {numOfPages > 0 &&
              Array.from(Array(numOfPages).keys()).map((i) => (
                <Link
                  key={i}
                  href={`/blog?page=${i + 1}&size=${searchParams.get("size") || "2"}`}
                  className={`px-3 py-2 text-xs font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(99,102,241,0.3)] ${
                    currentPage === i + 1
                      ? "bg-indigo-700 text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
