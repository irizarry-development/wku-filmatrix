"use client";

import Image from "next/image";
import WkuSquare from "~/public/wkucuptall_w.png";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { MdPeopleAlt } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { BsCameraReelsFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { Session } from "next-auth";

interface HeaderProps {
    session: Session | null
}

export default function Header({
    session
}: HeaderProps) {
    const [headerOpen, setHeaderOpen] = useState(false);

    return (
        <header className={`app-header ${headerOpen && "open"}`}>
            <Image src={WkuSquare} alt="WKU Logo" className="app-header-logo" />
            {session &&
                <nav className="app-main-navigation">
                    <section className="nav-links">
                        <section
                            className="nav-link"
                            onClick={() => setHeaderOpen(!headerOpen)}
                        >
                            <RiMenuUnfoldFill />
                            <p>Menu</p>
                        </section>
                        <Link
                            className="nav-link"
                            href="/"
                            onClick={() => setHeaderOpen(false)}
                        >
                            <FaHome />
                            <p>Dashboard</p>
                        </Link>
                        <Link
                            className="nav-link"
                            href="/people"
                            onClick={() => setHeaderOpen(false)}
                        >
                            <MdPeopleAlt />
                            <p>People</p>
                        </Link>
                        <Link
                            className="nav-link"
                            href="/locations"
                            onClick={() => setHeaderOpen(false)}
                        >
                            <FaMapMarkerAlt />
                            <p>Locations</p>
                        </Link>
                        <Link
                            className="nav-link"
                            href="/vendors"
                            onClick={() => setHeaderOpen(false)}
                        >
                            <FaSuitcase />
                            <p>Vendors</p>
                        </Link>
                        <Link
                            className="nav-link"
                            href="/projects"
                            onClick={() => setHeaderOpen(false)}
                        >
                            <BsCameraReelsFill />
                            <p>Projects</p>
                        </Link>
                    </section>
                    <section className="profile-links">
                        <section className="profile-link">
                            <Link 
                                className="profile-link"
                                // @ts-ignore
                                href={`/people/${session.userId}`}
                            >
                                <FaUserCircle />
                                <p>Profile</p>
                            </Link>
                        </section>
                        <section className="profile-link">
                            <MdLogout
                                onClick={() => signOut()}
                            />
                            <p>Logout</p>
                        </section>
                    </section>
                </nav>
            }
        </header>
    );
}
