import { Prisma, Project } from "@prisma/client"
import DatabasePage from "~/components/ui/database/DatabasePage"
import TableRow from "~/components/ui/table/TableRow"
import { paginatedQuery } from "~/lib/actions"
import { SearchParams } from "~/lib/types"
import prisma from "~/lib/prisma"

export default async function ProjectPage({
  searchParams
}: SearchParams) {

  const projectSearchFilter: Prisma.ProjectWhereInput = {
    OR: [
      { projectName: { contains: searchParams.search, mode: "insensitive" } },
      { projectDescription: { contains: searchParams.search, mode: "insensitive" } },
      { projectCategory: { contains: searchParams.search, mode: "insensitive" } },
      { projectGenre: { contains: searchParams.search, mode: "insensitive" } }
    ]
  }

  const { data, remaining, parsedPage } = await paginatedQuery<Project>(
    { searchParams },
    10,
    prisma.project.findMany,
    prisma.project.count,
    projectSearchFilter
  )

  return (
    <DatabasePage
      databaseHeader="Projects"
      databaseId="projects"
      databaseFormId="project-search-form"
      searchValue={searchParams.search || ""}
      parsedPage={parsedPage}
      remaining={remaining}
      databaseTableHeaders={["Name", "Description", "Category", "Genre", ""]}
    >
      {data.length > 0 &&
        data.map((project, i) => (
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