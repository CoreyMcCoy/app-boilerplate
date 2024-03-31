import Link from 'next/link';

const links = [
  { href: '/about', label: 'About', color: 'base-content' },
  { href: '/data', label: 'Data', color: 'text-accent' },
  { href: '/sign-up', label: 'Sign-up', color: 'base-content' },
];
const Navbar = () => {
  return (
    <div className="navbar bg-base-300 px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
        <Link href="/" className="font-semibold pl-2 lg:p-0">
          SaaS App Boilerplate
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
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
      <div className="navbar-end">
        <Link href="#" className="btn">
          Login
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
