'use client';

import SignInBtn from '@/components/SignInBtn';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

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
      const { name, email, password, password2 } = formData;

      if (!name || !email || !password || !password2) {
        setErrorMessage('All fields are required');
        return;
      }

      // Validate email address
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(email)) {
        setErrorMessage('Invalid email address');
        return;
      }

      // Check if passwords match, and if not, set an error message
      if (password !== password2) {
        setErrorMessage('Passwords do not match');
        return;
      }

      // Check if password is at least 8 characters long, and if not, set an error message
      if (!password || password.length < 8) {
        setErrorMessage('Password must be at least 8 characters long');
        return;
      }

      //! Check if password contains at least one number and one special character. Set for production
      // const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])/;
      // if (!passwordRegex.test(password)) {
      //   setErrorMessage(
      //     'Password must contain at least one number and one special character'
      //   );
      //   return;
      // }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 201 || response.status === 200) {
        const data = await response.json();
        console.log('User registered successfully: ', data);
        // Redirect to login page and send populated email field
        router.push(`/login?email=${email}`);
        return;
      }

      // Reset error message
      setErrorMessage('');
    } catch (error) {
      console.error('Error registering user: ', error);
      setErrorMessage('Error registering user');
    } finally {
      setLoading(false);

      // Reset form data
      setFormData({
        name: '',
        email: '',
        password: '',
        password2: '',
      });
    }
  };

  return (
    <>
      <h1 className="mb-6">Sign-up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          required
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          defaultValue={formData.name}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          defaultValue={formData.email}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          defaultValue={formData.password}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          required
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          defaultValue={formData.password2}
        />
        <button type="submit" className="btn btn-primary w-full">
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
      <p className="my-3">- or -</p>
      <SignInBtn />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </>
  );
};
export default RegisterPage;
