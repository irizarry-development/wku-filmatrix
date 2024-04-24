import { ReactNode } from "react"

interface TableProps {
  title: string
  headers: string[]
  children: ReactNode
}

export default function Table({ headers, children }: TableProps) {
  return (
    <table className="table">
      <thead className="table-header">
        <tr>
          {headers.map((header, i) => (
            <th key={i}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="table-body">{children}</tbody>
    </table>
  )
}
