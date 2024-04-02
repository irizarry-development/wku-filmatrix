"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FaEye, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";

import { toggleModal } from "~/lib/modal";
import Modal from "../Modal";
import Button from "../Button";

import "~/styles/ui/tablerow.css";


export default function TableRow(props: {
  type: string,
  id: string,
  name: string|null,
  fields: (string|null)[],
  deleteUrl: string,
}) {

  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  async function deleteItem(id: string) {
    try {
      const url = props.deleteUrl.endsWith('/') ? props.deleteUrl : props.deleteUrl.concat('/');
      const res = await axios.delete(`${url}${id}`, {data: {id}});
      if (res.data.status >= 100 && res.data.status <= 299)
        toast.success(`${props.type} ${props.name ? `'${props.name}'` : props.id} deleted`);
      else
        toast.error(res.data.error);
    } catch (error) {
      toast.error(`Failed to delete ${props.type.toLowerCase()} ${props.name ? `'${props.name}'` : props.id}`);
    }
    toggleModal(dialogRef);
    router.refresh();
  }

  return (
    <tr>

      { props.fields.map((field, i) => <td key={i}>{field ? field : ''}</td>) }

      <td className="database-actions">
        <Link href={`/people/${props.id}`} className="database-action-view">
          <FaEye />
        </Link>
        <Link
          href={`/people/${props.id}/edit`}
          className="database-action-edit"
        >
          <FaPenToSquare />
        </Link>

        <button
          className="delete-button"
          onClick={() => toggleModal(dialogRef)}
        >
          <FaTrashCan
            className="database-action-delete"
          />
        </button>

        <Modal
          ref={dialogRef}
          toggleHandler={() => toggleModal(dialogRef)}
        >
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