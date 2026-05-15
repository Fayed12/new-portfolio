// local
import styles from './gitHub.module.css';
import MainButton from '../../../components/ui/button/MainButton';
import useGitHubData from '../../../hooks/gitHubDataHook';

// react
import { useEffect, useRef } from 'react';

// gsap
import { gsap } from 'gsap';

// icons
import {
    FiGithub,
    FiStar,
    FiUsers,
    FiBook,
    FiActivity,
    FiGitBranch
} from 'react-icons/fi';

const Github = () => {
    const { profileData, isLoading } = useGitHubData() || {};

    const mainRef = useRef(null);
    const headerRef = useRef(null);
    const profileRef = useRef(null);
    const statsRefs = useRef([]);
    const heatRef = useRef(null);
    const reposRefs = useRef([]);

    // Animations when data loads
    useEffect(() => {
        if (!isLoading && profileData && mainRef.current) {
            const ctx = gsap.context(() => {
                // Header
                gsap.fromTo(headerRef.current,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                );

                // Profile
                gsap.fromTo(profileRef.current,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)", delay: 0.2 }
                );

                // Stats Cards
                if (statsRefs.current.length > 0) {
                    gsap.fromTo(statsRefs.current,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.4 }
                    );
                }

                // Heatmap
                gsap.fromTo(heatRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.8 }
                );

                // Pinned Repos
                if (reposRefs.current.length > 0) {
                    gsap.fromTo(reposRefs.current,
                        { opacity: 0, scale: 0.95 },
                        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)", delay: 1 }
                    );
                }
            }, mainRef);

            return () => ctx.revert();
        }
    }, [isLoading, profileData]);

    if (isLoading) {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.loaderText}>LOADING GITHUB DATA...</div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.loaderText}>FAILED TO LOAD DATA</div>
            </div>
        );
    }

    const { profile, stats, contributionGraph, pinnedRepos } = profileData;

    // Helper function to get neon color class for heatmap
    const getHeatmapClass = (count) => {
        if (count === 0) return '';
        if (count >= 1 && count <= 3) return styles.cellLevel1;
        if (count >= 4 && count <= 6) return styles.cellLevel2;
        if (count >= 7 && count <= 9) return styles.cellLevel3;
        return styles.cellLevel4;
    };

    return (
        <main className={styles.container} ref={mainRef}>
            {/* Header */}
            <div className={styles.header} ref={headerRef}>
                <span className={styles.overline}>— 05 / OPEN SOURCE</span>
                <h1 className={styles.title}>GitHub <span>Stats</span></h1>
                <p className={styles.subtitle}>
                    A real-time overview of my open-source contributions, repositories, and development activity pulled directly via GitHub GraphQL API.
                </p>
            </div>

            {/* Profile Section */}
            <div className={styles.profileSection} ref={profileRef}>
                <div className={styles.avatarContainer}>
                    <img src={profile?.avatar} alt={profile?.username} className={styles.avatar} />
                </div>
                <h2 className={styles.profileName}>{profile?.name}</h2>
                <h3 className={styles.profileUserName}>@{profile?.username}</h3>
                {profile?.bio && <p className={styles.profileBio}>{profile?.bio}</p>}

                <MainButton
                    action="ghost"
                    size="md"
                    href={profile?.githubUrl}
                    style={{ marginTop: 'var(--space-2)' }}
                >
                    <FiGithub /> Visit GitHub Profile
                </MainButton>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard} ref={el => statsRefs.current[0] = el}>
                    <FiBook className={styles.statIcon} />
                    <span className={styles.statValue}>{stats?.repos}</span>
                    <span className={styles.statLabel}>Repositories</span>
                </div>
                <div className={styles.statCard} ref={el => statsRefs.current[1] = el}>
                    <FiStar className={styles.statIcon} />
                    <span className={styles.statValue}>{stats?.totalStars}</span>
                    <span className={styles.statLabel}>Total Stars</span>
                </div>
                <div className={styles.statCard} ref={el => statsRefs.current[2] = el}>
                    <FiActivity className={styles.statIcon} />
                    <span className={styles.statValue}>{stats?.totalContributions}</span>
                    <span className={styles.statLabel}>Contributions</span>
                </div>
                <div className={styles.statCard} ref={el => statsRefs.current[3] = el}>
                    <FiUsers className={styles.statIcon} />
                    <span className={styles.statValue}>{stats?.followers}</span>
                    <span className={styles.statLabel}>Followers</span>
                </div>
            </div>

            {/* Contribution Heatmap */}
            <div className={styles.heatmapSection} ref={heatRef}>
                <h3 className={styles.sectionTitle}>Annual Contributions</h3>
                <div className={styles.heatMapScroll}>
                    <div className={styles.heatmapGrid}>
                        {contributionGraph?.map((week, weekIndex) => (
                            <div key={weekIndex} className={styles.heatmapColumn}>
                                {week?.contributionDays?.map((day, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        className={`${styles.heatmapCell} ${getHeatmapClass(day?.contributionCount)}`}
                                        title={`${day?.contributionCount} contributions on ${day?.date}`}
                                    ></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pinned Repositories */}
            <div className={styles.reposSection}>
                <h3 className={styles.sectionTitle}>Pinned Repositories</h3>
                <div className={styles.reposGrid}>
                    {pinnedRepos?.map((repo, index) => (
                        <a
                            key={repo?.id}
                            href={repo?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.repoCard}
                            ref={el => reposRefs.current[index] = el}
                        >
                            <div className={styles.repoHeader}>
                                <h4 className={styles.repoName}>
                                    <FiBook className={styles.repoNameIcon} />
                                    {repo?.name}
                                </h4>
                            </div>

                            <p className={styles.repoDesc}>{repo?.description || "No description provided."}</p>

                            <div className={styles.repoFooter}>
                                <div className={styles.repoLang}>
                                    <span
                                        className={styles.langColor}
                                        style={{ backgroundColor: repo?.primaryLanguage?.color || '#cfbcff' }}
                                    ></span>
                                    {repo?.primaryLanguage?.name || 'Unknown'}
                                </div>
                                <div className={styles.repoStats}>
                                    <div className={styles.repoStat}>
                                        <FiStar /> {repo?.stargazerCount}
                                    </div>
                                    <div className={styles.repoStat}>
                                        <FiGitBranch /> {repo?.forkCount}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Github;
