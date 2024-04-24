"use client"

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaArrowLeftLong } from "react-icons/fa6"
import Button from "~/components/ui/global/Button"
import Input from "~/components/ui/form/Input"

export default function CreatePeoplePage() {
  const router = useRouter()

  async function addPerson(formData: FormData) {
    const newPersonData = {
      name: formData.get("name"),
      email: formData.get("email")
    }

    try {
      await axios.post(`/api/v1/user`, newPersonData)
      toast.success("Person added")
      router.push(`/people/dashboard`)
      router.refresh()
    } catch (error) {
      toast.error(
        `Failed to add person - ${(error as AxiosError).response?.data}`
      )
    }
  }

  return (
    <form
      className="form add-resource-form"
      id="add-user-form"
      action={addPerson}
    >
      <Link href="/people/dashboard" className="back-link">
        <FaArrowLeftLong />
      </Link>
      <fieldset>
        <legend>User Information</legend>
        <Input label="Name" id="name" />
        <Input label="Outgoing Email" id="email" />
      </fieldset>
      <Button color="primary" content="Add User" />
    </form>
  )
}
