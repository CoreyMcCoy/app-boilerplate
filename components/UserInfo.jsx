'use client';

import SignInBtn from '@/components/SignInBtn';
import { useSession } from 'next-auth/react';

const UserInfo = () => {
  const { data: session, status } = useSession();

  // save the session data in local storage
  if (typeof window !== 'undefined') {
    if (status === 'authenticated') {
      localStorage.setItem('user', JSON.stringify(session.user));
    } else {
      localStorage.removeItem('user');
    }
  }

  return (
    <div>
      {status === 'authenticated' ? (
        <h1 className="text-4xl font-bold mb-8">
          Welcome back {session.user.name}
        </h1>
      ) : (
        <h1 className="text-4xl font-bold mb-8">
          Welcome to the SaaS Boilerplate App
        </h1>
      )}
      <div className="md:w-4/6">
        <p className="text-lg mb-8">
          This is a boilerplate application for building a SaaS application
          using Next.js, React.js, NextAuth, MongoDB, Tailwind CSS, and DaisyUI.
        </p>
        <p className="mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vitae,
          officia error accusamus quia a porro tempore earum vero magnam eum
          consectetur voluptas facilis, nesciunt velit magni eos necessitatibus
          rerum ad soluta et. Voluptatem aut, quis molestias iure saepe corrupti
          architecto sapiente voluptatibus nostrum dolores placeat quasi
          blanditiis reiciendis error!
        </p>
      </div>
      {status === 'authenticated' ? null : (
        <div className="space-x-4">
          <SignInBtn />
        </div>
      )}
    </div>
  );
};
export default UserInfo;
