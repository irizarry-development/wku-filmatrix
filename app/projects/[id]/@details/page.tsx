import { notFound } from "next/navigation"
import { BsCameraReelsFill } from "react-icons/bs"
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer"
import prisma from "~/lib/prisma"
import { FaEdit } from "react-icons/fa";

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
      project75WordPitch: true
    }
  })

  if (!foundProject)
    return notFound();

  return (
    <DashboardContainer
      headerText="Project Details"
      headerIcon={<BsCameraReelsFill />}
      additionalClasses="project-details-container"
      button={
        <FaEdit />
      }
    >
      <p>
        <strong>Description:</strong> {foundProject.projectDescription}
      </p>
      <p>
        <strong>Runtime:</strong> {foundProject.projectRuntime}
      </p>
      <p>
        <strong>Aspect Ratio:</strong> {foundProject.projectAspectRatio}
      </p>
      <p>
        <strong>Rating:</strong> {foundProject.projectRating}
      </p>
      <p>
        <strong>Rating Criteria:</strong> {foundProject.projectRatingCriteria}
      </p>
      <p>
        <strong>Category:</strong> {foundProject.projectCategory}
      </p>
      <p>
        <strong>Genre:</strong> {foundProject.projectGenre}
      </p>
      <p>
        <strong>Language:</strong> {foundProject.projectLanguage}
      </p>
      <p>
        <strong>Shooting Format:</strong> {foundProject.projectShootingFormat}
      </p>
      <p>
        <strong>Film Sound:</strong> {foundProject.projectFilmSound}
      </p>
      <p>
        <strong>Film Subtitled:</strong>{" "}
        {foundProject.projectFilmSubtitled ? "Yes" : "No"}
      </p>
      <p>
        <strong>Tagline:</strong> {foundProject.projectTagline}
      </p>
      <p>
        <strong>Log Line:</strong> {foundProject.projectLogLine}
      </p>
      <p>
        <strong>25 Word Pitch:</strong> {foundProject.project25WordPitch}
      </p>
      <p>
        <strong>50 Word Pitch:</strong> {foundProject.project50WordPitch}
      </p>
      <p>
        <strong>75 Word Pitch:</strong> {foundProject.project75WordPitch}
      </p>
    </DashboardContainer>
  )
}
