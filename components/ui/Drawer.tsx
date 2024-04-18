"use client"
import React, { ReactNode, useState } from "react"
import { FaAngleUp } from "react-icons/fa"
import { FaAngleDown } from "react-icons/fa6"

interface DrawerProps {
  children?: ReactNode
  title: string
}

const Drawer: React.FC<DrawerProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <section className={`drawer ${isOpen ? "open" : ""}`}>
      <section className="drawer-header" onClick={() => setIsOpen(!isOpen)}>
        <h2>{title}</h2>
        <FaAngleDown
          className={`drawer-header-icon ${isOpen ? "open" : "closed"}`}
        />
      </section>
      <section className="drawer-content">{children}</section>
    </section>
  )
}

export default Drawer
