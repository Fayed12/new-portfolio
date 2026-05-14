// local
import styles from './certifications.module.css';

// react
import { useEffect, useRef } from 'react';

// gsap
import { gsap } from 'gsap';

// react icons
import {FiLayout, FiDatabase } from 'react-icons/fi';

const CERT_DATA = [
    {
        id: 1,
        title: "Web Design",
        image: "/web.png",
        icon: FiLayout,
        description: "Completed a web development course at NTI, gaining hands-on experience in HTML, CSS, and JavaScript, and building foundational skills for creating responsive and interactive web interfaces.",
        skills: ["HTML", "CSS3", "JS"]
    },
    {
        id: 2,
        title: "MEAN Stack",
        image: "/mean.png",
        icon: FiDatabase,
        description: "Attended a short MEAN Stack course to gain an overview of web development frameworks and concepts. Acquired foundational knowledge in MongoDB, Express.js, Angular, Node.js, and general web development principles.",
        skills: ["MongoDB", "Express.js", "Angular", "Node.js", "Web Dev Principles"]
    }
];

const Certifications = () => {
    const mainRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (cardRefs.current.length > 0) {
                gsap.fromTo(
                    cardRefs.current,
                    { scale: 0.9, opacity: 0, y: 40 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out",
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
            <div className={styles.header}>
                <span className={styles.overline}>— 06 / CONTINUOUS LEARNING</span>
                <h1 className={styles.title}>Certifications & Courses</h1>
                <p className={styles.subtitle}>
                    Expanding my technical arsenal through dedicated coursework and professional training.
                </p>
            </div>

            {/* Grid */}
            <div className={styles.grid}>
                {CERT_DATA.map((cert, index) => {
                    const IconComponent = cert.icon;
                    return (
                        <div 
                            key={cert.id} 
                            className={styles.card}
                            ref={el => cardRefs.current[index] = el}
                        >
                            {/* Image */}
                            <div className={styles.imageWrapper}>
                                <img src={cert.image} alt={cert.title} className={styles.cardImage} />
                                <div className={styles.imageOverlay}></div>
                            </div>

                            {/* Content */}
                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.cardTitle}>{cert.title}</h3>
                                    <IconComponent className={styles.cardIcon} />
                                </div>
                                
                                <p className={styles.cardDesc}>{cert.description}</p>
                                
                                {/* Skills */}
                                <div className={styles.skillsContainer}>
                                    <span className={styles.skillsLabel}>Skills Acquired:</span>
                                    <div className={styles.skillsList}>
                                        {cert.skills.map((skill, i) => (
                                            <span key={i} className={styles.skillPill}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default Certifications;
