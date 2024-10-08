import { useRouter } from 'next/router';
export const runtime = 'edge';


export default function NotFound() {
  const router = useRouter();

  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for could not be found.</p>
      <p>Please check the URL or try searching for something else.</p>
      <button onClick={() => router.push('/')}>Go to Homepage</button>
    </div>
  );
}