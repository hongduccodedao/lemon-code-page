import { paths } from "@/utils/paths";
import Link from "next/link";
import React from "react";
import icons from "@/utils/icons";
import { Logo } from "../logo";
import { useSelector } from "react-redux";
import Image from "next/image";

const { RiSearch2Line } = icons;

const NavBar = () => {
  const { isLogged, current } = useSelector((state) => state.user);

  return (
    <div className="border-b border-gray-300 w-full bg-white">
      <div className="flex items-center justify-between max-w-[1200px] w-full mx-auto p-5">
        <div className="flex items-center gap-10">
          <Logo />
          <div className="flex items-center border border-gray-300 rounded-md h-10">
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
        {isLogged ? (
          <div className="flex items-center gap-5">
            <Link href={paths.CREATE}>
              <button className="h-10 px-5 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white duration-300 transition-all ease-in-out">
                Create Post
              </button>
            </Link>
            <Link href={`/${current._id}`} title="Index">
              <div className="relative w-10 h-10">
                <Image
                  src={current?.avatar}
                  layout="fill"
                  className="rounded-full"
                />
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link href={paths.LOGIN}>Login</Link>
            <Link href={paths.REGISTER}>
              <button className="h-10 px-5 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white duration-300 transition-all ease-in-out">
                Create Account
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
