"use client";

// This file contains data fetching functions that can be imported in client components
import prisma from "@/lib/prisma";

// Get all projects with their related data
export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        desc: {
          include: {
            objectives: true
          }
        }
      }
    });
    
    // Process the data to ensure technologies is properly handled
    return projects.map((project: any) => ({
      ...project,
      technologies: typeof project.technologies === 'string' 
        ? project.technologies // Keep as string, will be parsed in components
        : JSON.stringify(project.technologies) // Ensure it's a string if it's not
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// Get a single project by ID
export async function getProjectById(id: number) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        desc: {
          include: {
            objectives: true
          }
        }
      }
    });
    
    if (!project) return null;
    
    return {
      ...project,
      technologies: typeof project.technologies === 'string' 
        ? project.technologies
        : JSON.stringify(project.technologies)
    };
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    return null;
  }
}

// Add a comment to a project
export async function addComment(projectId: number, authorName: string, authorEmail: string, content: string) {
  try {
    const comment = await prisma.comment.create({
      data: {
        projectId,
        authorName,
        authorEmail,
        content,
        // Set isApproved based on your requirements - false by default in schema
      }
    });
    
    return comment;
  } catch (error) {
    console.error("Error adding comment:", error);
    return null;
  }
}

// Get comments for a project
export async function getProjectComments(projectId: number, onlyApproved = true) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        projectId,
        ...(onlyApproved ? { isApproved: true } : {})
      },
      orderBy: { createdAt: "desc" }
    });
    
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}