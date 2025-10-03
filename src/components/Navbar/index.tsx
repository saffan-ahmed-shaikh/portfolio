"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {links.map((link) => (
          <li className="navbar-item" key={link.href}>
            <Link
              href={link.href}
              className={`navbar-link ${
                pathname === link.href ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
