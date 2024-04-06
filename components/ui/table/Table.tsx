import { ReactNode } from "react"
import Input from "../form/Input"

interface TableProps {
    title: string
    headers: string[]
    children: ReactNode
}

export default function Table({
    title,
    headers,
    children
}: TableProps) {
    return (
        <>
        {/* <Input placeholder={`Search ${title}`} id="search" type="text" /> */}
        <section className="searchable-table">
            <table className="table">
                <thead className="table-header">
                    <tr>
                        {headers.map((header,i) => (
                            <th key={i}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table-body">
                    {children}
                </tbody>
            </table>
        </section>
        </>
    )
}