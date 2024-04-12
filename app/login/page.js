'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SignInBtn from '@/components/SignInBtn';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const newParams = searchParams.get('email');
  const [formData, setFormData] = useState({
    email: newParams ? newParams : '',
    password: '',
  });

  // useEffect(() => {
  //   if (router.isReady && router.query.email) {
  //     setFormData((formData) => ({ ...formData, email: router.query.email }));
  //   }
  // }, [router.isReady, router.query.email]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setErrorMessage('Please fill in all fields');
        return;
      }

      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        console.log(res);
        setErrorMessage('error.message');
      }

      // Reset error message
      setErrorMessage('');

      router.push('/');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);

      // Reset form data
      setFormData({
        email: '',
        password: '',
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-medium mb-6 text-white">Sign-in</h1>
      <div className="bg-white rounded-lg py-10 px-6">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="input input-bordered input-primary border-2 w-full mb-4 bg-white"
            onChange={handleChange}
            defaultValue={formData.email}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="input input-bordered input-primary border-2 w-full mb-4 bg-white"
            onChange={handleChange}
            defaultValue={formData.password}
          />

          <button type="submit" className="btn btn-primary w-full">
            {loading ? 'Loading...' : 'Sign-in with Credentials'}
          </button>
        </form>
        <p className="my-3">- or -</p>
        <SignInBtn />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
    </>
  );
};
export default LoginPage;
