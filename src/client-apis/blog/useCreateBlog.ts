import { BlogInput } from "@/app/api/blog/types";
import api from "@/app/helpers/baseApi";
import queryClient from "@/app/helpers/queryClient";
import { Blog } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

const useCreateBlog = () => {
  const createBlogFn = async (values: BlogInput): Promise<Blog> => {
    return await api.post("blog", values);
  };

  //useQuery:getting information from server like GET(ex: fetch user)
  //useMutation: send information within body like POST
  return useMutation({
    mutationFn: createBlogFn,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-blogs"], //when the post creation is completed succesfully the get blogs will be refetch automatically
      });
    },
  });
};

export default useCreateBlog;
