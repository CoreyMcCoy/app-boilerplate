'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const links = [
  { href: '/about', label: 'About', color: 'base-content' },
  { href: '/pricing', label: 'Pricing', color: 'base-content' },
  { href: '/register', label: 'Register', color: 'text-accent' },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="navbar bg-base-300 px-8">
      <div className="navbar-start">
        {/* Mobile view */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links.map((link) => {
              return (
                <li key={link.href}>
                  <Link href={link.href} className={link.color}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* End mobile view */}

        {/* Desktop view */}
        <Link href="/" className="font-semibold pl-2 lg:p-0">
          {/* display the Image: saas-icon.png if screen is smaller than large */}
          <div className="hidden lg:flex">
            <span className="text-lg">SaaS Boilerplate</span>
          </div>
          <div className="lg:hidden">
            <Image
              src="/saas-icon.png"
              alt="SaaS Icon"
              width={40}
              height={40}
            />
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link) => {
            return (
              <li key={link.href}>
                <Link href={link.href} className={link.color}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* End desktop view */}

      {/* Image and button */}
      <div className="navbar-end">
        {status === 'authenticated' ? (
          <>
            <Link href="#" onClick={() => signOut()} className="btn">
              Logout
            </Link>
          </>
        ) : (
          <Link href="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
