import Link from 'next/link';
const url = 'https://jsonplaceholder.typicode.com/posts/';

const getSinglePost = async (id) => {
  const response = await fetch(`${url}/${id}`);
  if (!response.ok) {
    throw new Error('Oops! There was an error while fetching the data');
  }
  return response.json();
};

const SinglePostPage = async ({ params }) => {
  const data = await getSinglePost(params.id);
  const title = data?.title || 'No title';
  const body = data?.body || 'No body';

  return (
    <div className="md:w-4/6">
      <h1 className="text-3xl font-bold mb-4">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h1>
      <p className="mt-8 mb-12">{body}</p>
      <Link href="/data" className="text-secondary">
        Back to Data
      </Link>
    </div>
  );
};
export default SinglePostPage;
