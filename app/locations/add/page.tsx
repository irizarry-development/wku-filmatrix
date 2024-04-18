"use client"

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Button from "~/components/ui/Button"
import Input from "~/components/ui/form/Input"
import { FaArrowLeftLong } from "react-icons/fa6"

export default function AddLocationPage() {
  const router = useRouter()

  async function handleAddLocation(formData: FormData) {
    const newLocationData = {
      locationName: formData.get("locationName"),
      locationDescription: formData.get("locationDescription"),
      locationAddress: formData.get("locationAddress"),
      locationPhone: formData.get("locationPhone"),
      locationEmail: formData.get("locationEmail"),
      locationContactName: formData.get("locationContactName"),
      locationKeywords: formData.get("locationKeywords")
    }

    try {
      await axios.post("/api/v1/locations/add", newLocationData)
      toast.success("Location added")
      router.push("/locations/dashboard")
      router.refresh()
    } catch (error) {
      toast.error(
        `Failed to add location - ${(error as AxiosError).response?.data}`
      )
    }
  }

  return (
    <form
      className="form add-resource-form"
      id="add-location-form"
      action={handleAddLocation}
    >
      <Link href="/locations/dashboard" className="back-link">
        <FaArrowLeftLong />
      </Link>
      <fieldset>
        <legend>Add Location</legend>
        <Input
          id="locationName"
          label="Location Name"
          placeholder="Enter location name"
        />
        <Input
          id="locationDescription"
          label="Location Description"
          placeholder="Enter location description"
        />
        <Input
          id="locationAddress"
          label="Location Address"
          placeholder="Enter location address"
        />
        <Input
          id="locationPhone"
          label="Location Phone"
          placeholder="Enter location phone"
          type="tel"
        />
        <Input
          id="locationEmail"
          label="Location Email"
          placeholder="Enter location email"
          type="email"
        />
        <Input
          id="locationContactName"
          label="Location Contact Name"
          placeholder="Enter location contact name"
        />
        <Input
          id="locationKeywords"
          label="Location Keywords"
          placeholder="Enter location keywords"
        />
      </fieldset>
      <Button color="primary" content="Add Location" />
    </form>
  )
}
