// local
import LoadingSpinner from "../../components/ui/loading-Spinner/loadingSpinner";
import styles from "./LoadingPage.module.css";

// react
import { useEffect, useRef } from "react";
import gsap from "gsap";

// icons
import { RiCodeSSlashLine } from "react-icons/ri";

// constants
const PARTICLES = Array.from({ length: 20 }, (_, i) => i);

// component
export default function LoadingPage({ message = "Initializing Portfolio…" }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const particlesRef = useRef([]);
  const textRef = useRef(null);
  const dotsRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Pre-set all animated elements to their FROM state
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(logoRef.current, { scale: 0, opacity: 0, rotation: -180 });
      gsap.set([ring1Ref.current, ring2Ref.current, ring3Ref.current], { scale: 0, opacity: 0 });
      gsap.set(textRef.current, { y: 30, opacity: 0 });
      gsap.set(progressRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(statusRef.current, { y: 10, opacity: 0 });

      // Animate TO final state
      tl.to(containerRef.current, { opacity: 1, duration: 0.6 })
        .to(logoRef.current, { scale: 1, opacity: 1, rotation: 0, duration: 0.9, ease: "elastic.out(1,0.6)" }, "-=0.2")
        .to([ring1Ref.current, ring2Ref.current, ring3Ref.current], { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.4)" }, "-=0.6")
        .to(textRef.current, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
        .to(progressRef.current, { scaleX: 1, opacity: 1, duration: 0.6, transformOrigin: "left center" }, "-=0.3")
        .to(statusRef.current, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

      gsap.to(progressBarRef.current, { scaleX: 1, duration: 2.8, ease: "power1.inOut", delay: 0.8, transformOrigin: "left center" });

      gsap.to(ring1Ref.current, { rotation: 360, duration: 4, ease: "none", repeat: -1, transformOrigin: "center center" });
      gsap.to(ring2Ref.current, { rotation: -360, duration: 6, ease: "none", repeat: -1, transformOrigin: "center center" });
      gsap.to(ring3Ref.current, { rotation: 360, duration: 9, ease: "none", repeat: -1, transformOrigin: "center center" });

      gsap.to(logoRef.current, { scale: 1.08, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true });

      gsap.to(dotsRef.current?.querySelectorAll("span") ?? [], {
        opacity: 0, duration: 0.5, ease: "sine.inOut", stagger: { each: 0.25, repeat: -1, yoyo: true },
      });

      particlesRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 0, x: gsap.utils.random(-20, 20), opacity: gsap.utils.random(0.1, 0.5), scale: gsap.utils.random(0.4, 1) },
          { y: gsap.utils.random(-120, -240), x: `+=${gsap.utils.random(-60, 60)}`, opacity: 0, scale: 0.2, duration: gsap.utils.random(2.5, 5), delay: gsap.utils.random(0, 2.5), ease: "none", repeat: -1, repeatDelay: gsap.utils.random(0, 1.5) }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef} aria-busy="true" aria-label="Loading">
      {/* Floating particles */}
      <div className={styles.particlesLayer} aria-hidden="true">
        {PARTICLES.map((i) => (
          <span
            key={i}
            className={styles.particle}
            ref={(el) => (particlesRef.current[i] = el)}
            style={{ left: `${(i / PARTICLES.length) * 100}%`, bottom: "0%" }}
          />
        ))}
      </div>

      {/* Ambient glow blobs */}
      <div className={styles.blobViolet} aria-hidden="true" />
      <div className={styles.blobCyan} aria-hidden="true" />

      {/* Core spinner */}
      <div className={styles.spinnerWrap}>
        <div className={styles.ring} ref={ring1Ref} aria-hidden="true" />
        <div className={`${styles.ring} ${styles.ring2}`} ref={ring2Ref} aria-hidden="true" />
        <div className={`${styles.ring} ${styles.ring3}`} ref={ring3Ref} aria-hidden="true" />
        <div className={styles.logoCore} ref={logoRef}>
          <RiCodeSSlashLine className={styles.logoIcon} />
        </div>
      </div>

      {/* Text group */}
      <div className={styles.textGroup} ref={textRef}>
        <h1 className={styles.title}>
          <span className={styles.titleGrad}>Fayed</span>
          <span className={styles.titleDot}>.</span>
          <span className={styles.titleSub}>dev</span>
        </h1>
        <p className={styles.message}>{message}</p>

        {/* LoadingSpinner component row */}
        <div className={styles.spinnerRow}>
          <LoadingSpinner size="sm" color="violet" />
          <LoadingSpinner size="sm" color="cyan" />
          <LoadingSpinner size="sm" color="gold" />
        </div>

        {/* Progress */}
        <div className={styles.progressWrap} ref={progressRef}>
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} ref={progressBarRef} />
          </div>
          <div className={styles.dots} ref={dotsRef} aria-hidden="true">
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>
        </div>

        <p className={styles.status} ref={statusRef}>
          <span className={styles.statusDot} />
          <span>Crafting your experience</span>
        </p>
      </div>
    </div>
  );
}
