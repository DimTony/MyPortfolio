// This is a server-side API route - /app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the params type for dynamic route
interface RouteParams {
  params: {
    id: string;
  };
}

// Define interfaces for the expected request body
interface ProjectObjective {
  text: string;
  id?: number;
}

interface ProjectDescription {
  title: string;
  summary: string;
  footer: string;
  objectives: ProjectObjective[];
  id?: number;
}

interface ProjectData {
  title: string;
  description: string;
  technologies: string[] | string;
  role: string;
  dash: string;
  thumbnail: string;
  releaseStatus: string;
  maintainStatus: string;
  date: string;
  githubUrl?: string;
  demoUrl?: string;
  desc?: ProjectDescription;
}

// Get a specific project by ID
export async function GET(
  request: NextRequest, 
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
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
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    // Format the project data for client
    const formattedProject = {
      ...project,
      technologies: typeof project.technologies === 'string' 
        ? JSON.parse(project.technologies) 
        : project.technologies
    };
    
    return NextResponse.json(formattedProject);
  } catch (error) {
    console.error(`Error fetching project with id ${params.id}:`, error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// Update a project
export async function PUT(
  request: NextRequest, 
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    const data = await request.json() as ProjectData;
    
    // Prepare project data for update
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
    
    let updatedProject;
    
    // If there's description data, handle the relationship updates
    if (data.desc) {
      updatedProject = await prisma.$transaction(async (tx) => {
        // Check if there's an existing description
        const existingProject = await tx.project.findUnique({
          where: { id },
          select: { descId: true }
        });
        
        let descId = existingProject?.descId;
        
        // If there's a description ID, update it
        if (descId) {
          // Update the existing ProjectDescription
          await tx.projectDescription.update({
            where: { id: descId },
            data: {
              title: data.desc!.title,
              summary: data.desc!.summary,
              footer: data.desc!.footer,
            }
          });
          
          // Handle objectives - delete existing and create new
          await tx.objective.deleteMany({
            where: { descriptionId: descId }
          });
          
          // Create new objectives
          //@ts-ignore
          for (const obj of data.desc.objectives) {
            await tx.objective.create({
              data: {
                text: obj.text,
                descriptionId: descId
              }
            });
          }
        } else {
          // Create a new ProjectDescription
          const projectDesc = await tx.projectDescription.create({
            data: {
              //@ts-ignore
              title: data.desc.title,
              //@ts-ignore
              summary: data.desc.summary,
              //@ts-ignore
              footer: data.desc.footer,
              objectives: {
                //@ts-ignore
                create: data.desc.objectives.map(obj => ({
                  text: obj.text
                }))
              }
            }
          });
          
          descId = projectDesc.id;
        }
        
        // Update the project
        const project = await tx.project.update({
          where: { id },
          data: {
            ...projectData,
            descId
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
    } else {
      // Simple update without touching description
      updatedProject = await prisma.project.update({
        where: { id },
        data: projectData
      });
    }
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error(`Error updating project with id ${params.id}:`, error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// Delete a project
export async function DELETE(
  request: NextRequest, 
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    // Get project to check if it has a description
    const project = await prisma.project.findUnique({
      where: { id },
      select: { descId: true }
    });
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    await prisma.$transaction(async (tx) => {
      // Delete the project first
      await tx.project.delete({
        where: { id }
      });
      
      // If there's a description, delete it and its objectives
      if (project.descId) {
        await tx.objective.deleteMany({
          where: { descriptionId: project.descId }
        });
        
        await tx.projectDescription.delete({
          where: { id: project.descId }
        });
      }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting project with id ${params.id}:`, error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}