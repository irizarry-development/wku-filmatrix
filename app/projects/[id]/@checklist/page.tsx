import prisma from "~/lib/prisma"
import { FaRegCircleCheck } from "react-icons/fa6"
import React from "react"
import Drawer from "~/components/ui/global/Drawer"
import { ProjectTodo } from "@prisma/client"
import ProjectTodoComponent from "~/components/ui/projects/ProjectTodoComponent"
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer"


interface ProjectChecklistPageProps {
  params: {
    id: string
  }
}

interface ProjectTodoCategory {
  [key: string]: ProjectTodo[]
}

export default async function ProjectChecklistPage({
  params
}: ProjectChecklistPageProps) {

  const todos = await prisma.projectTodo.findMany({
    where: { projectId: params.id }
  })

  const _renderCategories = (todos: ProjectTodo[]) => {
    let temp: ProjectTodoCategory = {}

    todos.forEach((todo) => {
      temp[todo.category]
        ? temp[todo.category].push(todo)
        : (temp[todo.category] = [todo])
    })

    return Object.keys(temp).map((key) => (
      <Drawer title={key} key={key}>
        {temp[key].map((todo, i) => (
          <ProjectTodoComponent {...todo} key={i} />
        ))}
      </Drawer>
    ))
  }

  return (
    <DashboardContainer
      headerText="Project Checklist"
      headerIcon={<FaRegCircleCheck />}
      additionalClasses="project-checklist-container"
    >
      <section className="project-checklist">
        {_renderCategories(todos)}
      </section>
    </DashboardContainer>
  )
}
