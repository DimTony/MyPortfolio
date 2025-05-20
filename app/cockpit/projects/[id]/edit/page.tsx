import { notFound } from "next/navigation";
import ProjectForm from "../../ProjectForm";
import prisma from "@/lib/prisma";

interface EditProjectPageParams {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({
  params,
}: EditProjectPageParams) {
  // Convert id to number since params come as strings from the URL
  const projectId = parseInt(params.id, 10);
  
  if (isNaN(projectId)) {
    notFound();
  }

  // Fetch the project with its related ProjectDescription and Objectives
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      desc: {
        include: {
          objectives: true // Include all objectives related to this description
        }
      }
    }
  });

  if (!project) {
    notFound();
  }

  // Format the data to match what the form expects
  const formattedProject = {
    ...project,
    // This property is stored as a JSON string in the database
    technologies: typeof project.technologies === 'string' 
      ? JSON.parse(project.technologies) 
      : (Array.isArray(project.technologies) ? project.technologies : []),
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Edit Project
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Update project details
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <ProjectForm initialData={formattedProject} isEditing />
      </div>
    </div>
  );
}