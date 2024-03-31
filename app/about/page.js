import Link from 'next/link';

const AboutPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">About SaaS Boilerplate App</h1>
      <div className="md:w-4/6">
        <p className="mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vitae,
          officia error accusamus quia a porro tempore earum vero magnam eum
          consectetur voluptas facilis, nesciunt velit magni eos necessitatibus
          rerum ad soluta et. Voluptatem aut, quis molestias iure saepe corrupti
          architecto sapiente voluptatibus nostrum dolores placeat quasi
          blanditiis reiciendis error!
        </p>
      </div>
      <Link href="/" className="btn btn-primary font-semibold">
        Home
      </Link>
    </div>
  );
};
export default AboutPage;
