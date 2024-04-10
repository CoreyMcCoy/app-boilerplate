'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import SignInBtn from '@/components/SignInBtn';

const LoginPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn('credentials', {
      ...formData,
      redirect: false,
    });

    router.push('/');

    // Reset error message
    setErrorMessage('');
  };

  return (
    <>
      <h1 className="text-2xl font-medium mb-8">Sign-in</h1>
      <div className="w-full px-6 py-12 rounded-lg bg-base-200">
        <form onSubmit={handleSubmit} className="text-black">
          <label className="text-sm input bg-gray-200 flex items-center mb-5 gap-2">
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              className="placeholder-slate-700"
              onChange={handleChange}
              defaultValue={formData.email}
            />
          </label>

          <label className="text-sm input bg-gray-200 flex items-center mb-5 gap-2">
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className="placeholder-slate-700"
              onChange={handleChange}
              defaultValue={formData.password}
            />
          </label>

          <button
            type="submit"
            className="btn btn-success font-semibold w-full"
          >
            Sign-in with Credentials
          </button>
        </form>
        <p className="my-3 text-sm">- or -</p>
        <SignInBtn />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
    </>
  );
};
export default LoginPage;
