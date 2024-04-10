'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="navbar px-8 flex justify-between">
      <Link href="/" className="text-lg font-medium">
        SaaS Boilerplate
      </Link>
      <div className="gap-5">
        <Link href="/pricing" className="text-sm">
          Pricing
        </Link>

        {status === 'authenticated' ? (
          <>
            <Link href="#" onClick={() => signOut()} className="btn text-sm">
              Sign-out
            </Link>
          </>
        ) : (
          <>
            <Link className="text-sm" href="/login">
              Sign-in
            </Link>

            <Link className="text-sm" href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
