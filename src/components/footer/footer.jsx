// local
import styles from "./footer.module.css";

// react
import { useEffect, useRef } from "react";

// gsap
import { gsap } from "gsap";

// react icons
import { FiGithub, FiLinkedin, FiInstagram, FiFacebook } from "react-icons/fi";

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const ref = footerRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    gsap.fromTo(
                        ref,
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
                    );
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref) observer.observe(ref);

        return () => {
            if (ref) observer.disconnect();
        };
    }, []);

    return (
        <footer className={styles.footer} ref={footerRef}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.brand}>
                        <img src="/logo1.png" alt="Logo" className={styles.logo} />
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <p className={styles.copyright}>
                        &copy; 2026, all right reserved by mohamed fayed
                    </p>

                    <div className={styles.socialIcons}>
                        <a href="https://github.com/Fayed12" className={styles.socialLink} aria-label="Github" target="_blank">
                            <FiGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/mohamed-fayed-b27928256/" className={styles.socialLink} aria-label="LinkedIn" target="_blank">
                            <FiLinkedin />
                        </a>
                        <a href="https://www.facebook.com/share/1736tFPS3m/" className={styles.socialLink} aria-label="Facebook" target="_blank">
                            <FiFacebook />
                        </a>
                        <a href="https://www.instagram.com/fayed1_?igsh=bjB1b2wyZWExODAz" className={styles.socialLink} aria-label="Instagram" target="_blank">
                            <FiInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
