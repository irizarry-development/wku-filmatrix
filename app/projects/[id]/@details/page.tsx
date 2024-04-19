import { notFound } from "next/navigation"
import Drawer from "~/components/ui/Drawer";
import prisma from "~/lib/prisma"

interface ProjectDetailsProps {
  params: {
    id: string
  }
}

export default async function ProjectDetails({
  params: { id }
}: ProjectDetailsProps) {
  const foundProject = await prisma.project.findUnique({
    where: {
      id
    },
    select: {
        projectName: true,
        projectDescription: true,
        projectRuntime: true,
        projectAspectRatio: true,
        projectRating: true,
        projectRatingCriteria: true,
        projectProductionNumber: true,
        projectCategory: true,
        projectGenre: true,
        projectLanguage: true,
        projectShootingFormat: true,
        projectFilmSound: true,
        projectFilmSubtitled: true,
        projectTagline: true,
        projectLogLine: true,
        project25WordPitch: true,
        project50WordPitch: true,
        project75WordPitch: true, 
    }
  });

  if (!foundProject) {
    return notFound()
  }

  return (
    <section className="project-details">
        <h3>{foundProject.projectName}</h3>
        <Drawer
            title="Project Details"
        >
        <p>Description: {foundProject.projectDescription}</p>
        <p>Runtime: {foundProject.projectRuntime}</p>
        <p>Aspect Ratio: {foundProject.projectAspectRatio}</p>
        <p>Rating: {foundProject.projectRating}</p>
        <p>Rating Criteria: {foundProject.projectRatingCriteria}</p>
        <p>Production Number: {foundProject.projectProductionNumber}</p>
        <p>Category: {foundProject.projectCategory}</p>
        <p>Genre: {foundProject.projectGenre}</p>
        <p>Language: {foundProject.projectLanguage}</p>
        <p>Shooting Format: {foundProject.projectShootingFormat}</p>
        <p>Film Sound: {foundProject.projectFilmSound}</p>
        <p>Film Subtitled: {foundProject.projectFilmSubtitled}</p>
        <p>Tagline: {foundProject.projectTagline}</p>
        <p>Log Line: {foundProject.projectLogLine}</p>
        <p>25 Word Pitch: {foundProject.project25WordPitch}</p>
        <p>50 Word Pitch: {foundProject.project50WordPitch}</p>
        <p>75 Word Pitch: {foundProject.project75WordPitch}</p>
        </Drawer>
    </section>
  )
}
