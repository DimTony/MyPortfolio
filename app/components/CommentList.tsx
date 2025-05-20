import { getRandomString } from "@/lib/utils";

export default function CommentList({ comments }: { comments: any }) {
    if (comments.length === 0) {
        return <p className="text-gray-500 italic">No comments yet.</p>;
    }

    return (
        <>
            {/* <div className="space-y-4">
                {comments.map((comment: any) => (
                    <div key={comment.id} className="border-l-4 border-gray-300 pl-4 py-2">
                        <div className="font-semibold">{comment.authorName}</div>
                        <div className="text-gray-700 mt-1">{comment.content}</div>
                        <div className="text-gray-400 text-sm mt-1">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div> */}

            <div className="glass-card rounded-[8px] w-full max-h-[25rem] p-[1rem] overflow-auto no-scrollbar">
                <div>
                    {comments.map((comment: any, idx: any) => (
                        <div
                            key={idx}
                            className="w-full border-y border-[var(--glassmorph-nav-border)] rounded-[8px] flex flex-col gap-4 p-[.5rem]"
                        >
                            <div className="flex items-center gap-2">
                                <img
                                    src={comment.avatarUrl}
                                    alt="visitor"
                                    className="w-5 h-5"
                                />
                                <span
                                    style={{
                                        color: "var(--resume-foreground)",
                                    }}
                                    className="text-[.8rem]"
                                >
                                    {comment.authorName}
                                </span>
                            </div>

                            <span
                                style={{
                                    color: "var(--resume-foreground)",
                                }}
                                className="text-[.8rem]"
                            >
                                {comment.content}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}