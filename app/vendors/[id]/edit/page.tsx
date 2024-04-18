"use client"

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaArrowLeftLong } from "react-icons/fa6"
import Button from "~/components/ui/Button"
import Input from "~/components/ui/form/Input"

interface EditVendorPageProps {
  params: {
    id: string
  }
}

type VendorData = {
  vendorName: string
  vendorDescription: string
  vendorAddress: string
  vendorPhone: string
  vendorEmail: string
  vendorContactName: string
  vendorKeywords: string
}

export default function EditVendorPage({
  params: { id }
}: EditVendorPageProps) {
  const router = useRouter()

  const fetchVendorData = useCallback(async () => {
    try {
      const foundVendor = await axios.get(`/api/v1/vendors/${id}`)
      setVendorData(foundVendor.data.vendor)
    } catch (error) {
      toast.error(
        `Error retrieving vendor ${id} - ${(error as AxiosError).response?.data}`
      )
      router.push("/404")
    }
  }, [id, router])

  async function updateVendorData(formData: FormData) {
    const updatedVendorData = {
      vendorName: formData.get("vendorName"),
      vendorDescription: formData.get("vendorDescription"),
      vendorAddress: formData.get("vendorAddress"),
      vendorPhone: formData.get("vendorPhone"),
      vendorEmail: formData.get("vendorEmail"),
      vendorContactName: formData.get("vendorContactName"),
      vendorKeywords: formData.get("vendorKeywords")
    }

    try {
      await axios.patch(`/api/v1/vendors/${id}`, updatedVendorData)
      toast.success("Vendor updated")
      router.push(`/vendors/${id}`)
      router.refresh()
    } catch (error) {
      toast.error(
        `Failed to update vendor - ${(error as AxiosError).response?.data}`
      )
    }
  }

  const [vendorData, setVendorData] = useState<VendorData | null>(null)

  useEffect(() => {
    fetchVendorData()
  }, [fetchVendorData])

  return (
    <form
      className="form edit-resource-form"
      id="edit-vendor-form"
      action={updateVendorData}
    >
      <Link href="/vendors/dashboard" className="back-link">
        <FaArrowLeftLong />
      </Link>
      {vendorData !== null && (
        <>
          <fieldset>
            <legend>Edit Vendor</legend>
            <Input
              id="vendorName"
              label="Vendor Name"
              placeholder="Enter vendor name"
              initialValue={vendorData.vendorName}
            />
            <Input
              id="vendorDescription"
              label="Vendor Description"
              placeholder="Enter vendor description"
              type="multiline"
              initialValue={vendorData.vendorDescription}
            />
            <Input
              id="vendorAddress"
              label="Vendor Address"
              placeholder="Enter vendor address"
              initialValue={vendorData.vendorAddress}
            />
            <Input
              id="vendorPhone"
              label="Vendor Phone"
              placeholder="Enter vendor phone"
              initialValue={vendorData.vendorPhone}
            />
            <Input
              id="vendorEmail"
              label="Vendor Email"
              placeholder="Enter vendor email"
              initialValue={vendorData.vendorEmail}
            />
            <Input
              id="vendorContactName"
              label="Vendor Contact Name"
              placeholder="Enter vendor contact name"
              initialValue={vendorData.vendorContactName}
            />
            <Input
              id="vendorKeywords"
              label="Vendor Keywords"
              placeholder="Enter vendor keywords"
              initialValue={vendorData.vendorKeywords}
            />
          </fieldset>
          <Button color="primary" content="Edit Vendor" />
        </>
      )}
    </form>
  )
}
