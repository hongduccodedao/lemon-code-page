/* eslint-disable react/no-children-prop */
import { apiGetPostBySlug } from "@/apis/post";
import { LayoutMain } from "@/components/layouts";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { SEO } from "@/components/seo";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getServerSideProps({ params }) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${params.slug}`,
  );
  const postData = response.data.data;
  return {
    props: {
      post: postData,
    },
  };
}

const PostDetailPage = ({ post }) => {
  // const router = useRouter();
  //
  // const { data } = useQuery({
  //   queryKey: ["post", router.query.slug],
  //   queryFn: () => apiGetPostBySlug(router.query.slug),
  //   initialData: post,
  // });
  console.log(post);

  return (
    <>
      <SEO
        title={`${post?.title}`}
        description={post?.content}
        image={post?.image}
      />
      <main>
        <LayoutMain>
          <div className="max-w-[1200px] mx-auto mt-5 flex gap-2">
            <div className="flex bg-red-50">like</div>
            <div className="bg-ctp-surface0 rounded-lg flex-6">
              {post?.image && (
                <div className="relative w-full h-72">
                  <Image
                    src={post?.image}
                    alt="thumbnail"
                    layout="fill"
                    className="rounded-t-lg object-cover object-center"
                  />
                </div>
              )}
              <div className="px-6 py-4">
                <h1 className="text-6xl font-bold my-3">{post?.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  {post?.tags?.map((tag) => (
                    <span
                      className="text-sm text-gray-500 hover:bg-gray-100 p-1 rounded-md"
                      key={tag}
                      title={tag}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="">
                  <ReactMarkdown
                    children={post?.content}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            children={String(children).replace(/\n$/, "")}
                            language={match[1]}
                            style={dracula}
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex-3 bg-white">artist</div>
          </div>
        </LayoutMain>
      </main>
    </>
  );
};

export default PostDetailPage;
