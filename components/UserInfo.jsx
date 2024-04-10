'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

const UserInfo = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    console.log('From inside the UserInfo function', session);
    return (
      <div className="p-16 gap-3 rounded-md shadow-xl flex flex-col items-center bg-base-300">
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
        <h1 className="text-2xl font-medium">
          Welcome back {session?.user?.name}
        </h1>
        <p>Email: {session?.user?.email}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-2xl font-medium mb-8">
          Welcome to the SaaS Boilerplate App
        </h1>

        <p className="mb-8">
          This is a boilerplate application for building a SaaS application
          using Next.js, React.js, NextAuth, MongoDB, Tailwind CSS, and DaisyUI.
        </p>
      </div>
    );
  }
};
export default UserInfo;
