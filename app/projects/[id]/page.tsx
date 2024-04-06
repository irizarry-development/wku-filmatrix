import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import prisma from "~/lib/prisma";
import { notFound } from "next/navigation";
import ProjectTabs from "~/components/projects/ProjectTabs";

interface ProjectProfilePageProps {
    params: {
        id: string;
    }
}

export default async function ProjectProfilePage({
    params
}: ProjectProfilePageProps) {

    const foundProject = await prisma.project.findUnique({
        where: {
            id: params.id
        }
    })

    if (!foundProject) {
        return notFound()
    }

    return (
        <section className="view-resource-page">
            <section className="resource-page-header">
                <Link href="/projects/dashboard" className="back-link">
                    <FaArrowLeftLong />
                </Link>
                <h1>{foundProject.projectName}</h1>
            </section>
            <section className="resource-page-content">
                <ProjectTabs 
                    projectData={foundProject}
                />
            </section>
        </section>
    );
}