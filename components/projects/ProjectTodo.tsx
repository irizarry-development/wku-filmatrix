"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProjectTodoProps {
    id: string;
    category: string;
    name: string;
    complete: boolean;
    approver: string | null;
    apdt: string | null;
}

export default function ProjectTodo({
    id,
    category,
    name,
    complete,
    approver,
    apdt
}: ProjectTodoProps) {
    const router = useRouter();

    const handleApproval = async (id: string, name: string) => {
        try {
            const res = await axios.post(`/api/v1/todos/${id}/approve`);
            if (res.status >= 200 && res.status <= 299)
                toast.success(`${name} approved`);
            else toast.error(`Failed to approve ${name} - ${res.data}`);
        } catch {
            toast.error(`Failed to approve ${name}`);
        }
        router.refresh();
    };

    return (
        <section className={`project-todo ${complete && "approved"}`}>
            <p className="todo-name">{name}</p>

            {approver && (
                <p className="todo-approver">
                    Approved by <strong>{ approver }</strong> on <em>{apdt}</em>
                </p>
            )}
            {complete ? (
                <button className="btn sm outline" disabled={true}>
                    Approved
                </button>
            ) : (
                <button
                    className="btn sm primary"
                    onClick={() => handleApproval(id, name)}
                >
                    Approve
                </button>
            )}
        </section>
    );
}
