import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To access the post ID from the URL
import Navbar from './components/navbar';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ;


type User = {
  id: number;
  username: string;
  email: string;
  age: number;
  password: string;

};

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

const Blogpage = () => {
  const { id } = useParams(); // Extract the post ID from the URL
  const [post, setPost] = useState<BlogCard | null>(null); // State to store post details
  const [loading, setLoading] = useState(true); // Loading state
  const [user, setUser] = useState<User | null>(null); // State for logged-in user

  // Fetch user data
  const fetchUser = async () => {
    try {
      console.log(BACKEND_URL);
      console.log(`${BACKEND_URL}`);
      const response = await fetch(`${BACKEND_URL}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  // Fetch post data by ID when the component mounts
  useEffect(() => {
    const getUser = async () => {
      await fetchUser();
    };

    getUser();

    const fetchPost = async () => {
      try {
        console.log(BACKEND_URL);
        console.log(`${BACKEND_URL}/blog/${id}`);
        const response = await fetch(`${BACKEND_URL}/blog/${id}`,{
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setPost(data);
        } else {
          console.error('Error fetching post data:', data);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]); // Fetch post data when the ID changes

  // If the page is loading, show loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // If post not found, show error message
  if (!post) {
    return <p>Post not found.</p>;
  }

  // Format the created date to show only day, date, and year
  const formattedDate = new Date(post.createdAt).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <Navbar />
      <div className="bg-slate-800 text-white text-center items-center rounded-lg p-10">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        
        
        <p className="text-xl font-extrabold">{post.authorName}</p>
        <p className="font-extralight">{formattedDate}</p>
        <hr className='my-4' />
        {/* Use <a> tag for redirection with button-like styling */}
        {user?.id === post.authorId && (
          <a
            href={`/updatepost/${post.id}`}
            className="text-white my-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Edit
          </a>
        )}

{(post.imageurl) && (
    <div className="flex justify-center items-center mt-2">
        <img 
            src={post.imageurl} 
            alt="Post" 
            className="w-full max-w-[500px] py-4 h-auto rounded-lg object-cover" 
        />
    </div>
)}

        <div className="textbox px-36 pt-6">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Blogpage;
