import Image from "next/image";
import icons from "@/utils/icons";
import Link from "next/link";
import moment from "moment";

const { RiBookmarkLine, RiHeartAddLine, RiChat1Line } = icons;

const PostCard = ({ post }) => {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="max-w-[500px] bg-white rounded-lg cursor-pointer shadow-md"
      title={post.title}
    >
      {post.image && (
        <div className="relative w-full h-24">
          <Image
            src={post.image}
            alt="thumbnail"
            layout="fill"
            className="rounded-t-md object-cover object-center"
          />
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src={post.userId.avatar}
              alt="avatar"
              layout="fill"
              className="rounded-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">
              {post.userId.firstName} {post.userId.lastName}
            </span>
            <span className="text-xs text-gray-500">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div className="py-3 px-10">
          <h2 className="text-4xl font-bold text-gray-950 hover:text-green-500">
            {post.title}
          </h2>
          <div className="flex items-center gap-3 mt-2">
            {post.tags.map((tag) => (
              <span
                className="text-sm text-gray-500 hover:bg-gray-100 p-1 rounded-md"
                key={tag}
                title={tag}
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-10 mt-2 text-sm justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1 rounded-xl">
                <RiHeartAddLine className="text-xl" />
                <span className="">{post.likes} likes</span>
              </div>
              <div className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1 rounded-xl">
                <RiChat1Line className="text-xl" />
                <span className="">{post.comments} comments</span>
              </div>
            </div>
            <button className="text-xl text-gray-400 hover:text-gray-900">
              <RiBookmarkLine />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
