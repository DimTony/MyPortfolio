import ProjectForm from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Create New Project
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Add a new project to your portfolio
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <ProjectForm />
      </div>
    </div>
  );
}