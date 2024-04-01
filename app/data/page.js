import PostsList from '@/components/PostsList';

const url = 'https://jsonplaceholder.typicode.com/posts?_limit=20';

const fetchData = async () => {
  const response = await fetch(url);
  // throw error
  if (!response.ok) {
    throw new Error('Oops! There was an error while fetching the data');
  }
  const data = await response.json();
  return data;
};

const DataPage = async () => {
  const data = await fetchData();
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Data Page</h1>
      <div className="md:w-4/6 mb-14">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
          consequuntur excepturi aliquid obcaecati rem tenetur accusamus
          quibusdam, dolorum harum provident?
        </p>
        <div className="mockup-code mt-4 lg:w-3/4 border-gray-700 border-2 shadow-lg">
          <pre data-prefix="$">
            <code className="text-sm">
              https://jsonplaceholder.typicode.com/posts?_limit=20
            </code>
          </pre>
        </div>
      </div>
      <PostsList posts={data} />
    </div>
  );
};
export default DataPage;
