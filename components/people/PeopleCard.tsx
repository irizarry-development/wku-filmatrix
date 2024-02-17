import { User } from "@prisma/client";
import Image from "next/image";
import Button from "../ui/Button";
import { FaGear } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";

export default function UserCard({
    name,
    image,
    email,
    hasOnboarded,
    phoneNumber
}: User) {
    return (
        <section className="people-card" key={name}>
            <section className="people-card-meta">
                <strong>{name}</strong>
                <p>{email}</p>
                <p>{hasOnboarded ? "Onboarded" : "Not onboarded"}</p>
                <p>{phoneNumber || "no phone number"}</p>
            </section>
            <section className="people-card-buttons">
                <FaGear className="people-card-edit" />
                <FaRegTrashCan className="people-card-delete" />
                <FaClipboardList className="people-card-view" />
                <FaArchive className="people-card-archive" />
            </section>
        </section>
    );
}
