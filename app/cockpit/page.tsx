// 'use client';

// import { useEffect, useState } from 'react';

// export default function AdminPage() {
//   const [projects, setProjects] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     imageUrl: '',
//     repoUrl: '',
//     demoUrl: '',
//   });

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   async function fetchProjects() {
//     const res = await fetch('/api/projects');
//     const data = await res.json();
//     setProjects(data);
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     const res = await fetch('/api/projects', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });
//     if (res.ok) {
//       setFormData({ title: '', description: '', imageUrl: '', repoUrl: '', demoUrl: '' });
//       fetchProjects();
//     }
//   }

//   async function deleteProject(id: number) {
//     const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
//     if (res.ok) fetchProjects();
//   }

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Admin Panel</h1>

//       <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
//         <div>
//           <label>Title:</label><br />
//           <input
//             type="text"
//             value={formData.title}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
//           />
//         </div>
//         <div>
//           <label>Description:</label><br />
//           <textarea
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
//           ></textarea>
//         </div>
//         <div>
//           <label>Image URL:</label><br />
//           <input
//             type="text"
//             value={formData.imageUrl}
//             onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
//           />
//         </div>
//         <div>
//           <label>Repo URL:</label><br />
//           <input
//             type="text"
//             value={formData.repoUrl}
//             onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
//           />
//         </div>
//         <div>
//           <label>Demo URL:</label><br />
//           <input
//             type="text"
//             value={formData.demoUrl}
//             onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
//           />
//         </div>
//         <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#0070f3', color: 'white', border: 'none' }}>
//           Add Project
//         </button>
//       </form>

//       <div>
//         <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Projects</h2>
//         {projects && projects.map((project: any) => (
//           <div key={project.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
//             <h3>{project.title}</h3>
//             <p>{project.description}</p>
//             <p><a href={project.repoUrl}>Repo</a> | <a href={project.demoUrl}>Demo</a></p>
//             <button onClick={() => deleteProject(project.id)} style={{ padding: '0.25rem 0.5rem', backgroundColor: 'red', color: 'white', border: 'none' }}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Dashboard() {
  const projectsCount = await prisma.project.count();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Dashboard
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage your portfolio content
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Total Projects
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {projectsCount}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Actions</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Link
                href="/cockpit/projects"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Manage Projects
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}