import { SEO } from "@/components/seo";
import { LayoutMain } from "@/components/layouts";
import { useSelector } from "react-redux";
import Image from "next/image";
import icons from "@/utils/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { paths } from "@/utils/paths";
import { apiGetUserById } from "@/apis";
import { useQuery } from "@tanstack/react-query";
import { PostCard } from "@/components/postCard";
import { Loading } from "@/components/loadings";
import axios from "axios";

const { RiCake2Line, RiMailLine, RiSettingsLine, RiFileList3Line } = icons;

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${params.id}`,
    );

    const user = response.data;

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      props: {
        user: null,
      },
    };
  }
}

const Profile = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;
  const { current } = useSelector((state) => state.user);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => apiGetUserById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    cacheTime: 24 * 10 * 60 * 60 * 1000,
    staleTime: 24 * 5 * 60 * 60 * 1000,
    initialData: user,
  });

  return (
    <>
      <SEO
        title={`${data?.data?.firstName} ${data?.data?.lastName}`}
        image={data?.data?.avatar}
      />
      <main>
        <LayoutMain>
          {isLoading ||
            (isError && (
              <div className="w-full h-[200px] flex items-center justify-center">
                {isLoading && <Loading />}
                {isError && <p>{error.message}</p>}
              </div>
            ))}
          <div className="max-w-[1200px] mx-auto my-10 flex gap-10">
            <div className="flex flex-col gap-10">
              <div className="relative w-[250px] h-[250px]">
                <Image
                  src={data?.data?.avatar}
                  layout="fill"
                  className="rounded-full object-cover border-4 border-gray-100 shadow-xl"
                />
              </div>
              <div className="bg-white rounded-xl p-5 shadow-lg">
                <div className="flex items-center gap-2">
                  <RiFileList3Line className="inline-block text-2xl" />
                  <span className="">{data?.length || 0} posts published</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-10">
              <div className="w-full h-[250px] bg-white rounded-xl p-8 flex justify-center flex-col gap-5 relative shadow-lg">
                {current?._id === id && (
                  <Link href={paths.SETTING} title="Setting">
                    <RiSettingsLine className="absolute top-10 right-10 cursor-pointer text-2xl hover:text-green-500" />
                  </Link>
                )}
                <h1 className="font-bold text-5xl">
                  {data?.data?.firstName} {data?.data?.lastName}
                </h1>
                <div className="flex items-center gap-10">
                  <span className="flex items-center gap-3">
                    <RiCake2Line className="inline-block text-2xl" />
                    <span className="">
                      Joined on {new Date(data?.data?.createdAt).toDateString()}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <RiMailLine className="inline-block text-2xl" />
                    <span className="">
                      <a
                        href={`mailto:${data?.data?.email}`}
                        className="font-bold"
                      >
                        {data?.data?.email}
                      </a>
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {data?.length > 0 ? (
                  data?.map((post) => <PostCard key={post._id} post={post} />)
                ) : (
                  <div className="w-full h-[200px] flex items-center justify-center">
                    <p>No post published</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </LayoutMain>
      </main>
    </>
  );
};

export default Profile;
