/* eslint-disable react/no-children-prop */
import { getPostBySlug } from "@/apis/post";
import { LayoutMain } from "@/components/layouts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState } from "react";
import CodeBlock from "@/components/codeBlock";
import { SEO } from "@/components/seo";

const PostDetailPage = () => {
  const router = useRouter();

  const slug = router.query.slug;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: "postDetail",
    queryFn: () => getPostBySlug(slug),
  });
  console.log("🚀 ~ PostDetailPage ~ data:", data);

  return (
    <>
      <SEO title={data?.title} description={data?.content} image={data?.thumbnail} />
      <main>
        <LayoutMain>
          <div className="max-w-[1200px] mx-auto mt-5 flex gap-2">
            <div className="flex bg-red-50">like</div>
            <div className="bg-white rounded-lg flex-6">
              <div className="relative w-full h-72">
                <Image
                  src={data?.thumbnail}
                  alt="thumbnail"
                  layout="fill"
                  className="rounded-t-lg object-cover object-center"
                />
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8">
                    <Image
                      src={data?.avatar}
                      alt="avatar"
                      layout="fill"
                      className="rounded-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">{data?.author}</span>
                    <span className="text-xs text-gray-500">
                      {data?.created_at}
                    </span>
                  </div>
                </div>
                <h1 className="text-6xl font-bold my-3">{data?.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  {data?.tags.map((tag) => (
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
                    children={data?.content}
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
