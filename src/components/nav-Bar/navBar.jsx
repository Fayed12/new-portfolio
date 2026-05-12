// local
import useTheme from "../../hooks/themeHook";
import styles from "./navBar.module.css";
import MainButton from "../ui/button/MainButton";

// react
import { useState, useEffect, useRef, useCallback } from "react";

// react router
import { NavLink } from "react-router";

// gsap
import { gsap } from "gsap";

// react icons
import {
    FiMenu, FiX, FiHome, FiUser, FiCode, FiFolder,
    FiBriefcase, FiGithub, FiAward, FiMail, FiMoon, FiSun
} from "react-icons/fi";

const NavBar = () => {
    const { theme, toggleTheme } = useTheme()

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef(null);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = useCallback(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [isMenuOpen]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                navRef.current &&
                !navRef.current.contains(event.target) &&
                isMenuOpen
            ) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeMenu, isMenuOpen]);

    // Handle body scroll locking
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
            // GSAP animation for opening menu
            if (menuRef.current) {
                gsap.fromTo(
                    menuRef.current,
                    { y: -20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
                );
            }
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    // GSAP initial animation for NavBar
    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const navLinks = [
        { path: "/home", name: "Home", icon: <FiHome /> },
        { path: "/about", name: "About", icon: <FiUser /> },
        { path: "/skills", name: "Skills", icon: <FiCode /> },
        { path: "/projects", name: "Projects", icon: <FiFolder /> },
        { path: "/experience", name: "Experience", icon: <FiBriefcase /> },
        { path: "/github", name: "Github", icon: <FiGithub /> },
        { path: "/certifications", name: "Certifications", icon: <FiAward /> },
        { path: "/contact", name: "Contact", icon: <FiMail /> },
    ];

    return (
        <header className={styles.header} ref={navRef}>
            <div className={styles.navContainer}>
                {/* Logo */}
                <div className={styles.logoWrapper}>
                    <NavLink to="/" className={styles.logo} onClick={closeMenu}>
                        <img src="/logo1.png" alt="Logo" className={styles.logoImg} />
                    </NavLink>
                </div>

                {/* Desktop Menu */}
                <nav className={styles.desktopMenu}>
                    <ul className={styles.navItems}>
                        {navLinks.map((link) => (
                            <li key={link.path} className={styles.navItem}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Section */}
                <div className={styles.rightSection}>
                    <MainButton size="sm" action="danger" clickEvent={() => toggleTheme()}>
                        {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </MainButton>

                    <div className={styles.hireBtnWrapper}>
                        <MainButton size="sm" action="primary">Hire Me</MainButton>
                    </div>

                    {/* Burger Icon for Mobile */}
                    <button
                        className={styles.burgerBtn}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={styles.mobileMenuOverlay}>
                    <nav className={styles.mobileMenu} ref={menuRef}>
                        <ul className={styles.mobileNavItems}>
                            {navLinks.map((link) => (
                                <li key={link.path} className={styles.mobileNavItem}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${styles.mobileNavLink} ${styles.active}`
                                                : styles.mobileNavLink
                                        }
                                        onClick={closeMenu}
                                    >
                                        <span className={styles.mobileIcon}>{link.icon}</span>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;
