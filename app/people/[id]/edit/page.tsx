"use client"

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"
import { FaArrowLeftLong } from "react-icons/fa6"
import Button from "~/components/ui/Button"
import Input from "~/components/ui/form/Input"

interface EditPersonPageProps {
  params: {
    id: string
  }
}

type PersonData = {
  name: string
  email: string
  degree: string
  classYear: string
  address: string
  credit: string
}

export default function EditPersonPage({
  params: { id }
}: EditPersonPageProps) {
  const router = useRouter()

  const fetchPersonData = useCallback(async () => {
    try {
      const foundPerson = await axios.get(`/api/v1/user/${id}`)
      setPersonData(foundPerson.data.user)
    } catch (error) {
      toast.error(
        `Error retrieving person ${id} - ${(error as AxiosError).response?.data}`
      )
      router.push("/404")
    }
  }, [id, router])

  async function updatePersonData(formData: FormData) {
    const updatedPersonData = {
      name: formData.get("name"),
      email: formData.get("email"),
      degree: formData.get("degree"),
      classYear: formData.get("classYear"),
      address: formData.get("address"),
      credit: formData.get("credit")
    }
    try {
      await axios.patch(`/api/v1/user/${id}`, updatedPersonData)
      toast.success("Person updated")
      router.push(`/people/${id}`)
      router.refresh()
    } catch (error) {
      toast.error(
        `Failed to update person - ${(error as AxiosError).response?.data}`
      )
    }
  }

  const [personData, setPersonData] = useState<PersonData | null>(null)

  useEffect(() => {
    fetchPersonData()
  }, [fetchPersonData])

  return (
    <form
      className="form edit-resource-form"
      id="edit-person-form"
      action={updatePersonData}
    >
      <Link href="/people/dashboard" className="back-link">
        <FaArrowLeftLong />
      </Link>
      {personData !== null && (
        <>
          <fieldset>
            <legend>Edit Person</legend>
            <Input
              type="text"
              id="name"
              label="Name"
              initialValue={personData.name}
            />
            <Input
              type="email"
              id="email"
              label="Email"
              initialValue={personData.email}
            />
            <Input
              type="text"
              id="degree"
              label="Degree"
              initialValue={personData.degree}
            />
            <Input
              type="text"
              id="classYear"
              label="Class Year"
              initialValue={personData.classYear}
            />
            <Input
              type="text"
              id="address"
              label="Address"
              initialValue={personData.address}
            />
            <Input
              type="text"
              id="credit"
              label="Credit"
              initialValue={personData.credit}
            />
          </fieldset>
          <Button color="primary" content="Edit Person" />
        </>
      )}
    </form>
  )
}
