// This is a server-side API route - /api/projects/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        desc: {
          include: {
            objectives: true
          }
        },
        comments: true
      }
    });
    
    // Process the data to ensure technologies is properly handled
    const formattedProjects = projects.map(project => ({
      ...project,
      technologies: typeof project.technologies === 'string' 
        ? JSON.parse(project.technologies) // Parse for client usage
        : project.technologies
    }));
    
    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// Handle creating a new project
export async function POST(request: any) {
  try {
    const data = await request.json();
    
    // Prepare data for database
    const projectData = {
      title: data.title,
      description: data.description,
      technologies: typeof data.technologies === 'object' 
        ? JSON.stringify(data.technologies) 
        : data.technologies,
      role: data.role,
      dash: data.dash,
      thumbnail: data.thumbnail,
      releaseStatus: data.releaseStatus,
      maintainStatus: data.maintainStatus,
      date: data.date,
      githubUrl: data.githubUrl,
      demoUrl: data.demoUrl,
    };
    
    // Create the project description if provided
    if (data.desc) {
      // Create a new project with related data in a transaction
      const result = await prisma.$transaction(async (tx) => {
        // Create the ProjectDescription first
        const projectDesc = await tx.projectDescription.create({
          data: {
            title: data.desc.title,
            summary: data.desc.summary,
            footer: data.desc.footer,
            objectives: {
              create: data.desc.objectives.map((obj: any) => ({
                text: obj.text
              }))
            }
          }
        });
        
        // Create the Project with reference to the ProjectDescription
        const project = await tx.project.create({
          data: {
            ...projectData,
            descId: projectDesc.id
          },
          include: {
            desc: {
              include: {
                objectives: true
              }
            }
          }
        });
        
        return project;
      });
      
      return NextResponse.json(result);
    } else {
      // Create project without description
      const project = await prisma.project.create({
        data: projectData
      });
      
      return NextResponse.json(project);
    }
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}