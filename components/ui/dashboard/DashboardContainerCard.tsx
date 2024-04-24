import Link from "next/link";
import { ReactNode } from "react";
import { FaEye, FaLinkSlash } from "react-icons/fa6";

interface DashboardContainerCardProps {
    children: ReactNode;
    id: string;
}

export default function DashboardContainerCard({
    children,
    id
}: DashboardContainerCardProps) {
    return (
        <section className="dashboard-container-card" key={id}>
            <section className="dashboard-container-card-image">

            </section>
            <section className="dashboard-container-card-actions">
                <Link href={`/projects/${id}`}>
                    <FaEye className="view-project" />
                </Link>
                <FaLinkSlash className="unlink-project" />
            </section>
            <section className="dashboard-container-card-meta">
                {children}
            </section>
        </section>
    )
}