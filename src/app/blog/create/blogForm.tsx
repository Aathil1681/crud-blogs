"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BlogSchema } from "../../../lib/blog.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogInput } from "../../api/blog/types";
import { AxiosError } from "axios";
import useCreateBlog from "../../../client-apis/blog/useCreateBlog";
import { useRouter } from "next/navigation";

const BlogForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<BlogInput>({
    mode: "onTouched",
    resolver: zodResolver(BlogSchema),
  });

  const {
    mutateAsync: createBlog,
    isPending: isCreateBlogPending,
    error: createBlogError,
  } = useCreateBlog();

  useEffect(() => {
    if (createBlogError) {
      console.log(createBlogError);

      const err = createBlogError as AxiosError;

      const errData = err?.response?.data as { code: string; message: string };
      console.log(errData);
    }
  }, [createBlogError]);

  return (
    <section className="w-full min-h-dvh flex flex-col items-center justify-center p-5 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-lg mx-auto bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/50 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.2)]">
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight text-center mb-8">
          Create Blog
        </h2>

        <form
          onSubmit={handleSubmit(async (values) => {
            const blog = await createBlog(values);

            reset();
            router.push("/blog");
          })}
          className="font-semibold flex flex-col w-full space-y-6"
        >
          <fieldset disabled={isCreateBlogPending}>
            <div className="flex flex-row justify-between space-x-4 mb-4">
              <div className="flex flex-col w-1/2">
                <label
                  className="text-sm font-bold text-gray-700"
                  htmlFor="title"
                >
                  Title
                </label>

                <input
                  className="mt-1 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-light transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  {...register("title")}
                />
                {errors.title && (
                  <span className="text-red-600 text-xs mt-1 font-normal tracking-wide">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-1/2">
                <label
                  className="text-sm font-bold text-gray-700"
                  htmlFor="slug"
                >
                  Slug
                </label>

                <input
                  className="mt-1 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-light transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                  id="slug"
                  type="text"
                  placeholder="Enter slug"
                  {...register("slug")}
                />

                {errors.slug && (
                  <span className="text-red-600 text-xs mt-1 font-normal tracking-wide">
                    {errors.slug.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label
                className="text-sm font-bold text-gray-700"
                htmlFor="content"
              >
                Content
              </label>

              <textarea
                className="mt-1 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-light h-40 resize-none transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                id="content"
                placeholder="Enter content"
                {...register("content")}
              />

              {errors.content && (
                <span className="text-red-600 text-xs mt-1 font-normal tracking-wide">
                  {errors.content.message}
                </span>
              )}
            </div>

            <div>
              <button
                className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
                type="submit"
              >
                Create
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default BlogForm;
