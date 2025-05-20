'use client';
import { getRandomString } from '@/lib/utils';
import { useState } from 'react';

export default function CommentForm({ projectId }: { projectId: any }) {
    const [authorName, setAuthorName] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!authorName.trim() || !content.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, authorName, content, avatarUrl }),
            });

            if (response.ok) {
                setAuthorName('');
                setContent('');
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 3000);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const [avatarUrl] = useState(getRandomString());
    


    return (
        <>
            {/* <div className="mt-6 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>

            {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Comment submitted and awaiting approval.
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="authorName" className="block text-gray-700 mb-2">
                            Display Name
                        </label>
                        <input
                            type="text"
                            id="authorName"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 mb-2">
                            Comment
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                    </button>
                </form>
            )}
        </div> */}

            {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Comment submitted and awaiting approval.
                </div>
            ) : (
                <div className="glass-card rounded-[8px] w-full p-[1rem] no-scrollbar">
                    <form onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col gap-4 p-[.5rem]">
                            <div className="flex items-center gap-2">
                                <img
                                    src={avatarUrl}
                                    alt="visitor"
                                    className="w-5 h-5"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    id="authorName"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    className="h-[1rem] px-2 py-3 text-[.8rem] focus:outline-none rounded-[4px]"
                                    style={{
                                        background: "var(--neg-back)",
                                        color: "var(--input-color)",
                                    }}
                                    required
                                />
                            </div>

                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={4}
                                required
                                placeholder="Enter comment..."
                                className="min-h-[5rem] p-1 text-[13px] focus:outline-none focus:border-[#6886c5] w-full border-b-1 border-[#888] rounded-[8px]"
                                style={{
                                    color: "var(--input-color)",
                                }}
                            />

                            <div className="w-full flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="glass-card rounded-[8px] px-2 py-1 cursor-pointer hover:scale-103 ">
                                    <span className="text-[12px]">
                                        {isSubmitting ? 'Submitting...' : 'Comment'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

        </>
    );
}

