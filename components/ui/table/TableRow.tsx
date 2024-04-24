"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaEye, FaPenToSquare, FaTrashCan } from "react-icons/fa6"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"
import Modal from "../global/Modal"
import Button from "../global/Button"
import { useState } from "react"

interface TableRowProps {
  type: string
  singular: string
  id: string
  name: string | null
  fields: any[]
  deleteUrl: string
  renderActions?: boolean
}

export default function TableRow({
  type,
  singular,
  id,
  name,
  fields,
  deleteUrl,
  renderActions = false
}: TableRowProps) {

  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  function _toggleModal() {
    setModalOpen(!modalOpen)
  }

  async function deleteItem(id: string) {
    try {
      const url = deleteUrl.endsWith("/")
        ? deleteUrl
        : deleteUrl.concat("/")
      await axios.delete(`${url}${id}`)
      toast.success(
        `Deleted ${singular.toLowerCase()} ${name ? `'${name}'` : id}`
      )
    } catch (error) {
      toast.error(
        `Failed to delete ${singular.toLowerCase()} ${name ? `'${name}'` : id} - ${(error as AxiosError).response?.data}`
      )
    }
    router.refresh()
  }

  return (
    <tr>
      {fields.map((field, i) => (
        <td key={i}>{field }</td>
      ))}
      
      {renderActions && (
        <td className="database-actions">
          <Link
            href={`/${type.toLowerCase()}/${id}`}
            className="database-action-view"
          >
            <FaEye />
          </Link>
          <Link
            href={`/${type.toLowerCase()}/${id}/edit`}
            className="database-action-edit"
          >
            <FaPenToSquare />
          </Link>
          <FaTrashCan
            className="database-action-delete"
            onClick={_toggleModal}
          />

          <Modal open={modalOpen} toggleHandler={_toggleModal}>
            <section className="delete-confirmation">
              <h4>
                {`Are you sure you want to delete ${type.toLowerCase()} ${name ? `'${name}'` : id}?`}
              </h4>
            </section>
            <section className="delete-confirmation-buttons">
              <Button
                color="primary"
                content="Yes"
                disabled={false}
                handler={() => deleteItem(id)}
              />
              <Button
                color="secondary"
                content="No"
                disabled={false}
                handler={_toggleModal}
              />
            </section>
          </Modal>
        </td>
      )}
    </tr>
  )
}
