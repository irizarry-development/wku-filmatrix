"use client"

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaEye, FaLinkSlash } from "react-icons/fa6"

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

    async function unlink() {
        try {
            await axios.delete(`/api/v1/projects/${projectId}/locations/${id}`);
            toast.success("Location unlinked");
            router.push(`/projects/${projectId}`);
            router.refresh();
        } catch (error) {
            if (error instanceof AxiosError)
                toast.error(`Failed unlink location - ${(error as AxiosError).response?.data}`);
            else
                toast.error('Unexpected error unlinking location');
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