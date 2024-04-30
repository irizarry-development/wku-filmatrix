import Link from "next/link"
import { ReactNode } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import Image from "next/image"

interface DashboardLayoutProps {
    children: ReactNode
    jumbotronImage: string
    jumbotronTitle: string
    jumbotronSubtitle?: string,
    dashboardId: string
    dashboardName: string
    dashboardClass: string
}

export default function DashboardLayout({
    children,
    jumbotronImage,
    jumbotronTitle,
    jumbotronSubtitle,
    dashboardId,
    dashboardClass
}: DashboardLayoutProps) {
    return (
        <section className={`dashboard-layout ${dashboardClass} `}>
            <section className="dashboard-jumbotron">
                <Image
                    src={jumbotronImage}
                    alt={jumbotronTitle}
                    className="dashboard-jumbotron-image"
                    width={1200}
                    height={800}
                />
                <section className="dashboard-jumbotron-content">
                    <Link href={`/${dashboardId}/dashboard`}>
                        <FaArrowLeftLong />
                    </Link>
                    <h1>{jumbotronTitle}</h1>
                    { (jumbotronSubtitle) && <h2>{jumbotronSubtitle}</h2> }
                </section>
            </section>
            {children}
        </section>
    )
}