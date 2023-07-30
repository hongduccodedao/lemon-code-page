import { getPosts } from "@/apis/post";
import { LayoutMain } from "@/components/layouts";
import { Loading } from "@/components/loadings";
import { SEO } from "@/components/seo";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: "posts",
    queryFn: () => getPosts(),
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
            {data &&
              data.map((post) => (
                <div
                  className="max-w-[500px] bg-white rounded-lg cursor-pointer shadow-md"
                  key={post.id}
                  title={post.title}
                >
                  {post.thumbnail && (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="rounded-t-lg"
                    />
                  )}
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        alt=""
                        className="w-8 h-8 object-cover rounded-full object-center"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm">{post.author}</span>
                        <span className="text-xs text-gray-500">
                          {post.created_at}
                        </span>
                      </div>
                    </div>
                    <div className="py-3 px-10">
                      <h2 className="text-4xl font-bold">{post.title}</h2>
                      <div className="flex items-center gap-3">
                        {post.tags.map((tag) => (
                          <span className="text-sm text-gray-500" key={tag}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-10 mt-4 text-sm">
                        <span className="">{post.likes} likes</span>
                        <span className="">{post.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </LayoutMain>
      </main>
    </>
  );
}
