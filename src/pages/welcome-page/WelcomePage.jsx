// local
import MainButton from "../../components/ui/button/MainButton";
import styles from "./WelcomePage.module.css";

// react
import { useEffect, useRef } from "react";

// react router
import { useNavigate } from "react-router";

// gsap
import gsap from "gsap";

// icons
import {
  RiArrowRightLine,
  RiCodeSSlashLine,
  RiGithubLine,
  RiLinkedinLine,
  RiMailLine,
  RiSparklingLine,
} from "react-icons/ri";

const SKILLS = ["React", "TypeScript", "JavaScript", "GSAP", "UI/UX", "Tailwind CSS", "CSS3", "HTML5", "redux-toolkit", "tan-stack-query", "material-ui"];
const SOCIAL = [
  { icon: RiGithubLine, href: "https://github.com/Fayed12", label: "GitHub" },
  { icon: RiLinkedinLine, href: "https://www.linkedin.com/in/mohamed-fayed-b27928256/", label: "LinkedIn" },
  { icon: RiMailLine, href: "mailto:mohamedfaye12d@gmail.com", label: "Email" },
];
const WORDS = ["Frontend", "Developer", "&", "UI", "Designer"];

// component
export default function WelcomePage() {
  // hooks
  const navigate = useNavigate();

  // refs
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const chipsRef = useRef(null);
  const cardRef = useRef(null);
  const cursorRef = useRef(null);
  const orbRef = useRef(null);
  const sparkleRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Pre-set all animated elements to their FROM state
      gsap.set(badgeRef.current, { y: -30, opacity: 0, scale: 0.8 });
      gsap.set(headlineRef.current?.querySelectorAll(".word") ?? [], { y: 80, opacity: 0 });
      gsap.set(subRef.current, { y: 30, opacity: 0 });
      gsap.set(Array.from(ctaRef.current?.children ?? []), { y: 30, opacity: 0, scale: 0.9 });
      gsap.set(Array.from(chipsRef.current?.children ?? []), { x: -20, opacity: 0 });
      gsap.set(Array.from(socialRef.current?.children ?? []), { y: 20, opacity: 0 });
      gsap.set(cardRef.current, { x: 80, opacity: 0 });

      // Animate TO final state
      tl.to(badgeRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(2)" })
        .to(headlineRef.current?.querySelectorAll(".word") ?? [], { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "expo.out" }, "-=0.4")
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .to(Array.from(ctaRef.current?.children ?? []), { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.7, ease: "back.out(1.6)" }, "-=0.4")
        .to(Array.from(chipsRef.current?.children ?? []), { x: 0, opacity: 1, stagger: 0.06, duration: 0.5 }, "-=0.4")
        .to(Array.from(socialRef.current?.children ?? []), { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, "-=0.3")
        .to(cardRef.current, { x: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=1.2");

      gsap.to(orbRef.current, { rotation: 360, duration: 20, ease: "none", repeat: -1, transformOrigin: "center center" });
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.55, ease: "steps(1)", repeat: -1, yoyo: true });
      gsap.to(cardRef.current, { y: -18, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true });

      sparkleRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { scale: 0, opacity: 0, rotation: 0 },
          { scale: 1, opacity: 1, rotation: 360, duration: 0.5, ease: "back.out(2)", delay: 1.5 + i * 0.4, yoyo: true, repeat: -1, repeatDelay: 2.5 }
        );
      });
    }, containerRef);

    const handleMouse = (e) => {
      const { innerWidth: W, innerHeight: H } = window;
      const rx = (e.clientY / H - 0.5) * 14;
      const ry = (e.clientX / W - 0.5) * -14;
      gsap.to(cardRef.current, { rotateX: rx, rotateY: ry, duration: 0.8, ease: "power2.out", transformPerspective: 800 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => { ctx.revert(); window.removeEventListener("mousemove", handleMouse); };
  }, []);

  return (
    <main className={styles.container} ref={containerRef}>
      <div className={styles.blobViolet} aria-hidden="true" />
      <div className={styles.blobCyan} aria-hidden="true" />
      <div className={styles.orbRing} ref={orbRef} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Left */}
        <div className={styles.leftCol}>
          <div className={styles.badge} ref={badgeRef}>
            <RiSparklingLine className={styles.badgeIcon} />
            <span>Available for opportunities</span>
          </div>

          <h1 className={styles.headline} ref={headlineRef}>
            <span className={styles.greet}>
              Hi, I&apos;m <span className={styles.nameHighlight}>Fayed</span>
              <span className={styles.cursor} ref={cursorRef} aria-hidden="true">|</span>
            </span>
            <span className={styles.wordLine}>
              {WORDS.map((w, i) => (
                <span key={i} className={`${styles.word} word`}>{w}&nbsp;</span>
              ))}
            </span>
          </h1>

          <p className={styles.subtitle} ref={subRef}>
            I build <span className={styles.accentViolet}>interactive</span>,{" "}
            <span className={styles.accentCyan}>responsive</span>, and{" "}
            <span className={styles.accentViolet}>modern</span> digital experiences
          </p>

          {/* CTA — using MainButton */}
          <div className={styles.cta} ref={ctaRef}>
            <MainButton
              action="primary"
              size="lg"
              title="View Projects"
              clickEvent={() => navigate('/projects')}
            >
              View Projects <RiArrowRightLine />
            </MainButton>
            <MainButton
              action="ghost"
              size="lg"
              title="Contact Me"
              clickEvent={() => navigate('/contact')}
            >
              Contact Me
            </MainButton>
          </div>

          <div className={styles.chips} ref={chipsRef} aria-label="Skills">
            {SKILLS.map((s) => <span key={s} className={styles.chip}>{s}</span>)}
          </div>

          <nav className={styles.social} ref={socialRef} aria-label="Social links">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            ))}
          </nav>
        </div>

        {/* Right — floating card */}
        <div className={styles.rightCol}>
          <div className={styles.cardWrap} ref={cardRef}>
            <span className={styles.sparkle} ref={(el) => (sparkleRefs.current[0] = el)} aria-hidden="true">✦</span>
            <span className={`${styles.sparkle} ${styles.sparkle2}`} ref={(el) => (sparkleRefs.current[1] = el)} aria-hidden="true">✦</span>
            <span className={`${styles.sparkle} ${styles.sparkle3}`} ref={(el) => (sparkleRefs.current[2] = el)} aria-hidden="true">✦</span>

            <div className={styles.card}>
              <div className={styles.cardHeader} aria-hidden="true">
                <span className={styles.dotRed} /><span className={styles.dotYellow} /><span className={styles.dotGreen} />
                <span className={styles.dotTitle}>portfolio.jsx</span>
              </div>

              <pre className={styles.codeBlock}>
                <code>
                  <span className={styles.cKw}>const</span>{" "}
                  <span className={styles.cVar}>dev</span>{" "}
                  <span className={styles.cOp}>=</span>{" {"}
                  {"\n  "}
                  <span className={styles.cProp}>name</span>:{" "}
                  <span className={styles.cStr}>&quot;Fayed&quot;</span>,
                  {"\n  "}
                  <span className={styles.cProp}>role</span>:{" "}
                  <span className={styles.cStr}>&quot;Frontend Developer&quot;</span>,
                  {"\n  "}
                  <span className={styles.cProp}>passion</span>:{" "}
                  <span className={styles.cStr}>&quot;Crafting UIs ✨&quot;</span>,
                  {"\n  "}
                  <span className={styles.cProp}>available</span>:{" "}
                  <span className={styles.cBool}>true</span>,
                  {"\n"}{"};"}
                </code>
              </pre>

              <div className={styles.statsRow}>
                <div className={styles.stat}><span className={styles.statVal}>20+</span><span className={styles.statLabel}>Projects</span></div>
                <div className={styles.statDivider} />
                <div className={styles.stat}><span className={styles.statVal}>0</span><span className={styles.statLabel}>Years</span></div>
                <div className={styles.statDivider} />
                <div className={styles.stat}><span className={styles.statVal}>100%</span><span className={styles.statLabel}>Passion</span></div>
              </div>
              <div className={styles.cardLogo}><RiCodeSSlashLine /></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
