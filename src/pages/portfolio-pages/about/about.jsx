// local
import styles from "./about.module.css";

// react
import { useEffect, useRef, useState, useCallback } from "react";

// react router
import { useNavigate } from "react-router";

// react icons
import {
    FiMapPin,
    FiCloud,
    FiCode,
    FiZap,
    FiMonitor,
    FiSettings,
    FiGitCommit,
    FiSend,
    FiPackage,
    FiPenTool
} from "react-icons/fi";

// gsap
import { gsap } from "gsap";

export default function About() {
    const navigate = useNavigate();
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Refs for animations
    const mainRef = useRef(null);
    const popRefs = useRef([]);
    const staggerRefs = useRef([]);
    const flashRef = useRef(null);

    const addToPopRefs = (el) => {
        if (el && !popRefs.current.includes(el)) {
            popRefs.current.push(el);
        }
    };

    const addToStaggerRefs = (el) => {
        if (el && !staggerRefs.current.includes(el)) {
            staggerRefs.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Popping animation for the left column items
            gsap.fromTo(
                popRefs.current,
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }
            );

            // Slide up and fade in for the right column items
            gsap.fromTo(
                staggerRefs.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.2
                }
            );
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const triggerTransition = useCallback(() => {
        setIsTransitioning(true);
        if (flashRef.current) {
            gsap.to(flashRef.current, {
                width: "250vw",
                height: "250vw",
                duration: 0.7,
                ease: "power2.in",
                onComplete: () => {
                    setTimeout(() => {
                        navigate("/skills");
                        window.scrollTo(0, 0);
                    }, 200);
                }
            });
        }
    }, [navigate]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;

            if (scrollTop + viewportHeight >= pageHeight - 5 && !isTransitioning) {
                triggerTransition();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isTransitioning, triggerTransition]);

    return (
        <main className={styles.container} ref={mainRef}>
            {/* Flash overlay for transition */}
            <div className={styles.flashOverlay} ref={flashRef}></div>

            <div className={styles.contentWrapper}>

                {/* --- Left Column --- */}
                <div className={styles.leftColumn}>
                    {/* Profile Image */}
                    <div className={styles.imageContainer} ref={addToPopRefs}>
                        <img
                            src="/profile.png"
                            alt="Mohamed Fayed"
                            className={styles.profileImage}
                        />
                    </div>

                    {/* Location Badge */}
                    <div className={styles.locationBadge} ref={addToPopRefs}>
                        <FiMapPin className={styles.locationIcon} /> Damanhour, Egypt 🇪🇬
                    </div>

                    {/* Stats */}
                    <div className={styles.statCard} ref={addToPopRefs}>
                        <span className={styles.statLabel}>Projects Built</span>
                        <span className={styles.statValue}>15+</span>
                    </div>

                    <div className={styles.statCard} ref={addToPopRefs}>
                        <span className={styles.statLabel}>Certs Earned</span>
                        <span className={styles.statValue}>2</span>
                    </div>

                    <div className={styles.statCard} ref={addToPopRefs}>
                        <span className={styles.statLabel}>CS Student</span>
                        <span className={styles.statValueSmall}>Final Year</span>
                    </div>

                    {/* Languages */}
                    <div className={styles.languagesCard} ref={addToPopRefs}>
                        <div className={styles.languagesTitle}>LANGUAGES</div>
                        <div className={styles.languageRow}>
                            <div className={styles.languageName}>Arabic 🇪🇬</div>
                            <div className={styles.languageLevel}>Native</div>
                        </div>
                        <div className={styles.languageRow}>
                            <div className={styles.languageName}>English 🇬🇧</div>
                            <div className={styles.languageLevel}>Proficient</div>
                        </div>
                    </div>
                </div>

                {/* --- Right Column --- */}
                <div className={styles.rightColumn}>

                    {/* Header */}
                    <div className={styles.headerSection} ref={addToStaggerRefs}>
                        <span className={styles.overline}>— 01 / ABOUT ME</span>
                        <h1 className={styles.title}>The Engineer Behind the Code</h1>
                        <div className={styles.bio}>
                            <p>
                                I am a final-year Computer Science student at Tanta University, specializing in the react.js. My journey into full-stack development is driven by a profound fascination with building scalable, high-performance web applications from the ground up.
                            </p>
                            <p>
                                Operating at the intersection of robust logic and pixel-perfect frontend interfaces. my profile isn't just a visual style; it reflects my approach to engineering—cutting through the noise to deliver clean, efficient, and technically sound solutions.
                            </p>
                        </div>
                    </div>

                    {/* What I Bring */}
                    <div className={styles.sectionBlock} ref={addToStaggerRefs}>
                        <div className={styles.sectionTitle}>WHAT I BRING</div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIconBox}><FiCloud /></div>
                            <div className={styles.featureContent}>
                                <div className={styles.featureTitle}>Performance First</div>
                                <div className={styles.featureDesc}>Optimizing React renders for sub-second responses.</div>
                            </div>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIconBox}><FiCode /></div>
                            <div className={styles.featureContent}>
                                <div className={styles.featureTitle}>Clean Code</div>
                                <div className={styles.featureDesc}>Writing modular, maintainable React.js applications following clean code.</div>
                            </div>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIconBox}><FiZap /></div>
                            <div className={styles.featureContent}>
                                <div className={styles.featureTitle}>Fast Learner</div>
                                <div className={styles.featureDesc}>Adapting quickly to new technologies, tools, and complex engineering challenges.</div>
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div className={styles.sectionBlock} ref={addToStaggerRefs}>
                        <div className={styles.sectionTitle}>EDUCATION</div>
                        <div className={styles.eduCard}>
                            <div className={styles.eduHeader}>
                                <div>
                                    <h3 className={styles.eduTitle}>Tanta University</h3>
                                    <div className={styles.eduSubtitle}>B.Sc. Computer Science</div>
                                </div>
                                <div className={styles.eduDate}>Oct 2022 - Present</div>
                            </div>
                            <div className={styles.eduPills}>
                                <span className={styles.pill}>Data Structures</span>
                                <span className={styles.pill}>Algorithms</span>
                                <span className={styles.pill}>Database Systems</span>
                                <span className={styles.pill}>Software Engineering</span>
                                <span className={styles.pill}>Object-Oriented Programming</span>
                                <span className={styles.pill}>Operating Systems</span>
                                <span className={styles.pill}>Computer Networks</span>
                                <span className={styles.pill}>Web Development</span>
                                <span className={styles.pill}>Artificial Intelligence</span>
                                <span className={styles.pill}>Machine Learning</span>
                            </div>
                        </div>
                    </div>

                    {/* Tools */}
                    <div className={styles.sectionBlock} ref={addToStaggerRefs}>
                        <div className={styles.sectionTitle}>MY DAILY TOOLS</div>
                        <div className={styles.toolsList}>
                            <div className={styles.toolChip}><FiMonitor /> VS Code</div>
                            <div className={styles.toolChip}><FiSettings /> DevTools</div>
                            <div className={styles.toolChip}><FiGitCommit /> Git</div>
                            <div className={styles.toolChip}><FiSend /> Postman</div>
                            <div className={styles.toolChip}><FiPackage /> npm</div>
                            <div className={styles.toolChip}><FiZap /> Vite</div>
                            <div className={styles.toolChip}><FiPenTool /> Figma</div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <span className={styles.scrollText}>SCROLL TO EXPLORE SKILLS</span>
                <div className={styles.scrollLine}></div>
            </div>
        </main>
    );
}
