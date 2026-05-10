// local
import MainButton from "../../components/ui/button/MainButton";
import LoadingSpinner from "../../components/ui/loading-Spinner/loadingSpinner";
import styles from "./OfflinePage.module.css";

// react
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// icons
import { RiWifiOffLine, RiRefreshLine, RiSignalWifiErrorLine, RiArrowRightLine } from "react-icons/ri";

const PULSES = 3;

export default function OfflinePage({
  onRetry = () => window.location.reload(),
}) {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const pulseRefs = useRef([]);
  const contentRef = useRef(null);
  const btnRef = useRef(null);
  const signalBarsRef = useRef([]);
  const waveRefs = useRef([]);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Pre-set all animated elements to their FROM state
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(iconRef.current, { scale: 0, opacity: 0 });
      gsap.set(pulseRefs.current.filter(Boolean), { scale: 0, opacity: 0 });
      gsap.set(Array.from(contentRef.current?.children ?? []), { y: 40, opacity: 0 });
      gsap.set(btnRef.current, { y: 20, opacity: 0, scale: 0.9 });

      // Animate TO final state
      tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
        .to(iconRef.current, { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.6)" }, "-=0.2")
        .to(pulseRefs.current.filter(Boolean), { scale: 1, opacity: 1, stagger: 0.15, duration: 0.6 }, "-=0.6")
        .to(Array.from(contentRef.current?.children ?? []), { y: 0, opacity: 1, stagger: 0.1, duration: 0.7 }, "-=0.4")
        .to(btnRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3");

      pulseRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { scale: 0.8, opacity: 0.8 },
          { scale: 2.5, opacity: 0, duration: 2, ease: "power1.out", delay: i * 0.6, repeat: -1, repeatDelay: 0.2 }
        );
      });

      gsap.to(iconRef.current, { y: -12, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true });

      signalBarsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: i < 2 ? 1 : 0.15,
          duration: 0.4, ease: "steps(1)", repeat: -1, yoyo: true,
          repeatDelay: i * 0.3 + 0.5, delay: i * 0.2,
        });
      });

      waveRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { strokeDashoffset: 300, opacity: 0.5 },
          { strokeDashoffset: 0, opacity: 0.15, duration: 2, ease: "none", delay: i * 0.4, repeat: -1 }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleRetry = () => {
    setRetrying(true);
    gsap.to(btnRef.current, {
      rotation: 360,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(btnRef.current, { rotation: 0 });
        setRetrying(false);
        onRetry();
      },
    });
  };

  return (
    <div className={styles.container} ref={containerRef} role="main" aria-live="polite">
      <div className={styles.blobBlue} aria-hidden="true" />
      <div className={styles.blobViolet} aria-hidden="true" />

      <svg className={styles.waveBg} viewBox="0 0 800 400" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            className={styles.wavePath}
            ref={(el) => (waveRefs.current[i] = el)}
            d={`M ${-200 + i * 60} ${200 + i * 20} Q ${200 + i * 40} ${100 + i * 15} ${500 + i * 50} ${200 + i * 20} T ${900 + i * 60} ${200 + i * 20}`}
            fill="none"
            stroke="rgba(123,97,255,0.3)"
            strokeWidth="1.5"
            strokeDasharray="300"
          />
        ))}
      </svg>

      <div className={styles.inner}>
        {/* Icon + pulse */}
        <div className={styles.iconArea}>
          {Array.from({ length: PULSES }).map((_, i) => (
            <span
              key={i}
              className={styles.pulseRing}
              ref={(el) => (pulseRefs.current[i] = el)}
              aria-hidden="true"
            />
          ))}
          <div className={styles.iconCore} ref={iconRef}>
            <RiWifiOffLine className={styles.wifiIcon} />
          </div>
          <div className={styles.signalBars} aria-label="No signal" role="img">
            {[1, 2, 3, 4].map((h, i) => (
              <span
                key={i}
                className={styles.bar}
                style={{ height: `${h * 8}px` }}
                ref={(el) => (signalBarsRef.current[i] = el)}
              />
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className={styles.content} ref={contentRef}>
          <div className={styles.badge}>
            <RiSignalWifiErrorLine />
            <span>No Connection</span>
          </div>

          <h1 className={styles.title}>
            You&apos;re <span className={styles.offlineWord}>Offline</span>
          </h1>

          <p className={styles.message}>
            It looks like you&apos;ve lost your internet connection. Check your
            network settings and try again when you&apos;re back online.
          </p>

          <ul className={styles.tips} aria-label="Troubleshooting tips">
            {[
              "Check your Wi-Fi or cable connection",
              "Try disabling and re-enabling your network adapter",
              "Contact your internet provider if the issue persists",
            ].map((tip, i) => (
              <li key={i} className={styles.tip}>
                <span className={styles.tipDot} />
                {tip}
              </li>
            ))}
          </ul>

          {/* Retry button — MainButton + ref forwarded via wrapper */}
          <div ref={btnRef} className={styles.btnWrap}>
            <MainButton
              id="offline-retry-btn"
              action={retrying ? "outline" : "primary"}
              size="lg"
              title={retrying ? "Retrying…" : "Retry Connection"}
              clickEvent={handleRetry}
              isDisabled={retrying}
            >
              {retrying ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  Retrying…
                </>
              ) : (
                <>
                  <RiRefreshLine />
                  Retry Connection
                  <RiArrowRightLine />
                </>
              )}
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  );
}
