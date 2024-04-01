'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function SignInBtn() {
  return (
    <button
      onClick={() => signIn('google')}
      className="btn btn-btn-ghost font-semibold"
    >
      <span className="font-semibold">Login with</span>
      <Image src="/google.png" alt="Google Logo" width={20} height={20} />
    </button>
  );
}
