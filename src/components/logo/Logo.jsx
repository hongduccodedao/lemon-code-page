import { paths } from '@/utils/paths';
import Link from 'next/link';
import React from 'react'

const Logo = () => {
  return (
    <Link href={paths.HOME}>
      <span className="font-semibold text-2xl">{`>_ Lemon Code`}</span>
    </Link>
  );
}

export default Logo