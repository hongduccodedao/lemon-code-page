import { paths } from "@/utils/paths";
import Link from "next/link";
import React, { useEffect } from "react";
import icons from "@/utils/icons";
import { Logo } from "../logo";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "@/store/user/asyncActions";
import Image from "next/image";
import { handleLogoutRedux } from "@/store/user/userSlice";

const { RiSearch2Line, RiLogoutCircleRLine } = icons;

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
    <div className="border-b border-ctp-overlay0 w-full bg-ctp-base">
      <div className="flex items-center justify-between max-w-[1200px] w-full mx-auto py-5">
        <div className="flex items-center gap-10">
          <Logo />
          <div className="flex items-center border border-ctp-overlay0 rounded-md h-10">
            <input
              type="text"
              className="h-full rounded-l-md outline-none px-3 bg-ctp-overlay0"
              placeholder="Search..."
            />
            <button className="hover:bg-ctp-green hover:text-ctp-crust p-2 h-full rounded-r-md">
              <RiSearch2Line />
            </button>
          </div>
        </div>
        {isLogged ? (
          <div className="flex items-center gap-5">
            <Link href={paths.CREATE}>
              <button className="h-10 px-5 py-2 rounded-md border border-ctp-green text-ctp-green bg-ctp-green bg-opacity-10 hover:bg-opacity-100 hover:text-white duration-300 transition-all ease-in-out">
                Create Post
              </button>
            </Link>
            <Link
              href={`/${current?._id}`}
              title={current?.firstName + " " + current?.lastName}
            >
              <div className="relative w-10 h-10">
                <Image
                  src={current?.avatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full cursor-pointer hover:opacity-80 duration-300 transition-all ease-in-out object-center object-cover"
                />
              </div>
            </Link>
            <span onClick={() => dispatch(handleLogoutRedux())}>
              <RiLogoutCircleRLine className="cursor-pointer hover:text-ctp-red text-2xl duration-300 transition-all ease-in-out" />
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link href={paths.LOGIN}>Login</Link>
            <Link href={paths.REGISTER}>
              <button className="h-10 px-5 py-2 rounded-md border border-ctp-green text-ctp-green bg-ctp-green bg-opacity-10 hover:bg-opacity-100 hover:text-white duration-300 transition-all ease-in-out">
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
