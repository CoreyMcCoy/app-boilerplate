'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="navbar px-8 py-6 flex justify-between">
      <div className="space-x-10">
        <Link href="/" className="text-lg font-bold">
          SaaS
        </Link>
        <Link href="/pricing">Pricing</Link>
      </div>
      <div className="gap-5">
        {status === 'authenticated' ? (
          <>
            <Link href="#" onClick={() => signOut()} className="btn text-sm">
              Sign-out
            </Link>
            {/* If there's is a session.user.image display it and if not display the placeholder */}
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <Image
                src="/placeholder-image.png"
                alt="User Image"
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
          </>
        ) : (
          <>
            <Link href="/login">Sign-in</Link>

            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
