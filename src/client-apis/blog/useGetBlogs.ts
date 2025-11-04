import { GetBlogParam } from "@/app/api/blog/types";
import api from "@/app/helpers/baseApi";
import { Blog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useGetBlogs(params: GetBlogParam) {
  const getBlogFn = async ({
    signal,
  }: {
    signal: AbortSignal;
  }): Promise<{ items: Blog[]; count: number }> => {
    try {
      return await (
        await api.get("blog", {
          params,
          signal,
        })
      ).data;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  return useQuery({
    queryKey: ["get-blogs", params],
    queryFn: getBlogFn,
  });
}
