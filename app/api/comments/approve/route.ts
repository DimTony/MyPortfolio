import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();
  const commentId = formData.get('commentId') as string;

  try {
    await prisma.comment.update({
      where: { id: Number(commentId) },
      data: { isApproved: true },
    });

    return NextResponse.redirect(new URL('/cockpit/comments', req.url));
  } catch (error) {
    console.error('❌ Error approving comment:', error);
    return NextResponse.json({ error: 'Failed to approve comment' }, { status: 500 });
  }
}
