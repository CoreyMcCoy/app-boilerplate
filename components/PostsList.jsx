import Link from 'next/link';

const PostsList = ({ posts }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <div
          key={post.id}
          className="mb-4 card bg-neutral border-gray-700 border-2 shadow-lg"
        >
          <div className="card-body">
            <Link href={`/data/${post.id}`}>
              <h3 className="font-bold mb-4 text-gray-500">{post.title}</h3>
            </Link>
            <p className="">{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PostsList;
