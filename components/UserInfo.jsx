'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

const UserInfo = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <div className="p-12 gap-3 rounded-md shadow-xl flex flex-col items-center bg-white">
        {/* If there's is a session.user.image display it and if not display the placeholder */}
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={70}
            height={70}
            className="rounded-full"
          />
        ) : (
          <Image
            src="/placeholder-image.png"
            alt="User Image"
            width={70}
            height={70}
            className="rounded-full"
          />
        )}
        <h1 className="text-2xl font-medium">
          Welcome back {session?.user?.name}
        </h1>
        <p>Email: {session?.user?.email}</p>
      </div>
    );
  } else {
    return (
      <div className="text-white">
        <h1 className="text-2xl font-medium mb-6">
          Welcome to the SaaS Boilerplate App
        </h1>

        <p>
          This is a boilerplate application for building a SaaS application
          using Next.js, React.js, NextAuth, MongoDB, Tailwind CSS, and DaisyUI.
        </p>
      </div>
    );
  }
};
export default UserInfo;
