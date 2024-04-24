"use client"

import { Festival } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FaLink, FaRegTrashCan } from "react-icons/fa6";
import { deleteFestival } from "~/lib/actions";
import { dateFromISO8601 } from "~/lib/utils";

export function FestivalComponent({
    fflink,
    email,
    strategy,
    status,
    earlyDeadline,
    deadline,
    submitted,
    id
  }: Festival) {

    const router = useRouter()

    async function handleDelete(formData: FormData) {
      try {
        await deleteFestival(formData)

        toast.success("Festival deleted successfully")
        router.refresh()
      } catch (error) {
        toast.error("Failed to delete festival")
      }
    }

    return (
      <section className="festival-component">
        <section className="festival-actions">
          <FaEdit className="festival-link" />
          <Link href={fflink || ""}>
            <FaLink className="festival-link" />
          </Link>
          <form action={handleDelete}>
            <input type="hidden" name="festivalId" value={id} />
            <button type="submit">
              <FaRegTrashCan />
            </button>
          </form>
        </section>
        <p className="festival-email">
          <strong>Contact Email: </strong>
          <a href={`mailto:${email}`}>{email || "N/A"}</a>
        </p>
        <p className="festival-strategy">
          <strong>Strategy: </strong>
          {strategy || "N/A"}
        </p>
        <p className="festival-status">
          <strong>Status: </strong>
          {status || "N/A"}
        </p>
        <p className="festival-early-deadline">
          <strong>Early Deadline: </strong>
          {earlyDeadline ? dateFromISO8601(earlyDeadline.toISOString()) : "N/A"}
        </p>
        <p className="festival-deadline">
          <strong>Deadline: </strong>
          {deadline ? dateFromISO8601(deadline.toISOString()) : "N/A"}
        </p>
        <p className="festival-submitted">
          <strong>Submitted: </strong>
          {submitted ? dateFromISO8601(submitted.toISOString()) : "N/A"}
        </p>
      </section>
    )
  }