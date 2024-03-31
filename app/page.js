import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        Welcome to the SaaS Boilerplate App
      </h1>
      <div className="md:w-4/6">
        <p className="text-lg mb-8">
          This is a boilerplate application for building a SaaS application
          using Next.js, React.js, NextAuth, MongoDB, Tailwind CSS, and DaisyUI.
        </p>
        <p className="mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vitae,
          officia error accusamus quia a porro tempore earum vero magnam eum
          consectetur voluptas facilis, nesciunt velit magni eos necessitatibus
          rerum ad soluta et. Voluptatem aut, quis molestias iure saepe corrupti
          architecto sapiente voluptatibus nostrum dolores placeat quasi
          blanditiis reiciendis error!
        </p>
      </div>
      <div className="space-x-4">
        <Link href="/sign-up" className="btn btn-primary font-semibold">
          Sign-up
        </Link>
      </div>
    </>
  );
};
export default HomePage;
