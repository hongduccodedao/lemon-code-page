import { paths } from "@/utils/paths";
import Link from "next/link";
import React from "react";
import icons from "@/utils/icons";

const { RiSearch2Line } = icons;

const NavBar = () => {
  return (
    <div className="border-b border-gray-300 w-full">
      <div className="flex items-center justify-between max-w-[1200px] w-full mx-auto p-5">
        <div className="flex items-center gap-10">
          <Link href={paths.HOME}>
            <span className="font-semibold text-2xl">{`>_ Lemon Code`}</span>
          </Link>
          <div className="flex items-center border border-gray-300 rounded-md h-9">
            <input
              type="text"
              className="h-full rounded-l-md outline-none px-3"
              placeholder="Search..."
            />
            <button className="hover:bg-green-100 p-2 h-full rounded-md">
              <RiSearch2Line />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link href={paths.CREATE}>
            <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md">
              Create
            </button>
          </Link>
          <Link href={paths.LOGIN}>
            <span className="text-gray-800 hover:text-green-600 hover:underline">
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
