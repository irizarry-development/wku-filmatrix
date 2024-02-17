"use client";

import Image from "next/image";
import WkuSquare from "~/public/wkucuptall_w.png";
import { useState } from "react";
import Link from "next/link";
import { NavLink, appNavigationLinks } from "~/app.config";
import { signOut, useSession } from "next-auth/react";
import Button from "./Button";

export default function Header() {
    const [navActive, setNavActive] = useState(false);
    const { data: session, status } = useSession();

    const _renderNavLinks = (links: NavLink[]) =>
        links.map((link: NavLink) => (
            <Link
                className="nav-link"
                href={link.path}
                key={link.label}
                onClick={() => setNavActive(!navActive)}
            >
                {link.label}
            </Link>
        ));

    return (
        <header className="app-header">
            <Image src={WkuSquare} alt="WKU Logo" className="app-header-logo" />
            <nav className={`app-main-navigation ${navActive}`}>
                <section className="nav-links">
                    {status === "authenticated" &&
                        _renderNavLinks(appNavigationLinks)}
                    {status === "authenticated" ? (
                        <Button
                            content="Logout"
                            color="primary"
                            size="lg"
                            handler={signOut}
                        />
                    ) : (
                        <Link className="nav-link" href="/auth/signin">
                            Login
                        </Link>
                    )}
                </section>
            </nav>
            <section
                className="app-hamburger"
                onClick={() => setNavActive(!navActive)}
            >
                <section className="app-hamburger-line"></section>
                <section className="app-hamburger-line"></section>
                <section className="app-hamburger-line"></section>
            </section>
        </header>
    );
}
