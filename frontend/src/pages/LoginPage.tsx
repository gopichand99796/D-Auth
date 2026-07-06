import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/Spinner';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center bg-[#f9f9f9] px-4 py-12">
      <div className="w-full rounded-lg border border-gray-200 bg-white p-10 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue browsing.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <Spinner /> : 'Login'}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <p className="mt-6 text-center text-sm text-gray-600">
          Need an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
