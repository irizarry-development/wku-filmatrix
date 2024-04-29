"use client"

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaArrowLeftLong } from "react-icons/fa6"
import Button from "~/components/ui/global/Button"
import Input from "~/components/ui/form/Input"
import Radio from "~/components/ui/form/Radio"

export default function CreatePeoplePage() {
  const router = useRouter()

  async function addPerson(formData: FormData) {
    const newPersonData = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      password: formData.get("password"),
      repeat: formData.get("repeat"),
    }
    try {
      await axios.post(`/api/v1/user`, newPersonData);
      toast.success("Person added");
      router.push(`/people/dashboard`);
      router.refresh();
    } catch (error) {
      toast.error(`Failed to add person - ${(error as AxiosError).response?.data}`);
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
        <Input id="name" label="Name" />
        <Input id="email" label="Email" />
        <Input id="password" label="Password" type="password" />
        <Input id="repeat" label="Repeat Password" type="password" />
        <Radio id="role" label="Role" options={[
          {name: "Admin", value: 1},
          {name: "Student", value: 2},
          {name: "Graduate", value: 3},
        ]} />
      </fieldset>
      <Button color="primary" content="Add User" />
    </form>
  )
}
