import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-accent-blue mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        className="bg-accent-blue hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
} 