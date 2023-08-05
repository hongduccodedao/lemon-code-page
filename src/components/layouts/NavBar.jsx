import { paths } from "@/utils/paths";
import Link from "next/link";
import React, { useEffect } from "react";
import icons from "@/utils/icons";
import { Logo } from "../logo";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "@/store/user/asyncActions";

const { RiSearch2Line } = icons;

const NavBar = () => {
  const dispatch = useDispatch();
  const { isLogged, current } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLogged) dispatch(getCurrent());
    }, 300);

    return () => clearTimeout(setTimeoutId);
  }, [dispatch, isLogged]);

  return (
    <div className="border-b border-gray-300 w-full bg-white">
      <div className="flex items-center justify-between max-w-[1200px] w-full mx-auto py-5">
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
            <Link
              href={`/${current?._id}`}
              title={current?.firstName + " " + current?.lastName}
            >
              <div className="relative w-10 h-10">
                <img
                  src={current?.avatar}
                  alt="avatar"
                  className="rounded-full object-cover object-center"
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
