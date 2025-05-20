'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/cockpit';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Invalid credentials');
                setLoading(false);
                return;
            }

            // Redirect to the callback URL or admin dashboard
            router.push(callbackUrl);
        } catch (error) {
            setError('An error occurred during login');
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1
                style={{
                    color: 'var(--resume-foreground)'
                }}
                className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        style={{
                            color: 'var(--resume-foreground)'
                        }}
                        htmlFor="email" className="block mb-2 text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                        style={{
                            color: 'var(--resume-foreground)'
                        }}
                    />
                </div>

                <div className="mb-6">
                    <label
                        style={{
                            color: 'var(--resume-foreground)'
                        }} htmlFor="password" className="block mb-2 text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                        style={{
                            color: 'var(--resume-foreground)'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>

            <div className="mt-4 text-sm text-center text-gray-600">
                {/* <p>Demo credentials: admin@example.com / admin123</p> */}
            </div>
        </div>
    );
}