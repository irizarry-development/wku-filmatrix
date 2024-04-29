"use client"

import React, { ReactNode, useState } from "react"
import Modal from "../global/Modal"

interface DashboardContainerProps {
  additionalClasses?: string
  headerText: string
  headerIcon: ReactNode
  children?: ReactNode,
  button?: ReactNode
  modalContent?: ReactNode
}

export default function DashboardContainer({
  additionalClasses,
  headerText,
  headerIcon,
  children,
  button,
  modalContent
}: DashboardContainerProps) {
  const [modalOpen, setModalOpen] = useState(false)

  function _toggleModal() {
    setModalOpen(!modalOpen)
  }

  return (
    <section
      className={`dashboard-container ${additionalClasses} ${button ? "has-button" : ""}`}
    >
      <section className="dashboard-container-header">
        {headerIcon}
        <h2>{headerText}</h2>
        {button && (
          <section
            className="dashboard-container-header-button"
            onClick={_toggleModal}
          >
            {button}
          </section>
        )}
      </section>
      <section className="dashboard-container-content">
        {
          (children && React.Children.count(children) > 0) && (
            <section className="dashboard-container-content-inner">
              {children}
            </section>
          )
        }
      </section>
      {modalContent && (
        <Modal open={modalOpen} toggleHandler={_toggleModal}>
          {modalContent}
        </Modal>
      )}
    </section>
  )
}
