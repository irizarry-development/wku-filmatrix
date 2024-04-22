"use client"

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Button from "~/components/ui/Button"
import Input from "~/components/ui/form/Input"
import { FaArrowLeftLong } from "react-icons/fa6"
import { ZodError } from "zod"

export default function AddActorPage() {
  const router = useRouter()

  async function handleAddActor(formData: FormData) {
    const newActorData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };
      
    try {
      await axios.post("/api/v1/actors/add", newActorData)
      toast.success("Actor added")
      router.push("/actors/dashboard")
      router.refresh()
    } catch (error) {
      toast.error(`Failed to add actor - ${(error as AxiosError).response?.data || (error as ZodError).message}`)
    }
  }

  return (
    <form
      className="form add-resource-form"
      id="add-actor-form"
      action={handleAddActor}
    >
      <Link href="/actors/dashboard" className="back-link">
        <FaArrowLeftLong />
      </Link>
      <fieldset>
        <legend>Add Actor</legend>
        <Input
          id="name"
          label="Actor Name"
          placeholder="Enter actor name"
        />
        <Input
          id="email"
          label="Actor Email"
          placeholder="Enter actor email"
        />
        <Input
          id="phone"
          label="Actor Phone"
          placeholder="Enter actor phone"
        />
      </fieldset>
      <Button color="primary" content="Add Actor" />
    </form>
  )
}
