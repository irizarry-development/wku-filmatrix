import { ReactNode } from "react"

interface DashboardContainerProps {
    additionalClasses?: string
    headerText: string
    headerIcon: ReactNode
    children: ReactNode
}

export default function DashboardContainer({
    additionalClasses,
    headerText,
    headerIcon,
    children
}: DashboardContainerProps) {
    return (
        <section className={`dashboard-container ${additionalClasses}`}>
            <section className="dashboard-container-header">
                {headerIcon}
                <h2>{headerText}</h2>
            </section>
            <section className="dashboard-container-content">
                {children}
            </section>
        </section>
    )
}