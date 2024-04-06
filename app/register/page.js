'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // Validate email address
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = formData;

    // Check if email is valid, and if not, set an error message
    if (!isValidEmail(email)) {
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

    // Reset error message
    setErrorMessage('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error registering user: ', error);
      setErrorMessage('Error registering user');
    }
  };

  return (
    <div className="md:w-1/2 mx-auto text-center">
      <div className="mx-auto ">
        <h1 className="text-4xl font-bold mb-8">Register</h1>
        <p className="mb-8">Set-up your account.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="text-sm input input-bordered border-2 flex items-center mb-5 gap-2">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="grow"
            required
            onChange={handleChange}
            defaultValue={formData.name}
          />
        </label>

        <label className="text-sm input input-bordered border-2 flex items-center mb-5 gap-2">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="grow"
            required
            onChange={handleChange}
            defaultValue={formData.email}
          />
        </label>

        <label className="text-sm input input-bordered border-2 flex items-center mb-5 gap-2">
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="grow"
            required
            onChange={handleChange}
            defaultValue={formData.password}
          />
        </label>
        <label className="text-sm input input-bordered border-2 flex items-center mb-5 gap-2">
          <input
            type="password"
            placeholder="Confirm password"
            name="password2"
            className="grow"
            required
            onChange={handleChange}
            defaultValue={formData.password2}
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary font-semibold w-full mb-5"
        >
          Register
        </button>
      </form>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};
export default RegisterPage;
