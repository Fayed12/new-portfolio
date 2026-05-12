// local
import styles from "./home.module.css";
import MainButton from "../../../components/ui/button/MainButton";

// react
import { useCallback, useEffect, useRef, useState } from "react";

// react router
import { useNavigate } from "react-router";

// react icons
import { FiCode, FiBriefcase, FiMail, FiTerminal, FiDatabase } from "react-icons/fi";

// gsap
import { gsap } from "gsap";

export default function Home() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs for animations
  const mainRef = useRef(null);
  const leftContentRefs = useRef([]);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const orbitIconsRef = useRef([]);
  const flashRef = useRef(null);

  const addToLeftRefs = (el) => {
    if (el && !leftContentRefs.current.includes(el)) {
      leftContentRefs.current.push(el);
    }
  };

  const addToOrbitRefs = (el) => {
    if (el && !orbitIconsRef.current.includes(el)) {
      orbitIconsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Initial entry animations
    const ctx = gsap.context(() => {
      // Fade in left content staggered
      gsap.fromTo(
        leftContentRefs.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Orbiting rings animation (rotate)
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "linear"
      });
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 60,
        repeat: -1,
        ease: "linear"
      });

      // Orbital icons animation: rotation and scaling (growing/shrinking)
      orbitIconsRef.current.forEach((icon, index) => {
        // Determine direction based on index
        const direction = index % 2 === 0 ? 1 : -1;

        // Continuous rotation around center
        gsap.to(icon, {
          rotation: 360 * direction,
          duration: 20 + index * 5,
          repeat: -1,
          ease: "linear"
        });

        // Pulsing scale effect
        gsap.to(icon.children[0], {
          scale: 1.3,
          duration: 1.5 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Counter-rotate the inner icon so it stays upright
        gsap.to(icon.children[0], {
          rotation: -360 * direction,
          duration: 20 + index * 5,
          repeat: -1,
          ease: "linear"
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const triggerTransition = useCallback(() => {
    setIsTransitioning(true);
    if (flashRef.current) {
      // Beautiful flashing/expansion effect covering screen
      gsap.to(flashRef.current, {
        width: "250vw",
        height: "250vw",
        duration: 0.8,
        ease: "power2.in",
        onComplete: () => {
          // Slight delay before navigation for effect to settle
          setTimeout(() => {
            navigate("/about");
            // Reset scroll so next page starts at top
            window.scrollTo(0, 0);
          }, 200);
        }
      });
    }
  }, [navigate]);

  // Scroll detection for transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Trigger when hitting bottom
      if (scrollTop + viewportHeight >= pageHeight - 5 && !isTransitioning) {
        triggerTransition();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTransitioning, triggerTransition]);

  // handle download file
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Mohamed-fayed-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className={styles.main} ref={mainRef}>
      {/* Flash overlay for transition */}
      <div className={styles.flashOverlay} ref={flashRef}></div>

      <div className={styles.contentWrapper}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.badge} ref={addToLeftRefs}>
            <div className={styles.dot}></div>
            Available for Work
          </div>

          <div ref={addToLeftRefs}>
            <p className={styles.greeting}>Hello World, I'm</p>
            <h1 className={styles.name}>Mohamed Fayed</h1>
          </div>

          <div className={styles.roleWrapper} ref={addToLeftRefs}>
            I build
            <div className={styles.roleHighlight}>
              React Applications
              <span className={styles.cursor}></span>
            </div>
          </div>

          <p className={styles.description} ref={addToLeftRefs}>
            Final-year CS student at Tanta University — crafting high-
            performance React applications and stepping into the full MERN
            stack world.
          </p>

          <div className={styles.actions} ref={addToLeftRefs}>
            <MainButton size="md" action="primary" clickEvent={() => navigate("/projects")}>Explore My Work</MainButton>
            <MainButton size="md" action="outline" clickEvent={() => handleDownload()}>Download CV</MainButton>
          </div>

          <div className={styles.socialLinks} ref={addToLeftRefs}>
            <a href="#" className={styles.socialBtn} aria-label="Code">
              <FiCode />
            </a>
            <a href="#" className={styles.socialBtn} aria-label="Experience">
              <FiBriefcase />
            </a>
            <a href="#" className={styles.socialBtn} aria-label="Email">
              <FiMail />
            </a>
            <a href="#" className={styles.socialBtn} aria-label="Projects">
              <FiTerminal />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <div className={styles.orbitalContainer}>
            {/* Rings */}
            <div className={`${styles.ring} ${styles.ring1}`} ref={ring1Ref}></div>
            <div className={`${styles.ring} ${styles.ring2}`} ref={ring2Ref}></div>

            {/* Orbit Icons */}
            <div className={styles.orbitIconWrapper} ref={addToOrbitRefs}>
              <div className={`${styles.orbitIcon} ${styles.icon1}`}>
                <FiCode />
              </div>
            </div>
            <div className={styles.orbitIconWrapper} ref={addToOrbitRefs}>
              <div className={`${styles.orbitIcon} ${styles.icon2}`}>
                <FiDatabase />
              </div>
            </div>
            <div className={styles.orbitIconWrapper} ref={addToOrbitRefs}>
              <div className={`${styles.orbitIcon} ${styles.icon3}`}>
                <FiTerminal />
              </div>
            </div>

            {/* Profile Image */}
            <div className={styles.profileImageContainer}>
              <img
                src="/profile.png"
                alt="Mohamed Fayed"
                className={styles.profileImage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
        <div className={styles.scrollLine}></div>
      </div>
    </main>
  );
}