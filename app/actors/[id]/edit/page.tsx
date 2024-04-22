"use client"

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"
import { FaArrowLeftLong } from "react-icons/fa6"
import Button from "~/components/ui/Button"
import Input from "~/components/ui/form/Input"

interface EditActorPageProps {
  params: {
    id: string
  }
}

type ActorData = {
  name: string,
  email: string,
  phone: string,
}

export default function EditActorPage({
  params: { id }
}: EditActorPageProps) {
  const router = useRouter()

  const fetchActorData = useCallback(async () => {
    try {
      const foundActor = await axios.get(`/api/v1/actors/${id}`)
      setActorData(foundActor.data.actor)
    } catch (error) {
      toast.error(`Error retrieving actor ${id} - ${(error as AxiosError).response?.data}`);
      router.push("/404");
    }
  }, [id, router])

  async function updateActorData(formData: FormData) {
    const updatedActorData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    }

    try {
      await axios.patch(`/api/v1/actors/${id}`, updatedActorData)
      toast.success("Actor updated")
      router.push(`/actors/${id}`)
      router.refresh()
    } catch (error) {
      toast.error(`Failed to update actor - ${(error as AxiosError).response?.data}`)
    }
  }

  const [actorData, setActorData] = useState<ActorData | null>(null)

  useEffect(() => {
    fetchActorData()
  }, [fetchActorData]);

  return (
    <form
      className="form edit-resource-form"
      id="edit-actor-form"
      action={updateActorData}
    >
      <Link href="/actors/dashboard" className="back-link">
        <FaArrowLeftLong />
      </Link>
      {actorData !== null && (
        <>
          <fieldset>
            <legend>Edit Actor</legend>
            <Input
              type="text"
              id="name"
              label="Actor Name"
              initialValue={actorData.name}
            />
            <Input
              type="text"
              id="email"
              label="Email"
              initialValue={actorData.email}
            />
            <Input
              type="text"
              id="phone"
              label="Phone"
              initialValue={actorData.phone}
            />
          </fieldset>
          <Button color="primary" content="Edit Actor" />
        </>
      )}
    </form>
  )
}
