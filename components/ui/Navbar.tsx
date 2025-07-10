"use client";

import ThemeToggle from "../ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Navbar() {
    return(
        <nav className="fixed top-0 right-0 flex justify-end px-6 py-4">
            <ThemeToggle />
            <LanguageSwitcher />
        </nav>
    )
}