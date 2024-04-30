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

  async function addProjectE() {
    const newProjectData = {
      projectName: "Project E",
      projectDescription: "A thrilling adventure in an ancient world.",
      projectRuntime: "120 minutes",
      projectAspectRatio: "16:9",
      projectRating: "PG-13",
      projectRatingCriteria: "Violence, Brief Language",
      projectProductionNumber: "PRD005",
      projectCategory: "Adventure",
      projectGenre: "Action",
      projectLanguage: "English",
      projectShootingFormat: "Digital",
      projectFilmSound: "Dolby 5.1",
      projectFilmSubtitled: false,
      projectTagline: "An adventure like no other.",
      projectLogLine:
        "A hero rises in the ancient world to confront an unseen evil.",
      project25WordPitch:
        "An ancient hero's quest to save their world from a menacing evil.",
      project50WordPitch:
        "In a race against time, a lone hero must navigate the dangers of an ancient world to prevent a catastrophic war.",
      project75WordPitch:
        "Facing insurmountable odds, a hero embarks on a perilous journey to thwart a dark force threatening to destroy their home."
    }

    try {
      await axios.post("/api/v1/projects/add", newProjectData);
      toast.success("Project E added");
      router.push("/projects/dashboard");
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(`Failed to add project - ${(error as AxiosError).response?.data}`);
      else
        toast.error('Unexpected error adding project');
    }
  }

  async function handleAddProject(formData: FormData) {
    const newProjectData = {
      projectName: formData.get("projectName"),
      projectProductionNumber: formData.get("projectProductionNumber"),
    }

    try {
      await axios.post("/api/v1/projects/add", newProjectData);
      toast.success("Project added");
      router.push("/projects/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(`Failed to add project - ${(error as AxiosError).response?.data}`);
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
      <button onClick={addProjectE}>add project E</button>
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
