import { useState, useEffect } from 'react';
import Card from './card';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

type BlogCard = {
  title: string;
  id: number;
  content: string;
  imageurl: string;
  authorId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

const Listingpage = () => {
  const [blogs, setBlogs] = useState<BlogCard[]>([]); // Initialize as an empty array

  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/blogs`,{
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      console.log("Fetched blogs:", data);
      setBlogs(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once when the component mounts

  return (
    <div className="bg-slate-900 items-center flex flex-col gap-3 min-h-screen">
      {blogs.length > 0 ? (
        blogs.map((blog: BlogCard) => (
          <Card
            key={blog.id} // Adding key for list items
            title={blog.title}
            content={blog.content}
            imageurl={blog.imageurl}
            authorId={blog.authorId}
            createdAt={blog.createdAt}
            authorName={blog.authorName}
            id={blog.id}
            updatedAt={blog.updatedAt}
          />
        ))
      ) : (
        <p className='text-white text-4xl py-8'>No blogs found  </p>
      )}
    </div>
  );
};

export default Listingpage;
