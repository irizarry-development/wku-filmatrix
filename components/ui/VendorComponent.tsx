"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaEye, FaLinkSlash } from "react-icons/fa6"
import { unlinkVendor } from "~/lib/actions"

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

    async function unlink(formData: FormData) {
        try {
            await unlinkVendor(formData)

            toast.success("Vendor unlinked")
            router.refresh()
        } catch (error) {
            console.error(error)
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