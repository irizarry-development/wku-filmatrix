import { ReactNode } from "react"

interface DashboardContainerProps {
  additionalClasses?: string
  headerText: string
  headerIcon: ReactNode
  children: ReactNode
  button?: ReactNode
}

export default function DashboardContainer({
  additionalClasses,
  headerText,
  headerIcon,
  children,
  button
}: DashboardContainerProps) {
  return (
    <section
      className={`dashboard-container ${additionalClasses} ${button ? "has-button" : ""}`}
    >
      <section className="dashboard-container-header">
        {headerIcon}
        <h2>{headerText}</h2>
        {button && (
          <section className="dashboard-container-header-button">
            {button}
          </section>
        )}
      </section>
      <section className="dashboard-container-content">{children}</section>
    </section>
  )
}
