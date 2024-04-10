'use client';

import Link from 'next/link';
import { createCheckoutSession } from '@/app/actions/createCheckoutSession';
import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import SignInBtn from '@/components/SignInBtn';
import { useRouter } from 'next/navigation';

const PricingPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleCheckout = async (e) => {
    e.preventDefault();
    // If the user is not authenticated, open the modal and show the sign-in button
    if (status !== 'authenticated') {
      const modal = document.getElementById('my_modal_2');
      modal.showModal();
    } else {
      // If the user is authenticated, create a checkout session
      const checkoutURL = await createCheckoutSession();
      window.location.assign(checkoutURL);
    }
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn('credentials', {
      ...formData,
      redirect: false,
    });

    router.push('/');

    setErrorMessage('');
  };

  return (
    <>
      <h1 className="text-2xl font-medium mb-6">Pricing</h1>
      <form
        onSubmit={handleCheckout}
        className="w-full p-6 rounded-lg border-2 border-gray-700 relative overflow-hidden"
      >
        <h3 className="text-xl mb-8">30 Credits</h3>
        <h2 className="text-4xl font-semibold">$18</h2>
        <p className="my-2">One-time payment</p>
        <button
          type="submit"
          className="btn flex text-center items-center w-full focus:outline-none rounded my-6"
        >
          Button
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-auto"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        <p className="text-xs text-gray-400">
          Literally you probably haven't heard of them jean shorts.
        </p>
      </form>
      {/* Modal */}
      <dialog id="my_modal_2" className="modal text-center">
        <div className="modal-box h-3/5 flex flex-col justify-center items-center">
          <h3 className="font-medium mb-6">You must be signed in</h3>
          <form
            onSubmit={handleSubmit}
            className="w-full p-6 rounded-lg text-black"
          >
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
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
export default PricingPage;
