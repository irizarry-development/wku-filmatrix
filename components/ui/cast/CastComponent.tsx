"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaEye, FaTrash } from "react-icons/fa6"
import { deleteCast } from "~/lib/actions"
import { CastActor } from "~/lib/types"

export function CastComponent({ actor, projectId , role }: CastActor) {
    const router = useRouter()
    

  async function handleDelete(formData: FormData) {
    try {
      await deleteCast(formData)

      toast.success("Cast member deleted successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to delete cast member")
    }
  }
  return (
    <section className="cast-component">
      <strong>{role}</strong>
      <p>{actor.name}</p>
      <section className="cast-actions">
        <Link href={`/actors/${actor.id}`}>
          <FaEye className="view-cast" />
        </Link>
        <form action={handleDelete}>
          <input type="hidden" name="projectId" value={projectId} />
          <input type="hidden" name="actorId" value={actor.id} />
          <button type="submit">
            <FaTrash />
          </button>
        </form>
      </section>
    </section>
  )
}
