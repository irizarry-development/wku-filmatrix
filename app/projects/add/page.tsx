"use client"

import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import Link from "next/link"
import Button from "~/components/ui/global/Button"
import Input from "~/components/ui/form/Input"
import { useRouter } from "next/navigation"
import { FaArrowLeftLong } from "react-icons/fa6"

export default function AddProjectPage() {
  const router = useRouter();

  async function handleAddProject(formData: FormData) {
    const newProjectData = {
      projectName: formData.get("projectName"),
      projectProductionNumber: formData.get("projectProductionNumber"),
    }

    try {
      await axios.post("/api/v1/projects/add", newProjectData)
      toast.success("Project added")
      router.push("/projects/dashboard")
      router.refresh()
    } catch (error) {
      toast.error(
        `Failed to add project - ${(error as AxiosError).response?.data}`
      )
    }
  }

  return (
    <form
      className="form add-resource-form"
      id="add-project-form"
      action={handleAddProject}
    >
      <Link href="/projects/dashboard" className="back-link">
        <FaArrowLeftLong />
      </Link>
      <fieldset>
        <legend>Add Project</legend>
        <Input
          id="projectName"
          label="Project Name"
          placeholder="Enter project name"
        />
        <Input
          id="projectProductionNumber"
          label="Project Production Number"
          placeholder="Enter project production number"
        />
      </fieldset>
      <Button color="primary" content="Add Project" />
    </form>
  )
}
