import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
