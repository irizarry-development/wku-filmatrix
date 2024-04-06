import Link from 'next/link';
import { FaArrowLeftLong, FaArrowRightLong, FaArrowRotateLeft, FaCirclePlus, FaMagnifyingGlass } from 'react-icons/fa6';
import TextInput from '~/components/ui/form/Input';
import Table from '~/components/ui/table/Table';
import TableRow from '~/components/ui/table/TableRow';
import prisma from '~/lib/prisma';

interface ProjectPageProps {
  searchParams: {
    search: string
    pageNumber: string
  }
}

export default async function ProjectPage(
  {
    searchParams: {
      search,
      pageNumber
    }
  }: ProjectPageProps
) {

  let parsedPage = 1;
  let perPage = 10;

  if (pageNumber) {
    parsedPage = parseInt(pageNumber);
  }

  let projectData = null;

  if (!search) {
    projectData = await prisma.project.findMany({
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
  } else {
    projectData = await prisma.project.findMany({
      where: {
        OR: [
          { projectName: { contains: search, mode: 'insensitive' } },
          { projectDescription: { contains: search, mode: 'insensitive' } },
          { projectRuntime: { contains: search, mode: 'insensitive' } },
          { projectAspectRatio: { contains: search, mode: 'insensitive' } },
          { projectRating: { contains: search, mode: 'insensitive' } },
          { projectCategory: { contains: search, mode: 'insensitive' } },
          { projectGenre: { contains: search, mode: 'insensitive' } },
          { projectLanguage: { contains: search, mode: 'insensitive' } },
          { projectShootingFormat: { contains: search, mode: 'insensitive' } },
          { projectFilmSound: { contains: search, mode: 'insensitive' } },
          { projectTagline: { contains: search, mode: 'insensitive' } },
          { projectLogLine: { contains: search, mode: 'insensitive' } },
          { project25WordPitch: { contains: search, mode: 'insensitive' } },
          { project50WordPitch: { contains: search, mode: 'insensitive' } },
          { project75WordPitch: { contains: search, mode: 'insensitive' } },
        ],
      },
      take: perPage,
      skip: (parsedPage - 1) * perPage
    });
  }

  return (
    <section className="database-page">
      <section className="database-page-header">
        <h1>Projects</h1>
        <Link href="/projects/add" className="database-page-add">
            <FaCirclePlus />
        </Link>
        <form id="project-search-form" className="database-search-form" action={`/projects/dashboard`} method="GET">
          <TextInput
            id='search'
            type="search"
            placeholder='Search projects...'
            initialValue={search}
          />
          <section className="database-search-buttons">
            <button type="submit">
              <FaMagnifyingGlass />
            </button>
            <Link href="/projects/dashboard" className="clear-search">
              <FaArrowRotateLeft />
            </Link>
            <Link
              href={`/projects/dashboard?${search ? `search=${search}` : ""}&pageNumber=${parsedPage - 1}`}
              className="pagination-button"
            >
              <FaArrowLeftLong />
            </Link>
            <Link
              href={`/projects/dashboard?${search ? `search=${search}` : ""}&pageNumber=${parsedPage + 1}`}
              className="pagination-button"
            >
              <FaArrowRightLong />
            </Link>
          </section>
        </form>
      </section>
      <section className="database-content">
        <Table title="Projects" headers={
          ['Name', 'Description', 'Runtime', 'Aspect Ratio', 'Rating', 'Category', 'Genre', 'Language', 'Shooting Format', 'Sound', 'Subtitled', 'Tagline', 'Log Line', '25 Word Pitch', '50 Word Pitch', '75 Word Pitch', '']
        }>
          {projectData.length > 0 &&
            projectData.map((project, i) => (
              <TableRow
                key={i}
                type="Projects"
                id={project.id}
                name={project.projectName}
                fields={[
                  project.projectName,
                  project.projectDescription,
                  project.projectRuntime,
                  project.projectAspectRatio,
                  project.projectRating,
                  project.projectCategory,
                  project.projectGenre,
                  project.projectLanguage,
                  project.projectShootingFormat,
                  project.projectFilmSound,
                  project.projectFilmSubtitled ? 'Yes' : 'No',
                  project.projectTagline,
                  project.projectLogLine,
                  project.project25WordPitch,
                  project.project50WordPitch,
                  project.project75WordPitch,
                ]}
                deleteUrl="/api/v1/project" 
              />
            ))}
        </Table>
      </section>
    </section>
  );
};