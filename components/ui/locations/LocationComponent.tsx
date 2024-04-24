"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaEye, FaLinkSlash } from "react-icons/fa6"
import { unlinkLocation } from "~/lib/actions"

interface TruncatedLocation {
    id: string
    locationName: string
    projectId: string
}

export default function LocationComponent({
    id,
    locationName,
    projectId
}: TruncatedLocation) {

    const router = useRouter()

    async function unlink(formData: FormData) {
        try {
            await unlinkLocation(formData)

            toast.success("Location unlinked")
            router.refresh()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="location-information" key={id}>
            <p key={id}>{locationName}</p>
            <section className="location-buttons">
                <Link href={`/locations/${id}`}>
                    <FaEye />
                </Link>
                <form action={unlink}>
                    <input type="hidden" name="projectId" value={projectId} />
                    <input type="hidden" name="locationId" value={id} />
                    <button type="submit">
                        <FaLinkSlash />
                    </button>
                </form>
            </section>
        </section>
    )
}