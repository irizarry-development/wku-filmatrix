"use client"

import { ProjectTodo } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ProjectTodoComponent({
  id,
  name,
  complete,
  approvedDT,
  approverName
}: ProjectTodo) {
  const router = useRouter();

  const handleApproval = async (id: string, name: string) => {
    try {
      await axios.post(`/api/v1/todos/${id}/approve`)
      toast.success(`${name} approved`)
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(`Failed to approve ${name} - ${(error as AxiosError).response?.data}`)
      else
        toast.error('Unexpected error approving project todo');
    }
    router.refresh()
  }

  return (
    <section className="project-todo" title={complete ? `Approved by ${approverName} on ${new Date(approvedDT || "").toLocaleString()}` : "Available to mark as completed"}>
      <p className="todo-name">{name}</p>

      {complete ? (
        <button className="btn sm outline" disabled={true}>
          Approved
        </button>
      ) : (
        <button
          className="btn sm primary"
          onClick={() => handleApproval(id, name)}
        >
          Approve
        </button>
      )}
    </section>
  )
}
