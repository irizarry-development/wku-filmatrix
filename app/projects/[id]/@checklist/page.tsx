import prisma from "~/lib/prisma"
import Link from "next/link"
import { FaArrowLeftLong, FaRegCircleCheck } from "react-icons/fa6"
import { notFound } from "next/navigation"
import React, { Fragment } from "react"
import { formatFromISO8601 } from "~/lib/utils"
import Drawer from "~/components/ui/Drawer"
import { ProjectTodo } from "@prisma/client"
import ProjectTodoComponent from "~/components/projects/ProjectTodoComponent"
import DashboardContainer from "~/components/ui/DashboardContainer"

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
