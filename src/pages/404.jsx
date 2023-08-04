import React from "react";
import { SEO } from "@/components/seo";
import Link from "next/link";
import { paths } from "@/utils/paths";
import icons from "@/utils/icons";

const { RiArrowDropLeftLine } = icons;

const Custom404 = () => {
  return (
    <>
      <SEO title="404: Not found" />
      <main>
        <div className="flex items-center justify-center w-screen h-screen">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold">404: Not Found</h1>
            <Link
              href={paths.HOME}
              className="inline-flex items-center gap-3 border border-green-500 px-3 py-2 text-green-500 hover:bg-green-500 hover:text-white rounded-md transition-all duration-300 ease-in-out"
            >
              <RiArrowDropLeftLine className="text-4xl" /> Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Custom404;
