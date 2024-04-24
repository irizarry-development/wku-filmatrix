"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa6";
import { deleteCrew } from "~/lib/actions";
import { CrewResponse } from "~/lib/types";

export default function CrewComponent({ user, role, projectId }: CrewResponse) {

    const router = useRouter()

    async function handleDelete(formData: FormData) {
        try {
            await deleteCrew(formData)

            toast.success("Crew member deleted successfully")
            router.refresh()
        } catch (error) {
            toast.error("Failed to delete crew member")
        }
    }

    return (
      <section className="crew-component">
        <strong>{role}</strong>
        <p>{user.name}</p>
        <section className="crew-actions">
          <Link href={`/people/${user.id}`}>
              <FaEye className="view-crew" />
          </Link>
          <form action={handleDelete}>
            <input type="hidden" name="projectId" value={projectId} />
            <input type="hidden" name="userId" value={user.id} />
            <button type="submit">
              <FaTrash />
            </button>
          </form>
        </section>
      </section>
    )
  }