import { apiGetPosts } from "@/apis/post";
import { LayoutMain } from "@/components/layouts";
import { Loading } from "@/components/loadings";
import { PostCard } from "@/components/postCard";
import { SEO } from "@/components/seo";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: "posts",
    queryFn: () => apiGetPosts(),
    refetchOnWindowFocus: false,
    cacheTime: 24 * 10 * 60 * 60 * 1000, // 1 day
    staleTime: 24 * 5 * 60 * 60 * 1000, // 1/2 day
  });

  return (
    <>
      <SEO title="Home" description="Lemon Code" />
      <main>
        <LayoutMain>
          <h1>Home</h1>
          {isLoading && <Loading />}
          {isError && <p>{error.message}</p>}
          <div className="flex flex-col gap-5">
            {data &&
              data.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </LayoutMain>
      </main>
    </>
  );
}
