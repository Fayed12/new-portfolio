// local
import styles from './experience.module.css';

// react
import { useEffect, useRef } from 'react';

// gsap
import { gsap } from 'gsap';

// react icons
import { FiCheckCircle, FiAward } from 'react-icons/fi';

const EXPERIENCE_DATA = [
    {
        id: 1,
        type: "Education",
        title: "B.Sc. Computer Science",
        date: "Oct 2022 - Present",
        description: "Tanta University, Faculty of Computers & Information. Final Year.",
        pills: ["Data Structures", "Web Dev", "Software Eng", "HCI"],
        icon: FiAward,
        progress: { label: "Degree Progress", value: "95%" },
        side: "left",
    },
    {
        id: 2,
        type: "Certification",
        title: "MEAN Stack Overview",
        date: null,
        description: "Comprehensive full-stack JavaScript architecture and deployment strategies.",
        pills: ["MongoDB", "Express.js", "Angular", "Node.js"],
        icon: FiAward,
        progress: null,
        side: "right",
    },
    {
        id: 3,
        type: "Certification",
        title: "NTI Web Design",
        date: null,
        description: "Foundational web development course focusing on core modern standards.",
        pills: ["HTML", "CSS3", "JavaScript"],
        icon: FiCheckCircle,
        progress: null,
        side: "left",
    },
];

const Experience = () => {
    const mainRef = useRef(null);
    const cardRefs = useRef([]);
    const dotRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate cards popping in with stagger
            if (cardRefs.current.length > 0) {
                gsap.fromTo(
                    cardRefs.current,
                    { scale: 0.85, opacity: 0, y: 30 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "back.out(1.5)",
                        clearProps: "all",
                    }
                );
            }

            // Animate dots pulsing in
            if (dotRefs.current.length > 0) {
                gsap.fromTo(
                    dotRefs.current,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.15,
                        ease: "back.out(2)",
                        delay: 0.2,
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
                <span className={styles.overline}>— 04 / EXPERIENCE</span>
                <h1 className={styles.title}>Experience & Education</h1>
                <p className={styles.subtitle}>
                    My academic journey and professional milestones, mapped in the void.
                </p>
            </div>

            {/* Timeline */}
            <div className={styles.timeline}>
                {EXPERIENCE_DATA.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div
                            key={item.id}
                            className={`${styles.timelineItem} ${styles[item.side]}`}
                        >
                            {/* Dot on the central line */}
                            <div
                                className={styles.timelineDot}
                                ref={el => dotRefs.current[index] = el}
                            ></div>

                            {/* Card */}
                            <div className={styles.timelineCard}>
                                <div
                                    className={styles.card}
                                    ref={el => cardRefs.current[index] = el}
                                >
                                    {/* Header row */}
                                    <div className={styles.cardHeader}>
                                        <span className={styles.cardBadge}>{item.type}</span>
                                        {item.date && (
                                            <span className={styles.cardDate}>{item.date}</span>
                                        )}
                                        {!item.date && (
                                            <IconComponent className={styles.cardIcon} />
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className={styles.cardTitle}>{item.title}</h3>

                                    {/* Description */}
                                    <p className={styles.cardDesc}>{item.description}</p>

                                    {/* Pills */}
                                    <div className={styles.cardPills}>
                                        {item.pills.map((pill, i) => (
                                            <span key={i} className={styles.pill}>{pill}</span>
                                        ))}
                                    </div>

                                    {/* Progress bar (only for education) */}
                                    {item.progress && (
                                        <div className={styles.progressContainer}>
                                            <span className={styles.progressLabel}>{item.progress.label}</span>
                                            <span className={styles.progressValue}>{item.progress.value}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default Experience;
