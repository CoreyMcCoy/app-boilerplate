'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function SignInBtn() {
  return (
    <button
      onClick={() => signIn('google')}
      className="btn bg-white hover:bg-white w-full"
    >
      <Image src="/google.png" alt="Google Logo" width={20} height={20} />
      <span className="font-medium text-info-content ml-2 ">
        Sign-in with Google
      </span>
    </button>
  );
}
