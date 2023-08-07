import { LayoutMain } from "@/components/layouts";
import { Loading } from "@/components/loadings";
import { PostCard } from "@/components/postCard";
import { SEO } from "@/components/seo";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllTags, apiGetPosts } from "@/apis";
import Head from "next/head";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: "posts",
    queryFn: () => {
      const apiGetPostsPromise = apiGetPosts();
      const apiGetAllTagsPromise = apiGetAllTags();

      return Promise.all([apiGetPostsPromise, apiGetAllTagsPromise]).then(
        ([postsData, tagsData]) => {
          return {
            postsData,
            tagsData,
          };
        },
      );
    },
    refetchOnWindowFocus: false,
    cacheTime: 24 * 10 * 60 * 60 * 1000, // 1 day
    staleTime: 24 * 5 * 60 * 60 * 1000, // 1/2 day
  });

  return (
    <>
      <Head>
        <title>CTP - Home</title>
        <meta name="description" content="CTP - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LayoutMain>
          <div className="flex gap-10 max-w-[1200px] mx-auto my-10">
            {isLoading ||
              (isError && (
                <div className="w-full h-[200px] flex items-center justify-center">
                  {isLoading && <Loading />}
                  {isError && <p>{error.message}</p>}
                </div>
              ))}
            <div className="w-[200px]">
              <h2 className="text-2xl font-bold">Tags</h2>
              <div className="w-full h-0.5 bg-ctp-overlay1 my-4"></div>
              <div className="flex flex-col gap-2">
                {data?.tagsData?.length > 0 ? (
                  <>
                    {data?.tagsData?.map((tag) => (
                      <div
                        key={tag}
                        className="hover:bg-ctp-green hover:text-ctp-base p-2 rounded-lg hover:underline cursor-pointer"
                      >
                        <p>#{tag}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>No tags</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5 flex-1">
              {data?.postsData?.length > 0 ? (
                <>
                  {data?.postsData &&
                    data?.postsData?.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                </>
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center">
                  <p>No posts</p>
                </div>
              )}
            </div>
          </div>
        </LayoutMain>
      </main>
    </>
  );
}
