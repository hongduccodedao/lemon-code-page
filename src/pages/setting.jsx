import React from "react";
import { SEO } from "@/components/seo";
import { LayoutMain } from "@/components/layouts";
import Link from "next/link";
import { paths } from "@/utils/paths";
import { Avatar, Information } from "@/components/settings";
import { useSelector } from "react-redux";

const Setting = () => {
  const { isLogged } = useSelector((state) => state.user);

  return (
    <>
      <SEO title="Setting" />
      <main>
        <LayoutMain>
          <div className="max-w-[1200px] mx-auto my-10 flex gap-10">
            {!isLogged ? (
              <span className="text-center text-2xl">
                You need to login to access this page. Please{" "}
                <Link
                  href={paths.LOGIN}
                  clasName="text-green-500 hover:underline"
                >
                  login
                </Link>{" "}
                first.
              </span>
            ) : (
              <>
                <Avatar />
                <Information />
              </>
            )}
          </div>
        </LayoutMain>
      </main>
    </>
  );
};

export default Setting;
