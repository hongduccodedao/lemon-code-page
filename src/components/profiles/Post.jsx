import React from "react";
import { PostCard } from "@/components/postCard";
import { useQuery } from "@tanstack/react-query";
import { apiGetPostByUserId } from "@/apis";
import { Loading } from "@/components/loadings";
import icons from "@/utils/icons";

const { RiFileList3Line } = icons;

const Post = ({ uid }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", uid],
    queryFn: () => apiGetPostByUserId(uid),
    enabled: !!uid,
  });

  return (
    <div className="max-w-[1200px] mx-auto flex gap-10">
      {isLoading ||
        (isError && (
          <div className="w-full h-[100px] flex items-center justify-center">
            {isLoading && <Loading />}
            {isError && <p>{error.message}</p>}
          </div>
        ))}
      <div className="bg-white rounded-xl p-5 shadow-lg w-[250px] max-h-20">
        <div className="inline-flex items-center gap-2">
          <RiFileList3Line className="inline-block text-2xl" />
          <span className="">{data?.length || 0} posts published</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {data?.length > 0 ? (
          data?.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center">
            <p>No post published</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
