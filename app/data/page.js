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
      <PostsList posts={data} />
    </div>
  );
};
export default DataPage;
