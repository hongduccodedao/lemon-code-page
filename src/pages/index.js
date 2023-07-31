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
  });

  return (
    <>
      <SEO title="Lemon Code" description="Lemon Code" />
      <main>
        <LayoutMain>
          <h1>Home</h1>
          {isLoading && <Loading />}
          {isError && <p>{error.message}</p>}
          <div className="flex flex-col gap-5">
            {data && data.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        </LayoutMain>
      </main>
    </>
  );
}
