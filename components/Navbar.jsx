import Link from 'next/link';

const links = [
  { href: '/sign-up', label: 'Sign-up', color: 'base-content' },
  { href: '/login', label: 'Login', color: 'base-content' },
  { href: '/about', label: 'About', color: 'base-content' },
  { href: '/data', label: 'Data', color: 'text-accent' },
];
const Navbar = () => {
  return (
    <nav className="bg-base-300 py-4">
      <div className="navbar px-8 max-w-6xl mx-auto flex justify-between">
        <div>
          <Link href="/" className="font-semibold text-lg">
            SaaS App Boilerplate
          </Link>
        </div>
        <div>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52 space-y-4"
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
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
