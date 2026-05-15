// local
import styles from './projects.module.css';
import MainButton from '../../../components/ui/button/MainButton';

// react
import { useEffect, useRef } from 'react';

// gsap
import { gsap } from 'gsap';

// icons
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const PROJECTS_DATA = [
    {
        id: 1,
        title: "Planora",
        description: "Planora is a full-stack, real-time task and project management web application. It enables individuals and teams to plan, prioritize, collaborate, and track work with granular access control, insightful statistics, and a beautiful, fully responsive U",
        image: "/projects/planora.png",
        tech: ["react.js", "vite 7", "Redux Toolkit", "firebase", "React Router 7", "Axios", "React Hook Form"],
        github: "https://github.com/Fayed12/planora-task-management-app",
        demo: "https://planora-task-management-app.vercel.app/",
    },
    {
        id: 2,
        title: "Zikry",
        description: "A comprehensive Islamic supplications manager designed for daily reflection. Features a clean, distraction-free interface with complex state management for tracking routines.",
        image: "/projects/zikry.png",
        tech: ["React.js", "Redux Toolkit", "supabase.js", "react-hook-form", "sweetalert2", "react-router"],
        github: "https://github.com/Fayed12/Zikry",
        demo: "https://zikry1.netlify.app/",
    },
    {
        id: 3,
        title: "FoodHub",
        description: "A high-performance restaurant e-commerce platform. Built with robust form validation and seamless checkout flows for optimal user conversion.",
        image: "/projects/foodHub.png",
        tech: ["React", "emailjs", "dotlottie-react", "Axios", "React Router", "Redux Toolkit", "React Hook Form"],
        github: "https://github.com/Fayed12/react-mastery-lab-55-projects/tree/main/project-11-ecommerce-website-app",
        demo: "",
    },
    {
        id: 4,
        title: "Cineverse",
        description: "A rapid movie discovery engine leveraging TMDB API. Engineered with Vite for lightning-fast HMR and Firebase for robust user authentication and watchlist storage.",
        image: "/projects/movi.png",
        tech: ["react.js", "firebase", "react-router", "vite 7", "axios", "react hook form", "MUI"],
        github: "https://github.com/Fayed12/react-mastery-lab-55-projects/tree/main/project-13-movie-cineverse-app",
        demo: "",
    },
    {
        id: 5,
        title: "SparkChat",
        description: "A low-latency, real-time messaging application. Implements complex data synchronization across clients using Firebase Realtime Database and custom presence hooks.",
        image: "/projects/chat-app.png",
        tech: ["react.js", "emailjs", "firebase", "react-router", "axios", "react hook form"],
        github: "https://github.com/Fayed12/react-mastery-lab-55-projects/tree/main/project-12-chat-application",
        demo: "",
    }
];

const Projects = () => {
    const mainRef = useRef(null);
    const headerRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );

            // Cards staggered entrance
            if (cardRefs.current.length > 0) {
                gsap.fromTo(
                    cardRefs.current,
                    { scale: 0.9, opacity: 0, y: 50 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "back.out(1.2)",
                        delay: 0.2,
                        clearProps: "all"
                    }
                );
            }
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className={styles.container} ref={mainRef}>
            {/* Header */}
            <div className={styles.header} ref={headerRef}>
                <span className={styles.overline}>— 03 / PROJECTS</span>
                <h1 className={styles.title}>Top <span>Projects</span></h1>
                <p className={styles.subtitle}>
                    Architecting digital experiences across the stack. A selection of recent builds emphasizing performance, scalability, and precise UI execution.
                </p>
            </div>

            {/* Projects Grid */}
            <div className={styles.grid}>
                {PROJECTS_DATA.map((project, index) => (
                    <div
                        key={project.id}
                        className={styles.card}
                        ref={el => cardRefs.current[index] = el}
                    >
                        {/* Image Section */}
                        <div className={styles.imageWrapper}>
                            <img
                                src={project.image}
                                alt={`${project.title} Preview`}
                                className={styles.cardImage}
                                loading="lazy"
                            />
                        </div>

                        {/* Content Section */}
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{project.title}</h3>
                                <div className={styles.techList}>
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className={styles.techPill}>{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <p className={styles.cardDesc}>{project.description}</p>

                            {/* Actions Section */}
                            <div className={styles.cardActions}>
                                <div className={styles.actionBtnWrapper}>
                                    <MainButton
                                        action="outline"
                                        size="md"
                                        href={project.github}
                                        className={styles.fullWidthBtn}
                                    >
                                        <FiGithub /> GitHub Code
                                    </MainButton>
                                </div>
                                {
                                    project.demo && (
                                        <div className={styles.actionBtnWrapper}>
                                            <MainButton
                                                action="primary"
                                                size="md"
                                                href={project.demo}
                                                className={styles.fullWidthBtn}
                                            >
                                                <FiExternalLink /> Live Demo
                                            </MainButton>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.allProjectsWrapper}>
                <MainButton
                    action="danger"
                    size="lg"
                    href="https://github.com/Fayed12?tab=repositories"
                >
                    SEE ALL PROJECTS ON GITHUB <FiExternalLink style={{ marginLeft: '8px' }} />
                </MainButton>
            </div>
        </main>
    );
};

export default Projects;
