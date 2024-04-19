"use client"

import { Project } from "@prisma/client"
import { useState } from "react"

interface ProjectTabProps {
  projectData: Project
}

export default function ProjectTabs({ projectData }: ProjectTabProps) {
  const [activeTab, setActiveTab] = useState("details")

  const _handleTab = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <section className="project-tabs">
      <nav className="project-tabs-navigation">
        <button
          className={activeTab === "details" ? "active" : ""}
          onClick={() => _handleTab("details")}
        >
          Details
        </button>
        <button
          className={activeTab === "crew" ? "active" : ""}
          onClick={() => _handleTab("crew")}
        >
          People
        </button>
        <button
          className={activeTab === "locations" ? "active" : ""}
          onClick={() => _handleTab("locations")}
        >
          Locations
        </button>
        <button
          className={activeTab === "vendors" ? "active" : ""}
          onClick={() => _handleTab("vendors")}
        >
          Vendors
        </button>
        <button
          className={activeTab === "media" ? "active" : ""}
          onClick={() => _handleTab("media")}
        >
          Media
        </button>
        <button
          className={activeTab === "festivals" ? "active" : ""}
          onClick={() => _handleTab("festivals")}
        >
          Festivals
        </button>
        <button
          className={activeTab === "tasks" ? "active" : ""}
          onClick={() => _handleTab("tasks")}
        >
          Tasks
        </button>
      </nav>
    </section>
  )
}
