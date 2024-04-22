"use client"

import axios from "axios"
import toast from "react-hot-toast"

export default function AddProjectPage() {
  async function handleAddProject() {
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
      const x = await axios.post("/api/v1/projects/add", newProjectData);
      toast.success("Project added")
    } catch (error) {
      toast.error("Failed to add project")
    }
  }

  return (
    <div>
      <h1>Add Project</h1>
      <p>Add project form will be displayed here.</p>
      <button onClick={handleAddProject}>add project E</button>
    </div>
  )
}
