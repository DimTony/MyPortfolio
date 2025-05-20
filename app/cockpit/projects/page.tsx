import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import prisma from "@/lib/prisma";
import DeleteProjectButton from "./DeleteProjectButton";
import { safeFormatDate } from "@/lib/utils";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Projects
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/cockpit/projects/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Project
        </Link>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {projects.length === 0 ? (
            <li className="px-4 py-4 sm:px-6">
              <p className="text-sm text-gray-500">No projects found.</p>
            </li>
          ) : (
            projects.map((project: any) => (
              <li
                key={project.id}
                className="px-4 py-4 sm:px-6 flex items-center justify-between"
              >
                <div className="flex items-center">
                  {project.imageUrl && (
                    <div className="flex-shrink-0 h-12 w-12 mr-3">
                      <img
                        className="h-12 w-12 rounded-md object-cover"
                        src={project.imageUrl}
                        alt={project.title}
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-indigo-600 truncate">
                      {project.title}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <p className="truncate">
                        {project.description.length > 100
                          ? project.description.substring(0, 100) + "..."
                          : project.description}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <p>
                        Updated{" "}
                        {/* {formatDistanceToNow(new Date(project.updatedAt), {
                          addSuffix: true,
                        })} */}
                        {safeFormatDate(project.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/cockpit/projects/${project.id}/edit`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton id={project.id} />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}