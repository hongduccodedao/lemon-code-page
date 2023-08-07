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
        <title>Home | hongduccodedao</title>
        <meta name="title" content="Home | hongduccodedao"></meta>
        <meta
          name="keywords"
          content="Nguyễn Hồng Đức (hongduccodedao), hongducodedao, Nguyễn Hồng Đức"
        ></meta>
        <meta name="author" content="Nguyễn Hồng Đức (hongduccodedao)"></meta>
        <meta name="geo.region" content="VN"></meta>
        <meta property="og:locale" content="vi_VN"></meta>
        <meta name="theme-color" content="#1DC071"></meta>
        <meta
          name="description"
          content="Hi, my name is hongduccodedao. Full name is Nguyen Hong Duc. I am a 3rd year student majoring in Software Engineering at Thai Nguyen University of Information and Communication Technology (ICTU). I am looking to become a Front-End developer. Owner and Dev PinkBot._(Discord bot). Far beyond the Full-stack developer."
        />
        <meta
          name="google-site-verification"
          content="wO7_mXt_nA0dY_Xw1LH7l2YExnqGbSAx0A-mfo72lVs"
        />
        <meta
          name="facebook-domain-verification"
          content="mkiddxmoh9v84vek04vz472wd41n2f"
        />
        <meta name="msvalidate.01" content="719E848983AA37F4AA3A04B3616E1F9F" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hongduccodedao.site/" />
        <meta property="og:title" content="Home | hongduccodedao" />
        <meta
          property="og:description"
          content="Hi, my name is hongduccodedao. Full name is Nguyen Hong Duc. I am a 3rd year student majoring in Software Engineering at Thai Nguyen University of Information and Communication Technology (ICTU). I am looking to become a Front-End developer. Owner and Dev PinkBot._(Discord bot). Far beyond the Full-stack developer."
        />
        <meta
          property="og:image"
          content="https://avatars.githubusercontent.com/u/73995275?v=4"
        />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hongduccodedao.site/" />
        <meta property="twitter:title" content="Home | hongduccodedao" />
        <meta
          property="twitter:description"
          content="Hi, my name is hongduccodedao. Full name is Nguyen Hong Duc. I am a 3rd year student majoring in Software Engineering at Thai Nguyen University of Information and Communication Technology (ICTU). I am looking to become a Front-End developer. Owner and Dev PinkBot._(Discord bot). Far beyond the Full-stack developer."
        />
        <meta
          property="twitter:image"
          content="https://avatars.githubusercontent.com/u/73995275?v=4"
        />
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
