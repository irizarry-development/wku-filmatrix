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

type User = {
  id: string,
  name: string|null,
  email: string|null,
  degree: string|null,
  classYear: string|null,
  hasOnboarded: boolean,
  address: string|null,
  credit: string|null,
}

export default function PeopleTableRow({
  id,
  name,
  email,
  degree,
  classYear,
  hasOnboarded,
  address,
  credit,
}: User) {

  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  async function deletePerson(id: string, name: string|null) {
    try {
      await axios.delete(`/api/v1/user/${id}`, {data: {id}});
      toast.success(`User '${(name ? name : id)}' deleted`);
    } catch (error) {
      toast.error(`Failed to delete user '${(name ? name : id)}'`);
    }
    toggleModal(dialogRef);
    router.refresh();
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{degree}</td>
      <td>{classYear}</td>
      <td>{hasOnboarded ? "Yes" : "No"}</td>
      <td>{address}</td>
      <td>{credit}</td>
      <td className="database-actions">
        <Link href={`/people/${id}`} className="database-action-view">
          <FaEye />
        </Link>
        <Link
          href={`/people/${id}/edit`}
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
              {`Are you sure you want to delete user '${name}'?`}
            </h4>
          </section>
          <section className="delete-confirmation-buttons">
            <Button
              color="primary"
              content="Yes"
              disabled={false}
              handler={() => deletePerson(id, name)}
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