"use client"

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaEye, FaLinkSlash } from "react-icons/fa6"


interface TruncatedVendor {
    id: string
    vendorName: string
    projectId: string
}

export default function VendorComponent({
    id,
    vendorName,
    projectId
}: TruncatedVendor) {
    const router = useRouter()

    async function unlink() {
        try {
            await axios.delete(`/api/v1/projects/${projectId}/vendors/${id}`);
            toast.success("Vendor unlinked");
            router.push(`/projects/${projectId}`);
            router.refresh();
        } catch (error) {
            if (error instanceof AxiosError)
                toast.error(`Failed unlink vendor - ${(error as AxiosError).response?.data}`);
            else
                toast.error('Unexpected error unlinking vendor');
        }
    }

    return (
        <section className="vendor-information" key={id}>
            <p key={id}>{vendorName}</p>
            <section className="vendor-buttons">
                <Link href={`/vendors/${id}`}>
                    <FaEye />
                </Link>
                <form action={unlink}>
                    <input type="hidden" name="projectId" value={projectId} />
                    <input type="hidden" name="vendorId" value={id} />
                    <button type="submit">
                        <FaLinkSlash />
                    </button>
                </form>
            </section>
          </section>
    )
}