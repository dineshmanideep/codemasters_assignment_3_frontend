
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-center">
        {/* Error message */}
        <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
        <p className="mt-4 text-lg text-gray-300">We couldn't find the page you're looking for.</p>
        
        {/* Optionally, add an error code */}
        <p className="mt-4 text-2xl font-semibold text-gray-500">Error 404</p>
        
        {/* Link to go back to home */}
        <div className="mt-8">
          <Link
            to="/"
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-xl"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
