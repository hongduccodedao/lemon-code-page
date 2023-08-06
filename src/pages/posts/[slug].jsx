/* eslint-disable react/no-children-prop */
import { LayoutMain } from "@/components/layouts";
import Image from "next/image";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { SEO } from "@/components/seo";
import axios from "axios";
import icons from "@/utils/icons";
import { MenuShare } from "@/components/posts";

const {
  RiBookmarkLine,
  RiHeartAddLine,
  RiChat1Line,
  RiMoreFill,
  RiHeartAddFill,
} = icons;

export async function getServerSideProps({ params }) {
  const response = await fetch(`
    ${process.env.NEXT_PUBLIC_API_URL}/post/${params.slug}
  `)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const postData = response.data;
  return {
    props: {
      post: postData,
    },
  };
}

const PostDetailPage = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <SEO
        title={`${post?.title}`}
        description={post?.content}
        image={post?.image}
      />
      <main>
        <LayoutMain>
          <div className="max-w-[1200px] mx-auto mt-5 flex gap-5">
            <div className="flex flex-col gap-7 mt-10">
              <div
                className="flex flex-col gap-2 items-center cursor-pointer select-none"
                title={isLiked ? "Liked" : "Like"}
                onClick={() => handleLike()}
              >
                {isLiked ? (
                  <RiHeartAddFill className="text-2xl text-ctp-red" />
                ) : (
                  <RiHeartAddLine className="text-2xl hover:text-ctp-red" />
                )}
                <span className="text-ctp-subtext0">{post?.likes}</span>
              </div>
              <div className="flex flex-col gap-2 items-center cursor-pointer">
                <RiChat1Line className="text-2xl" />
                <span className="text-ctp-subtext0">{post?.comments}</span>
              </div>
              <div className="flex flex-col gap-2 items-center cursor-pointer">
                <RiBookmarkLine className="text-2xl" />
              </div>
              <div className="flex flex-col gap-2 items-center cursor-pointer relative">
                <RiMoreFill
                  className="text-2xl"
                  onClick={() => setIsShowMore(!isShowMore)}
                />
                {isShowMore && <MenuShare />}
              </div>
            </div>
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
