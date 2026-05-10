// local
import styles from "./ErrorPage.module.css";
import MainButton from "../../components/ui/button/MainButton";
import LoadingSpinner from "../../components/ui/loading-Spinner/loadingSpinner";

// react
import { useEffect, useRef } from "react";
import gsap from "gsap";

// icons
import {
  RiErrorWarningLine,
  RiRefreshLine,
  RiArrowLeftLine,
  RiCodeSSlashLine,
  RiBugLine,
} from "react-icons/ri"

export default function ErrorPage({
  code = "500",
  title = "Something went wrong",
  message = "An unexpected error occurred. The page you were looking for encountered a problem.",
  onRetry = () => window.location.reload(),
  onBack = () => window.history.back(),
}) {
  const containerRef = useRef(null);
  const glitchRef = useRef(null);
  const iconRef = useRef(null);
  const contentRef = useRef(null);
  const btnGroupRef = useRef(null);
  const blobRef = useRef(null);
  const codeLineRefs = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Pre-set all animated elements to their FROM state
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(glitchRef.current, { scale: 0.5, opacity: 0 });
      gsap.set(iconRef.current, { y: -30, opacity: 0, rotation: -20 });
      gsap.set(Array.from(contentRef.current?.children ?? []), { y: 40, opacity: 0 });
      gsap.set(Array.from(btnGroupRef.current?.children ?? []), { y: 30, opacity: 0, scale: 0.9 });
      gsap.set(codeLineRefs.current.filter(Boolean), { x: -30, opacity: 0 });

      // Animate TO final state
      tl.to(containerRef.current, { opacity: 1, duration: 0.4 })
        .to(glitchRef.current, { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }, "-=0.1")
        .to(iconRef.current, { y: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.8)" }, "-=0.5")
        .to(Array.from(contentRef.current?.children ?? []), { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 }, "-=0.5")
        .to(Array.from(btnGroupRef.current?.children ?? []), { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.5)" }, "-=0.4")
        .to(codeLineRefs.current.filter(Boolean), { x: 0, opacity: 1, stagger: 0.07, duration: 0.5 }, "-=0.6");

      // Glitch
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      glitchTl
        .to(glitchRef.current, { skewX: 10, duration: 0.05, ease: "steps(1)" })
        .to(glitchRef.current, { skewX: -8, duration: 0.05, ease: "steps(1)" })
        .to(glitchRef.current, { skewX: 0, duration: 0.05, ease: "steps(1)" })
        .to(glitchRef.current, { x: 6, duration: 0.04, ease: "steps(1)" })
        .to(glitchRef.current, { x: -6, duration: 0.04, ease: "steps(1)" })
        .to(glitchRef.current, { x: 0, duration: 0.04 });

      gsap.to(iconRef.current, { rotation: 8, duration: 0.12, ease: "steps(2)", repeat: -1, yoyo: true, repeatDelay: 4 });
      gsap.to(blobRef.current, { scale: 1.2, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true });

      particlesRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 0, opacity: gsap.utils.random(0.3, 0.7), scale: gsap.utils.random(0.5, 1.2) },
          { y: gsap.utils.random(-80, -200), x: gsap.utils.random(-40, 40), opacity: 0, scale: 0, duration: gsap.utils.random(2, 4), delay: gsap.utils.random(0, 3), ease: "power1.out", repeat: -1, repeatDelay: gsap.utils.random(0, 2) }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const PARTICLES = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={styles.container} ref={containerRef} role="main" aria-live="polite">
      <div className={styles.blobCoral} ref={blobRef} aria-hidden="true" />
      <div className={styles.blobViolet} aria-hidden="true" />

      <div className={styles.particleLayer} aria-hidden="true">
        {PARTICLES.map((i) => (
          <span
            key={i}
            className={styles.particle}
            ref={(el) => (particlesRef.current[i] = el)}
            style={{ left: `${(i / PARTICLES.length) * 100}%`, bottom: "10%" }}
          />
        ))}
      </div>

      <div className={styles.layout}>
        {/* Visual side */}
        <div className={styles.visualSide}>
          <div className={styles.errorCode} ref={glitchRef} aria-label={`Error code ${code}`}>
            <span className={styles.codeGhost} aria-hidden="true">{code}</span>
            {code}
          </div>

          <div className={styles.iconWrap} ref={iconRef}>
            <RiBugLine className={styles.bugIcon} />
            <div className={styles.iconRing} />
          </div>

          {/* LoadingSpinner as a "scanning" indicator */}
          <div className={styles.scanRow}>
            <LoadingSpinner size="sm" color="coral" label="Scanning error…" />
          </div>

          <div className={styles.terminal}>
            <div className={styles.termHeader} aria-hidden="true">
              <span className={styles.tDotR} /><span className={styles.tDotY} /><span className={styles.tDotG} />
              <span className={styles.tLabel}>error.log</span>
            </div>
            <div className={styles.termBody}>
              {[
                { prefix: "  →", text: `HTTP ${code}` },
                { prefix: " ✗", text: "Request failed" },
                { prefix: " ~", text: "Stack trace captured" },
                { prefix: " !", text: "Please retry" },
              ].map((line, i) => (
                <div key={i} className={styles.termLine} ref={(el) => (codeLineRefs.current[i] = el)}>
                  <span className={styles.termPrefix}>{line.prefix}</span>
                  <span className={styles.termText}>{line.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className={styles.content} ref={contentRef}>
          <div className={styles.errorBadge}>
            <RiErrorWarningLine />
            <span>Error {code}</span>
          </div>

          <h1 className={styles.title}>{title}</h1>
          <p className={styles.message}>{message}</p>
          <div className={styles.divider} />

          {/* Button group — using MainButton */}
          <div className={styles.btnGroup} ref={btnGroupRef}>
            <MainButton
              id="error-retry-btn"
              action="danger"
              size="md"
              title="Try Again"
              clickEvent={onRetry}
            >
              <RiRefreshLine /> Try Again
            </MainButton>
            <MainButton
              id="error-back-btn"
              action="outline"
              size="md"
              title="Go Back"
              clickEvent={onBack}
            >
              <RiArrowLeftLine /> Go Back
            </MainButton>
            <MainButton
              id="error-home-btn"
              action="ghost"
              size="md"
              title="Portfolio Home"
              href="/"
            >
              <RiCodeSSlashLine /> Portfolio Home
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  );
}
