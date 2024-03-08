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

export default function Header() {
    const [headerOpen, setHeaderOpen] = useState(false);
    const { data: session, status } = useSession();

    return (
        <header className={`app-header ${headerOpen && "open"}`}>
            <Image src={WkuSquare} alt="WKU Logo" className="app-header-logo" />
            <nav className="app-main-navigation">
                <section className="nav-links">
                    <section className="nav-link">
                        <RiMenuUnfoldFill 
                            onClick={() => setHeaderOpen(!headerOpen)}
                        />
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
                        href="/projects"
                        onClick={() => setHeaderOpen(false)}
                    >
                        <FaSuitcase />
                        <p>Projects</p>
                    </Link>
                    <Link 
                        className="nav-link"
                        href="/vendors"
                        onClick={() => setHeaderOpen(false)}
                    >
                        <BsCameraReelsFill />
                        <p>Vendors</p>
                    </Link>
                </section>
                <section className="profile-links">
                    <section className="profile-link">
                        <FaUserCircle />
                        <p>Profile</p>
                    </section>
                    <section className="profile-link">
                        <MdLogout 
                            onClick={() => signOut()}
                        />
                        <p>Logout</p>
                    </section>
                </section>
            </nav>
        </header>
    );
}
