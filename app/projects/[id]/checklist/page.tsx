import prisma from '~/lib/prisma';
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { notFound } from "next/navigation";
import React from 'react';
import ProjectTodo from '~/components/projects/ProjectTodo';
import { formatFromISO8601 } from '~/lib/utils';

interface ProjectChecklistPageProps {
  params: {
    id: string;
  }
}

type ProjectTodoCategory = {
  name: string,
  todos:  {id: string, name: string, complete: boolean, approver: string|null, apdt: string|null}[]
}

export default async function ProjectChecklistPage({
  params
}: ProjectChecklistPageProps) {

  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    }
  });
  if (!project) return notFound();

  const todos = await prisma.projectTodo.findMany({
    where: { projectId: params.id }
  });

  const categorized = await (async () => {
    let temp: ProjectTodoCategory[] = [];
    for (const todo in todos) {
      const category = temp.find(t => t.name === todos[todo].category);
      const aid = todos[todo].approverId;
      let aprv: string|null = null;
      if (aid) {
        const approver = await prisma.user.findUnique({
          where: {
            id: todos[todo].approverId!,
          }
        });
        aprv = approver ? approver.name : null;
      }
      const apdt: string|null = todos[todo].approvedDT ? formatFromISO8601(todos[todo].approvedDT!.toISOString()) : null

      if (!category)
        temp.push({name: todos[todo].category, todos: [{id: todos[todo].id, name: todos[todo].name, complete: todos[todo].complete, approver: aprv, apdt: apdt}]});
      else
        category.todos.push({id: todos[todo].id, name: todos[todo].name, complete: todos[todo].complete, approver: aprv, apdt: apdt});
    }
    for (const cat in temp) {
      temp[cat].todos.sort((a, b) => (a.complete === b.complete) ? 0 : a.complete ? 1 : -1)
    }
    return temp;
  })();

  return (
    <section className="view-resource-page project-checklist">
      <section className="resource-page-header">
        <Link href={`/projects/dashboard`} className="back-link">
          <FaArrowLeftLong />
        </Link>
        <h1>{project.projectName} Checklist</h1>
      </section>
      <section className="resource-page-content">
        {
          categorized.length > 0 && (
            <table>
              <tbody>
                {
                  categorized.map(category => {
                    return (
                      <React.Fragment key={category.name}>
                        <tr>
                          <td colSpan={3} className='checklist-category'>{category.name}</td>
                        </tr>
                        {
                          category.todos.map(todo => 
                            <ProjectTodo
                              key={`${category.name}-${todo.name}`}
                              id={todo.id}
                              category={category.name}
                              name={todo.name}
                              complete={todo.complete}
                              approver={todo.approver}
                              apdt={todo.apdt}
                            />
                          )
                        }
                      </React.Fragment>
                    )
                  })
                }
              </tbody>
            </table>
          )
        }
      </section>
    </section>
  )
}
