import { Prisma } from "@prisma/client"
import DatabasePage from "~/components/ui/database/DatabasePage"
import TableRow from "~/components/ui/table/TableRow"
import prisma from "~/lib/prisma"
import { SearchParams } from "~/lib/types"

export default async function ProjectPage({
  searchParams: { search, pageNumber }
}: SearchParams) {
  let parsedPage = parseInt(pageNumber || "")
  if (Number.isNaN(parsedPage)) parsedPage = 1
  const perPage = 10
  let projectData = null
  let totalProjects = 0

  if (!search) {
    projectData = await prisma.project.findMany({
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
    totalProjects = await prisma.project.count()
  } else {
    const searchFilter: Prisma.ProjectWhereInput = {
      OR: [
        { projectName: { contains: search, mode: "insensitive" } },
        {
          projectDescription: {
            contains: search,
            mode: "insensitive"
          }
        },
        { projectRuntime: { contains: search, mode: "insensitive" } },
        {
          projectAspectRatio: {
            contains: search,
            mode: "insensitive"
          }
        },
        { projectRating: { contains: search, mode: "insensitive" } },
        { projectCategory: { contains: search, mode: "insensitive" } },
        { projectGenre: { contains: search, mode: "insensitive" } },
        { projectLanguage: { contains: search, mode: "insensitive" } },
        {
          projectShootingFormat: {
            contains: search,
            mode: "insensitive"
          }
        },
        { projectFilmSound: { contains: search, mode: "insensitive" } },
        { projectTagline: { contains: search, mode: "insensitive" } },
        { projectLogLine: { contains: search, mode: "insensitive" } },
        {
          project25WordPitch: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          project50WordPitch: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          project75WordPitch: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    }
    projectData = await prisma.project.findMany({
      where: searchFilter,
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
    totalProjects = await prisma.project.count({ where: searchFilter })
  }

  const remaining = totalProjects - parsedPage * perPage

  return (
    <DatabasePage
      databaseHeader="Projects"
      databaseId="projects"
      databaseFormId="project-search-form"
      searchValue={search || ""}
      parsedPage={parsedPage}
      remaining={remaining}
      databaseTableHeaders={["Name", "Description", "Category", "Genre", ""]}
    >
      {projectData.length > 0 &&
        projectData.map((project, i) => (
          <TableRow
            key={i}
            type="Projects"
            singular="Project"
            id={project.id}
            name={project.projectName}
            fields={[
              project.projectName,
              project.projectDescription,
              project.projectCategory,
              project.projectGenre
            ]}
            deleteUrl="/api/v1/projects"
            renderActions
          />
        ))}
    </DatabasePage>
  )
}
