
import { fetchProjectsData } from "./_actions/projects";
import ProjectsClient from "../components/client-side/ProjectsClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const initialData = await fetchProjectsData();

  return <ProjectsClient initialData={initialData} />;
}
