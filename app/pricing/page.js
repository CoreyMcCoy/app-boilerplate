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
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        ...formData,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage(res.error);
        return;
      }
      setErrorMessage('');

      // router.push('/');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      // Close the modal
      const modal = document.getElementById('my_modal_2');
      modal.close();
    }
  };

  return (
    <>
      <h1 className="text-2xl font-medium mb-6 text-white">Pricing</h1>
      <form
        onSubmit={handleCheckout}
        className="w-full py-10 px-6 bg-white rounded-lg"
      >
        <p className="text-xl font-medium mb-8">30 Credits</p>
        <p className="text-4xl font-semibold mb-6">
          $18<span className="text-base font-normal">/One-time payment</span>
        </p>
        <button type="submit" className="btn btn-primary mb-4 w-full">
          But now
        </button>
        <p className="text-xs">
          Literally you probably haven't heard of them jean shorts.
        </p>
      </form>
      {/* Modal */}
      <dialog id="my_modal_2" className="modal text-center">
        <div className="modal-box flex flex-col justify-center items-center bg-white py-10">
          <p className="text-xl font-medium mb-8">You must be signed in.</p>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
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
              Sign-in with Credentials
            </button>
          </form>
          <p className="my-3">- or -</p>
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
