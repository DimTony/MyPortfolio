"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ObjectiveType {
  id?: number;
  text: string;
  descriptionId?: number;
}

interface ProjectDescriptionType {
  id?: number;
  title: string;
  summary: string;
  footer: string;
  objectives: ObjectiveType[];
}

interface ProjectFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function ProjectForm({
  initialData,
  isEditing = false,
}: ProjectFormProps) {
  const router = useRouter();
  
  // Parse technologies if it's a string
  const parsedTechnologies = initialData?.technologies 
    ? (typeof initialData.technologies === 'string' 
        ? JSON.parse(initialData.technologies) 
        : initialData.technologies)
    : [];
    
  // Set up initial form data structure
  const [formData, setFormData] = useState<any>({
    id: initialData?.id || undefined,
    title: initialData?.title || "",
    description: initialData?.description || "",
    technologies: parsedTechnologies,
    role: initialData?.role || "",
    thumbnail: initialData?.thumbnail || "",
    dash: initialData?.dash || "",
    releaseStatus: initialData?.releaseStatus || "",
    maintainStatus: initialData?.maintainStatus || "",
    date: initialData?.date || "",
    githubUrl: initialData?.githubUrl || "",
    demoUrl: initialData?.demoUrl || "",
    desc: {
      id: initialData?.desc?.id || undefined,
      title: initialData?.desc?.title || "",
      summary: initialData?.desc?.summary || "",
      footer: initialData?.desc?.footer || "",
      objectives: initialData?.desc?.objectives?.map((obj: any) => ({
        id: obj.id,
        text: obj.text
      })) || []
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [objectiveInput, setObjectiveInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }
    if (!formData.releaseStatus.trim()) {
      newErrors.releaseStatus = "Release status is required";
    }
    if (!formData.maintainStatus.trim()) {
      newErrors.maintainStatus = "Maintenance status is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle nested desc object properties
    if (name.startsWith("desc.")) {
      const descField = name.split(".")[1];
      setFormData((prev: any) => ({
        ...prev,
        desc: {
          ...prev.desc,
          [descField]: value
        }
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTechAdd = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev: any) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const handleTechRemove = (tech: string) => {
    setFormData((prev: any) => ({
      ...prev,
      technologies: prev.technologies.filter((t: string) => t !== tech),
    }));
  };

  const handleObjectiveAdd = () => {
    if (objectiveInput.trim()) {
      const newObjective = {
        text: objectiveInput.trim()
      };
      
      setFormData((prev: any) => ({
        ...prev,
        desc: {
          ...prev.desc,
          objectives: [...prev.desc.objectives, newObjective]
        }
      }));
      setObjectiveInput("");
    }
  };

  const handleObjectiveRemove = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      desc: {
        ...prev.desc,
        objectives: prev.desc.objectives.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      console.log('lll', formData)
      // Prepare data for submission - convert technologies to JSON string
      const submissionData = {
        ...formData,
        technologies: JSON.stringify(formData.technologies),
        // Don't send desc directly since it's a separate table
        descId: formData.desc.id,
        desc: {
          ...formData.desc,
          // Remove any temporary ids from new objectives
          objectives: formData.desc.objectives.map((obj: any) => ({
            text: obj.text,
            id: obj.id, // Include id if it exists (for editing)
          }))
        }
      };

      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `/api/projects/${initialData!.id}`
        : "/api/projects";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Failed to save the project");
      }

      router.push("/cockpit/projects");
      router.refresh();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save the project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className={`i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className={`i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          className={`i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.role ? "border-red-500" : ""
          }`}
        />
        {errors.role && (
          <p className="mt-1 text-sm text-red-500">{errors.role}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="thumbnail"
          className="block text-sm font-medium text-gray-700"
        >
          Thumbnail URL
        </label>
        <input
          type="text"
          name="thumbnail"
          id="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className="i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="dash"
          className="block text-sm font-medium text-gray-700"
        >
          Dashboard Image URL
        </label>
        <input
          type="text"
          name="dash"
          id="dash"
          value={formData.dash}
          onChange={handleChange}
          className="i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="githubUrl"
          className="block text-sm font-medium text-gray-700"
        >
          GitHub URL
        </label>
        <input
          type="text"
          name="githubUrl"
          id="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          className="i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="demoUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Demo URL
        </label>
        <input
          type="text"
          name="demoUrl"
          id="demoUrl"
          value={formData.demoUrl}
          onChange={handleChange}
          className="i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="releaseStatus"
          className="block text-sm font-medium text-gray-700"
        >
          Release Status <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="releaseStatus"
          id="releaseStatus"
          value={formData.releaseStatus}
          onChange={handleChange}
          className={`i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.releaseStatus ? "border-red-500" : ""
          }`}
          placeholder="e.g., Beta-released, Production, In-development"
        />
        {errors.releaseStatus && (
          <p className="mt-1 text-sm text-red-500">{errors.releaseStatus}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="maintainStatus"
          className="block text-sm font-medium text-gray-700"
        >
          Maintenance Status <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="maintainStatus"
          id="maintainStatus"
          value={formData.maintainStatus}
          onChange={handleChange}
          className={`i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.maintainStatus ? "border-red-500" : ""
          }`}
          placeholder="e.g., Under-development, Maintained, Archived"
        />
        {errors.maintainStatus && (
          <p className="mt-1 text-sm text-red-500">{errors.maintainStatus}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          type="text"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          className="i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., Oct 2023"
        />
      </div>

      <div>
        <label
          htmlFor="techInput"
          className="block text-sm font-medium text-gray-700"
        >
          Technologies
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="techInput"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="i-f-color block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Add a technology"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleTechAdd();
              }
            }}
          />
          <button
            type="button"
            onClick={handleTechAdd}
            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.technologies.map((tech: string) => (
            <span
              key={tech}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleTechRemove(tech)}
                className="ml-1.5 inline-flex text-indigo-400 hover:text-indigo-600"
              >
                <span className="sr-only">Remove</span>
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Desc Object Fields */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Description Details</h3>
        
        <div className="mb-4">
          <label
            htmlFor="desc.title"
            className="block text-sm font-medium text-gray-700"
          >
            Description Title
          </label>
          <input
            type="text"
            name="desc.title"
            id="desc.title"
            value={formData.desc.title}
            onChange={handleChange}
            className="i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="desc.summary"
            className="block text-sm font-medium text-gray-700"
          >
            Project Summary
          </label>
          <textarea
            name="desc.summary"
            id="desc.summary"
            rows={4}
            value={formData.desc.summary}
            onChange={handleChange}
            className="i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="objectiveInput"
            className="block text-sm font-medium text-gray-700"
          >
            Objectives
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="objectiveInput"
              value={objectiveInput}
              onChange={(e) => setObjectiveInput(e.target.value)}
              className="i-f-color block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Add an objective"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleObjectiveAdd();
                }
              }}
            />
            <button
              type="button"
              onClick={handleObjectiveAdd}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
            >
              Add
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {formData.desc.objectives.map((objective: any, index: number) => (
              <div key={index} className="flex items-start">
                <span className="inline-block p-1">&bull;</span>
                <div className="i-f-color flex-grow p-1 bg-gray-50 rounded-md">
                  {objective.text}
                  <button
                    type="button"
                    onClick={() => handleObjectiveRemove(index)}
                    className="ml-2 text-red-400 hover:text-red-600"
                  >
                    <span className="sr-only">Remove</span>
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="desc.footer"
            className="block text-sm font-medium text-gray-700"
          >
            Footer Text
          </label>
          <textarea
            name="desc.footer"
            id="desc.footer"
            rows={3}
            value={formData.desc.footer}
            onChange={handleChange}
            className="i-f-color mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
            ? "Update Project"
            : "Create Project"}
        </button>
      </div>
    </form>
  );
}