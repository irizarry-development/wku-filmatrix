'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCirclePlus } from 'react-icons/fa6';
import Table from '~/components/ui/table/Table';
import TableRow from '~/components/ui/table/TableRow';

const headers = ['Name', 'Description', 'Runtime', 'Aspect Ratio', 'Rating', 'Category', 'Genre', 'Language', 'Shooting Format', 'Sound', 'Subtitled', 'Tagline', 'Log Line', '25 Word Pitch', '50 Word Pitch', '75 Word Pitch', ''];

interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  projectRuntime: string;
  projectAspectRatio: string;
  projectRating: string;
  projectCategory: string;
  projectGenre: string;
  projectLanguage: string;
  projectShootingFormat: string;
  projectFilmSound: string;
  projectFilmSubtitled: boolean;
  projectTagline: string;
  projectLogLine: string;
  project25WordPitch: string;
  project50WordPitch: string;
  project75WordPitch: string;
}

const ProjectPage = () => {
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/v1/projects/search'); 
      if (!response.ok) {
        console.error('Failed to fetch:', response.statusText);
        return;
      }
      const data = await response.json();
      setProjectData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchSearchResults = async () => {
      const response = await fetch(`/api/v1/projects/search?query=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        console.error('Failed to fetch:', response.statusText);
        return;
      }
      const data = await response.json();
      setProjectData(data);
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="database-page">
      <section className="database-page-header">
        <h1>Projects</h1>
        <Link href="/projects/add" className="database-page-add">
            <FaCirclePlus />
        </Link>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </section>
      <section className="database-content">
        <Table title="Projects" headers={headers}>
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

export default ProjectPage;
