import prisma from '@/lib/prisma';


export default async function AdminCommentsPage() {
  // Add authentication check here
  
  const pendingComments = await prisma.comment.findMany({
    where: { isApproved: false },
    include: { project: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Pending Comments</h1>
      
      {pendingComments.length === 0 ? (
        <p>No pending comments to review.</p>
      ) : (
        <div className="space-y-6">
          {pendingComments.map(comment => (
            <div key={comment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold">{comment.authorName}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    on project: {comment.project.title}
                  </span>
                </div>
                <div className="text-gray-400 text-sm">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <p className="my-3">{comment.content}</p>
              
              <div className="flex gap-2 mt-4">
                <form action="/api/comments/approve" method="POST">
                  <input type="hidden" name="commentId" value={comment.id} />
                  <button 
                    type="submit"
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Approve
                  </button>
                </form>
                
                <form action="/api/comments/delete" method="POST">
                  <input type="hidden" name="commentId" value={comment.id} />
                  <button 
                    type="submit"
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}