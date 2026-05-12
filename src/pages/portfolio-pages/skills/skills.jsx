// local
import styles from './skills.module.css';
import MainButton from "../../../components/ui/button/MainButton";

// react
import { useState, useEffect, useRef } from 'react';

// gsap
import { gsap } from 'gsap';

// icons (using standard Si and Fi icons)
import {
    SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss, SiTailwindcss,
    SiRedux, SiReactrouter, SiSupabase, SiFirebase, SiAxios, SiJson,
    SiGit, SiGithub, SiVite, SiNpm, SiGooglechrome
} from "react-icons/si";
import { FiLayout, FiServer, FiCpu, FiCommand } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";

const SKILLS_DATA = [
    // Frontend
    { name: "React.js", category: "Frontend", icon: SiReact },
    { name: "JavaScript (ES6+)", category: "Frontend", icon: SiJavascript },
    { name: "TypeScript", category: "Frontend", icon: SiTypescript },
    { name: "HTML5", category: "Frontend", icon: SiHtml5 },
    { name: "CSS3", category: "Frontend", icon: SiCss},
    { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss },
    { name: "Redux-toolkit", category: "Frontend", icon: SiRedux },
    { name: "Context API", category: "Frontend", icon: SiReact },
    { name: "React Router", category: "Frontend", icon: SiReactrouter },
    { name: "TanStack Query", category: "Frontend", icon: SiReact },
    { name: "React Hooks", category: "Frontend", icon: SiReact },
    { name: "Responsive Design", category: "Frontend", icon: FiLayout },

    // Backend & DB
    { name: "Supabase", category: "Backend & DB", icon: SiSupabase },
    { name: "Firebase", category: "Backend & DB", icon: SiFirebase },
    { name: "RESTful APIs", category: "Backend & DB", icon: FiServer },
    { name: "Fetch / Axios", category: "Backend & DB", icon: SiAxios },
    { name: "JSON", category: "Backend & DB", icon: SiJson },

    // Tools & Others
    { name: "Git", category: "Tools & Others", icon: SiGit },
    { name: "GitHub", category: "Tools & Others", icon: SiGithub },
    { name: "Vite", category: "Tools & Others", icon: SiVite },
    { name: "npm", category: "Tools & Others", icon: SiNpm },
    { name: "VS Code", category: "Tools & Others", icon: VscVscode },
    { name: "Chrome DevTools", category: "Tools & Others", icon: SiGooglechrome },
    { name: "AI Tools", category: "Tools & Others", icon: FiCpu },
    { name: "Google Antigravity", category: "Tools & Others", icon: FiCommand },
];

const MARQUEE_ITEMS = [
    "Vite", "REST APIs", "React", "TypeScript", "JavaScript", "Tailwind", "Redux", "Firebase", "Supabase"
];

const CATEGORIES = ["Frontend", "Backend & DB", "Tools & Others"];

const Skills = () => {
    const [activeTab, setActiveTab] = useState("Frontend");
    
    const mainRef = useRef(null);
    const cardsRef = useRef([]);

    // Filter skills based on active tab
    const filteredSkills = SKILLS_DATA.filter(skill => skill.category === activeTab);

    useEffect(() => {
        // Animate cards on mount or tab change
        if (cardsRef.current.length > 0) {
            gsap.fromTo(
                cardsRef.current,
                { scale: 0.8, opacity: 0, y: 20 },
                { 
                    scale: 1, 
                    opacity: 1, 
                    y: 0,
                    duration: 0.5, 
                    stagger: 0.05, 
                    ease: "back.out(1.5)",
                    clearProps: "all" 
                }
            );
        }
    }, [activeTab]);

    // Infinite Marquee logic - duplicating array for seamless scrolling
    const marqueeDisplay = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

    return (
        <main className={styles.container} ref={mainRef}>
            {/* Header */}
            <div className={styles.header}>
                <span className={styles.overline}>— 02 / TECHNICAL ARSENAL</span>
                <h1 className={styles.title}>Skills & Tools</h1>
                <div className={styles.titleLine}></div>
            </div>

            {/* Segmented Tabs */}
            <div className={styles.tabsContainer}>
                {CATEGORIES.map(category => (
                    <MainButton 
                        key={category}
                        action={activeTab === category ? "primary" : "ghost"}
                        size="sm"
                        clickEvent={() => setActiveTab(category)}
                    >
                        {category}
                    </MainButton>
                ))}
            </div>

            {/* Skills Grid */}
            <div className={styles.skillsGrid}>
                {filteredSkills.map((skill, index) => {
                    const IconComponent = skill.icon;
                    return (
                        <div 
                            key={`${skill.name}-${index}`}
                            className={styles.skillCard}
                            ref={el => cardsRef.current[index] = el}
                        >
                            <IconComponent className={styles.skillIcon} />
                            <span className={styles.skillName}>{skill.name}</span>
                        </div>
                    );
                })}
            </div>

            {/* Marquee */}
            <div className={styles.marqueeWrapper}>
                <div className={styles.marqueeContent}>
                    {marqueeDisplay.map((item, index) => (
                        <div key={index} className={styles.marqueeItem}>
                            {item}
                            <span className={styles.marqueeSeparator}>♦</span>
                        </div>
                    ))}
                </div>
            </div>

        </main>
    );
};

export default Skills;
