// This is a server-side API route - /app/api/projects/[id]/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getRandomString } from '@/lib/utils';

// Define the params type for dynamic route
interface RouteParams {
  params: {
    id: string;
  };
}

// Interface for comment data
interface CommentData {
  authorName: string;
  authorEmail?: string;
  content: string;
}

// Get comments for a specific project
export async function GET(
  request: NextRequest, 
  { params }: any
): Promise<NextResponse> {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    // Get searchParams from request URL
    const searchParams = request.nextUrl.searchParams;
    const showAll = searchParams.get('showAll') === 'true';
    
    const comments = await prisma.comment.findMany({
      where: {
        projectId: id,
        ...(!showAll ? { isApproved: true } : {})
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error(`Error fetching comments for project ${params.id}:`, error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// Add a comment to a project
export async function POST(
  request: NextRequest, 
  { params }: any
): Promise<NextResponse> {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    const data = await request.json() as CommentData;
    
    // Validate required fields
    if (!data.authorName || !data.content) {
      return NextResponse.json(
        { error: "Author name and content are required" },
        { status: 400 }
      );
    }
    
    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        projectId: id,
        authorName: data.authorName,
        avatarUrl: getRandomString(),
        content: data.content,
        isApproved: false, // Default to false, admin needs to approve
      }
    });
    
    return NextResponse.json(comment);
  } catch (error) {
    console.error(`Error adding comment to project ${params.id}:`, error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}