"use client"

import { ProjectTodo } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { formatFromISO8601 } from "~/lib/utils"

export default function ProjectTodoComponent({
  id,
  name,
  complete,
  approverId,
  approvedDT,
  approverName
}: ProjectTodo) {
  const router = useRouter()

  const handleApproval = async (id: string, name: string) => {
    try {
      await axios.post(`/api/v1/todos/${id}/approve`)
      toast.success(`${name} approved`)
    } catch (error) {
      toast.error(
        `Failed to approve ${name} - ${(error as AxiosError).response?.data}`
      )
    }
    router.refresh()
  }

  return (
    <section className={`project-todo ${complete && "approved"}`}>
      <p className="todo-name">{name}</p>

      {approverId && (
        <p className="todo-approver">
          Approved by <strong>{approverName}</strong> on{" "}
          <em>{new Date(approvedDT || "").toLocaleString()}</em>
        </p>
      )}
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
