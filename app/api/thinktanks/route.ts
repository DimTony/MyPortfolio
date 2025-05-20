import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        //@ts-ignore
        const projects = await prisma.thinkTank.findMany({
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
        const formattedProjects = projects.map((project: any) => ({
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