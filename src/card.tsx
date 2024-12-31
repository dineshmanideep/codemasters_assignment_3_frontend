import React from 'react';

type BlogCard = {
  id: number;
  title: string;
  content: string;
  imageurl: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  authorId: number;
};

const Card = ({ title, id, content, imageurl, authorName, createdAt }: BlogCard) => {
  // Format the date to a more readable format
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    weekday: "short",  // Example: Mon, Tue
    year: "numeric",   // Example: 2024
    month: "short",    // Example: Jan, Feb
    day: "numeric",    // Example: 31
  });

  return (
    <div className="flex items-center gap-6 text-white bg-slate-700 p-6 w-5/6 max-w-4xl rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section - Image is optional */}
      {imageurl ? (
        <img
          src={imageurl}
          alt={title}
          className="w-48 h-32 object-cover rounded-md"
        />
      ) : (
        <div className="w-48 h-32 bg-gray-500 rounded-md" /> // Placeholder if no image
      )}

      {/* Description Section */}
      <div className="flex flex-col">
        <a href={`/blog/${id}`}><h1 className="text-2xl font-bold mb-2">{title}</h1></a>
        <p className="text-sm text-gray-400 mb-1">By Author: {authorName || 'Unknown'}</p>
        <p className="text-sm text-gray-400 mb-4">Published on: {formattedDate}</p>
        <p className="text-gray-200 line-clamp-3">{content}</p>
      </div>
    </div>
  );
};

export default Card;
