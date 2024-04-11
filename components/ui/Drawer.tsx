"use client"
import React, { useState } from 'react';

interface Link {
  url: string;
  text: string;
}

interface DrawerProps {
  title: string;
  links: Link[];
}

const Drawer: React.FC<DrawerProps> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="drawer-container">
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen && (
        <div className="drawer-content" style={{ display: 'flex', flexDirection: "column" }}>
          {links.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Drawer;
