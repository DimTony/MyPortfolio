"use server";

import prisma from "@/lib/prisma";

export async function fetchProjectsData() {
    try {
        // Directly fetch from the database using Prisma
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

        // Optional: Revalidate the projects page if caching is enabled
        // revalidatePath('/projects');

        return projects;
    } catch (error) {
        console.error("Error fetching projects data:", error);
        throw error;
    }
}