"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProjectTodo(props: {
  id: string,
  category: string,
  name: string,
  complete: boolean,
  approver: string|null,
  apdt: string|null,
}) {
  const router = useRouter()

  const handleApproval = async (id: string, name: string) => {
    try {
      const res = await axios.post(`/api/v1/todos/${id}/approve`);
      if (res.status >= 200 && res.status <= 299)
        toast.success(`${name} approved`);
      else
        toast.error(`Failed to approve ${name} - ${res.data}`);
    } catch {
      toast.error(`Failed to approve ${name}`);
    }
    router.refresh()
  }

  return (
    <tr>
      <td>{props.name}</td>
      <td>
        {
          props.complete
          ? (
            <button
              className='btn sm outline'
              disabled={true}
            >
              Approved
            </button>
          )
          : (
            <button
              className='btn sm primary'
              onClick={() => handleApproval(props.id, props.name)}
            >
              Approve
            </button>
          )
        }
      </td>
      <td>{props.approver && `approved by ${props.approver} on ${props.apdt}`}</td>
    </tr>
  )
}
