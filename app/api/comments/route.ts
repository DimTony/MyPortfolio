
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function POST(request: any) {
  try {
    const body = await request.json();
    const { projectId, authorName, content, avatarUrl } = body;
    
    const comment = await prisma.comment.create({
      data: {
        projectId: Number(projectId),
        authorName,
        content,
        avatarUrl,
        isApproved: false,
      },
    });
    
    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to submit comment' },
      { status: 500 }
    );
  }
}