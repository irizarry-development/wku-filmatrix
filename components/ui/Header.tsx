"use client";

import Image from 'next/image';
import WkuLogo from '~/public/wku_w.png';
import WkuSquare from '~/public/wkucuptall_w.png'
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [navActive, setNavActive] = useState(false)
 
    return (
        <header className="app-header">
          <Image 
            src={WkuSquare}
            alt="WKU Logo"
            className="app-header-logo"
          />
          <nav className={`app-main-navigation ${navActive}`}>
            <section className="nav-links">
              <Link className="nav-link" href="/">Home</Link>
              <Link className="nav-link" href="/people">People</Link>
              <Link className="nav-link" href="/projects">Projects</Link>
              <Link className="nav-link" href="/vendors">Vendors</Link>
              <Link className="nav-link" href="/your-profile">Your Profile</Link>
              <Link className="nav-link" href="/auth/signin">Login</Link>
            </section>
          </nav>
          <section className="app-hamburger" onClick={() => setNavActive(!navActive)}>
              <section className="app-hamburger-line"></section>
              <section className="app-hamburger-line"></section>
              <section className="app-hamburger-line"></section>
          </section>
        </header>
    )
}