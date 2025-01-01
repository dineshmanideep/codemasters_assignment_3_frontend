import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams<{ id: string }>(); // Post ID from URL
  const navigate = useNavigate();

  const fetchPost = async () => {
    if (!id) return;
    try {
      const response = await fetch(`${BACKEND_URL}/blog/${id}`, {
        method: "GET",
        credentials: "include", // Send credentials with the request
      });
      if (response.ok) {
        const post = await response.json();
        setTitle(post.title);
        setImageUrl(post.imageurl || "");
        setContent(post.content);
      } else {
        console.error("Failed to fetch post.");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    const postData = {
      title,
      imageurl: imageUrl,
      content,
    };

    try {
      setIsSubmitting(true);
      const method = id ? "PUT" : "POST";
      const url = id ? `${BACKEND_URL}/blog/${id}` : `${BACKEND_URL}/createblog`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
        credentials: "include", // Ensure credentials are included
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert(id ? "Post updated successfully!" : "Post created successfully!");
        navigate("/"); // Navigate to the blogs list
      } else {
        alert(data.message || "Error submitting post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-4 bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white">
          {id ? "Edit Your Post" : "Create a New Post"}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Title input */}
          <div className="mb-4">
            <label htmlFor="title" className="text-white">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter post title"
            />
          </div>

          {/* Image URL input */}
          <div className="mb-4">
            <label htmlFor="imageUrl" className="text-white">Image URL</label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter image URL"
            />
          </div>

          {/* Content input */}
          <div className="mb-4">
            <label htmlFor="content" className="text-white">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter post content"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : id ? "Update Post" : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
