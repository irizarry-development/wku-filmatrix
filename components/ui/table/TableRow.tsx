"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { FaEye, FaPenToSquare, FaTrashCan } from "react-icons/fa6"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"

import { toggleModal } from "~/lib/modal"
import Modal from "../Modal"
import Button from "../Button"

export default function TableRow(props: {
  type: string
  singular: string
  id: string
  name: string | null
  fields: any[]
  deleteUrl: string
}) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)

  async function deleteItem(id: string) {
    try {
      const url = props.deleteUrl.endsWith("/")
        ? props.deleteUrl
        : props.deleteUrl.concat("/")
      await axios.delete(`${url}${id}`);
      toast.success(
        `Deleted ${props.singular.toLowerCase()} ${props.name ? `'${props.name}'` : props.id}`
      )
    } catch (error) {
      toast.error(
        `Failed to delete ${props.singular.toLowerCase()} ${props.name ? `'${props.name}'` : props.id} - ${(error as AxiosError).response?.data}`
      )
    }
    toggleModal(dialogRef)
    router.refresh()
  }

  return (
    <tr>
      {props.fields.map((field, i) => (
        <td key={i}>{field ? field : ""}</td>
      ))}

      <td className="database-actions">
        <Link
          href={`/${props.type.toLowerCase()}/${props.id}`}
          className="database-action-view"
        >
          <FaEye />
        </Link>
        <Link
          href={`/${props.type.toLowerCase()}/${props.id}/edit`}
          className="database-action-edit"
        >
          <FaPenToSquare />
        </Link>
        <FaTrashCan
          className="database-action-delete"
          onClick={() => toggleModal(dialogRef)}
        />

        <Modal ref={dialogRef} toggleHandler={() => toggleModal(dialogRef)}>
          <section className="delete-confirmation">
            <h4>
              {`Are you sure you want to delete ${props.type.toLowerCase()} ${props.name ? `'${props.name}'` : props.id}?`}
            </h4>
          </section>
          <section className="delete-confirmation-buttons">
            <Button
              color="primary"
              content="Yes"
              disabled={false}
              handler={() => deleteItem(props.id)}
            />
            <Button
              color="secondary"
              content="No"
              disabled={false}
              handler={() => toggleModal(dialogRef)}
            />
          </section>
        </Modal>
      </td>
    </tr>
  )
}
