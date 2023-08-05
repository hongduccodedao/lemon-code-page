import { paths } from "@/utils/paths";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={paths.HOME}>
      <span className="font-semibold text-2xl">{`🍋LeM0n c0d3`}</span>
    </Link>
  );
};

export default Logo;
