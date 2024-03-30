import Link from 'next/link';

const PostsList = ({ posts }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Data Page</h1>
      <div className="md:w-4/6 mb-14">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
          consequuntur excepturi aliquid obcaecati rem tenetur accusamus
          quibusdam, dolorum harum provident?
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="mb-4">
            <Link href={`/data/${post.id}`}>
              <h3 className="font-bold mb-4 text-gray-500">{post.title}</h3>
              <p className="">{post.body}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PostsList;
