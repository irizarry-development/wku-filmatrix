import Link from 'next/link';
import { FaCirclePlus } from 'react-icons/fa6';
import Table from '~/components/ui/table/Table';
import TableRow from '~/components/ui/table/TableRow';
import prisma from '~/lib/prisma'

const headers = ['Name', 'Description', 'Runtime', 'Aspect Ratio', 'Rating', 'Category', 'Genre', 'Language', 'Shooting Format', 'Sound', 'Subtitled', 'Tagline', 'Log Line', '25 Word Pitch', '50 Word Pitch', '75 Word Pitch', '']

export default async function ProjectPage() {

    const projectData = await prisma.project.findMany()

    return (
        <section className="database-page">
            <section className="database-page-header">
                <h1>Projects</h1>
                <Link href="/projects/add" className="database-page-add">
                    <FaCirclePlus />
                </Link>
            </section>
            <section className="database-content">
                <Table title="Projects" headers={headers}>
                    {
                        projectData.map((project, i) => (
                            <TableRow
                                key={i}
                                type='Projects'
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
                                    project.project75WordPitch
                                ]}
                                deleteUrl='/api/v1/project'
                            />
                        ))
                    }
                </Table>
            </section>
        </section>
    );
}

interface DatabasePageProps<T> {
    title: string
    id: string
    data: T
    headers: string[]
}

export function DatabasePage<T>({
    title,
    id,
    data
}: DatabasePageProps<T>) {
    return (
        <section className="database-page">
            <section className="database-page-header">
                <h1>{title}</h1>
                <Link href={`/${id}/add`} className="database-page-add">
                    <FaCirclePlus />
                </Link>
            </section>
            <section className="database-content">

            </section>
        </section>
    )
}