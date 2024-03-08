"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { FaGear } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";

export default function UserCard({
    name,
    image,
    email,
    hasOnboarded,
    phoneNumber,
    outgoingEmail,
    address,
    emergencyContactName,
    emergencyContactPhone
}: User) {
    const [detailsOpen, setDetailsOpen] = useState(false);

    const _handleToggle = () => {
        setDetailsOpen(!detailsOpen);
    };

    return (
        <section className="people-card" key={name}>
            <section className="people-card-meta">
                <section className="people-card-image"></section>
                <section className="people-card-details">
                    <p>{name}</p>
                </section>
            </section>

            <BsThreeDots
                className="people-card-open-details"
                onClick={_handleToggle}
            />
            
                <section className={`people-details ${detailsOpen && 'open'}`}>
                    <section className="people-details-content">
                        <p><strong>Email: </strong><a href={`mailto:${email}`}>{email}</a></p>
                        <p><strong>Phone: </strong><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
                        <p><strong>Outgoing Email: </strong><a href={`mailto:${outgoingEmail}`}>{outgoingEmail}</a></p>
                        <p><strong>Address: </strong><a href={`maps://?q=${address}`}>{address}</a></p>
                        <p><strong>Emergency Contact: </strong>{emergencyContactName}</p>
                        <p><strong>Emergency Contact Phone: </strong><a href={`tel:${emergencyContactPhone}`}>{emergencyContactPhone}</a></p>
                    </section>
                    <section className="people-action-buttons">
                        <FaGear className="people-card-edit" />
                        <FaRegTrashCan className="people-card-delete" />
                        <FaClipboardList className="people-card-view" />
                        <FaArchive className="people-card-archive" />
                    </section>
                </section>
            
        </section>
    );
}
