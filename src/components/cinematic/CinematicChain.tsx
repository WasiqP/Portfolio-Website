"use client";

/**
 * CinematicChain — Selected Work, Full Services, Process, FAQ (contact + footer
 * excluded; this site keeps its own Footer).
 *
 * All content/copy lives in `@/data/cinematic-content`; this file only wires
 * up GSAP/ScrollTrigger behavior + markup.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useOptionalLenisScroll } from "@/components/layout/SmoothScroll";
import {
  FAQ_ITEMS,
  FEATURED_PROJECTS,
  FULL_SERVICE_PILLARS,
  PROCESS_STEPS,
  SERVICE_SPINE_ITEMS,
  cloudinaryVideoLite,
  cloudinaryVideoPoster,
  type FeaturedProject,
  type ServicePillarIcon,
} from "@/data/cinematic-content";

/* ───────────────────────────────────────────────────────────────────────── */
/* Helpers                                                                    */
/* ───────────────────────────────────────────────────────────────────────── */

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

/* ───────────────────────────────────────────────────────────────────────── */
/* Inline icons — zap / server / pen (no react-icons dependency)             */
/* ───────────────────────────────────────────────────────────────────────── */

type IconProps = { className?: string };

function IconZap({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconServer({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function IconPen({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

const PILLAR_ICON_MAP: Record<ServicePillarIcon, (props: IconProps) => React.JSX.Element> = {
  zap: IconZap,
  server: IconServer,
  pen: IconPen,
};

/* ───────────────────────────────────────────────────────────────────────── */
/* Work stage — mount every project video once; toggle visibility only        */
/* ───────────────────────────────────────────────────────────────────────── */

type FsVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
  webkitRequestFullscreen?: () => Promise<void> | void;
};

async function lockLandscape() {
  try {
    const orientation = screen.orientation as ScreenOrientation & {
      lock?: (orientation: string) => Promise<void>;
    };
    await orientation.lock?.("landscape");
  } catch {
    /* Not available until FS / not supported — browser may still auto-rotate */
  }
}

function unlockOrientation() {
  try {
    screen.orientation?.unlock?.();
  } catch {
    /* noop */
  }
}

function isVideoFullscreen(video: FsVideo) {
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return (
    document.fullscreenElement === video ||
    doc.webkitFullscreenElement === video ||
    Boolean(video.webkitDisplayingFullscreen)
  );
}

function WorkVideoStage({
  projects,
  activeId,
  allowFullscreen = false,
}: {
  projects: FeaturedProject[];
  activeId: string;
  allowFullscreen?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, FsVideo | null>>({});
  /** Arm sources once when the stage nears the viewport — never disarm. */
  const [armed, setArmed] = useState(false);
  /** Track which videos have enough data to play (survives selection changes). */
  const [readyIds, setReadyIds] = useState<Record<string, boolean>>({});
  const [fullscreen, setFullscreen] = useState(false);

  const markReady = (id: string) => {
    setReadyIds((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || armed) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setArmed(true);
        io.disconnect();
      },
      { rootMargin: "220px 0px", threshold: 0.01 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [armed]);

  useEffect(() => {
    for (const project of projects) {
      const video = videoRefs.current[project.id];
      if (!video) continue;
      if (project.id === activeId) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [activeId, projects, armed]);

  // Sync FS state + unlock landscape when the user exits (gesture / OS back)
  useEffect(() => {
    const sync = () => {
      const video = videoRefs.current[activeId];
      const on = video ? isVideoFullscreen(video) : Boolean(document.fullscreenElement);
      setFullscreen(on);
      if (!on) unlockOrientation();
    };

    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync as EventListener);

    const videos = Object.values(videoRefs.current).filter(Boolean) as FsVideo[];
    videos.forEach((v) => {
      v.addEventListener("webkitbeginfullscreen", sync);
      v.addEventListener("webkitendfullscreen", sync);
    });

    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync as EventListener);
      videos.forEach((v) => {
        v.removeEventListener("webkitbeginfullscreen", sync);
        v.removeEventListener("webkitendfullscreen", sync);
      });
    };
  }, [activeId, armed, projects]);

  // Exit native FS when switching projects
  useEffect(() => {
    const video = videoRefs.current[activeId];
    if (!video || !isVideoFullscreen(video)) {
      setFullscreen(false);
      unlockOrientation();
      return;
    }
    void (async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else video.webkitExitFullscreen?.();
      } catch {
        /* noop */
      }
      unlockOrientation();
      setFullscreen(false);
    })();
  }, [activeId]);

  const toggleNativeFullscreen = async () => {
    const video = videoRefs.current[activeId];
    if (!video) return;

    if (isVideoFullscreen(video)) {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else video.webkitExitFullscreen?.();
      } catch {
        /* noop */
      }
      unlockOrientation();
      setFullscreen(false);
      return;
    }

    void video.play().catch(() => {});

    try {
      // iOS Safari — native player; typically fills screen & favors landscape
      if (typeof video.webkitEnterFullscreen === "function") {
        video.webkitEnterFullscreen();
        setFullscreen(true);
        return;
      }

      if (video.requestFullscreen) {
        await video.requestFullscreen({ navigationUI: "hide" });
      } else if (video.webkitRequestFullscreen) {
        await video.webkitRequestFullscreen();
      } else {
        return;
      }

      await lockLandscape();
      setFullscreen(true);
    } catch {
      setFullscreen(false);
    }
  };

  const active = projects.find((p) => p.id === activeId) ?? projects[0];
  const poster = active?.video ? cloudinaryVideoPoster(active.video) : undefined;
  const activeReady = Boolean(activeId && readyIds[activeId]);
  const showLoader = Boolean(active?.video) && (!armed || !activeReady);

  return (
    <div className="rv-work-stage" ref={rootRef}>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`rv-work-stage-poster${activeReady ? " rv-work-stage-poster--dim" : ""}`}
          src={poster}
          alt=""
          width={960}
          height={540}
          decoding="async"
          loading="lazy"
        />
      ) : null}

      {projects.map((project) =>
        project.video ? (
          <video
            key={project.id}
            ref={(el) => {
              videoRefs.current[project.id] = el;
            }}
            className={`rv-work-stage-video${project.id === activeId ? " is-active" : ""}`}
            src={armed ? cloudinaryVideoLite(project.video) : undefined}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden={project.id !== activeId}
            onLoadedData={() => markReady(project.id)}
            onCanPlay={() => markReady(project.id)}
            onPlaying={() => markReady(project.id)}
          />
        ) : null
      )}

      <div className="rv-work-stage-scrim" aria-hidden="true" />
      <div className="rv-work-stage-badge">
        <span>Preview</span>
        <span>{active?.year}</span>
      </div>

      {allowFullscreen && active?.video ? (
        <button
          type="button"
          className={`rv-work-stage-expand${fullscreen ? " is-on" : ""}`}
          aria-pressed={fullscreen}
          onClick={() => {
            void toggleNativeFullscreen();
          }}
        >
          {fullscreen ? "Exit" : "Fullscreen"}
        </button>
      ) : null}

      {showLoader ? (
        <div className="rv-work-stage-loader" role="status" aria-live="polite">
          <span className="rv-work-stage-spinner" aria-hidden="true" />
          <span className="rv-work-stage-loader-label">
            {!armed ? "Preparing preview…" : "Loading video…"}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function WorkDetailCard({ project }: { project: FeaturedProject }) {
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(false);
  }, [project.id]);

  return (
    <div className="rv-work-detail-body">
      <div className="rv-work-detail-copy">
        <p className="rv-work-detail-scope">{project.scope}</p>
        <h3 className="rv-work-detail-title">{project.title}</h3>
        <p className="rv-work-detail-meta">
          {project.category}
          <span className="rv-work-detail-meta-sep" aria-hidden="true">
            &nbsp;·&nbsp;
          </span>
          {project.year}
        </p>
        <p className="rv-work-detail-desc">{project.desc}</p>
        <div className="rv-work-detail-stack" aria-label="Technologies">
          {project.stack.map((tag) => (
            <span key={tag} className="rv-work-detail-tag">
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={project.href}
          className={`rv-work-detail-cta${navigating ? " rv-work-detail-cta--pending" : ""}`}
          aria-busy={navigating}
          onClick={() => setNavigating(true)}
        >
          {navigating ? "Opening case…" : "View case"}
          <span className="rv-work-detail-cta-arrow" aria-hidden="true">
            {navigating ? "" : "→"}
          </span>
        </Link>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/* CinematicChain                                                             */
/* ───────────────────────────────────────────────────────────────────────── */

export default function CinematicChain() {
  const [activeProjectId, setActiveProjectId] = useState(
    () => FEATURED_PROJECTS[0]?.id ?? ""
  );
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [svcPillarFocus, setSvcPillarFocus] = useState<string | null>(null);
  const [svcPillarHoverAllowed, setSvcPillarHoverAllowed] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const workSectionRef = useRef<HTMLElement>(null);
  const processTrackRef = useRef<HTMLDivElement>(null);
  const processLineFillRef = useRef<HTMLDivElement>(null);
  const isCompactWork = useMediaQuery("(max-width: 1099px)");
  const lenis = useOptionalLenisScroll();

  const activeProject = useMemo(
    () =>
      FEATURED_PROJECTS.find((p) => p.id === activeProjectId) ??
      FEATURED_PROJECTS[0] ??
      null,
    [activeProjectId]
  );

  const selectProject = (id: string) => {
    setActiveProjectId(id);
    if (isCompactWork) setMobileSheetOpen(true);
  };

  const closeMobileSheet = () => setMobileSheetOpen(false);

  // Freeze page scroll while the mobile preview sheet is open
  useEffect(() => {
    if (!mobileSheetOpen || !isCompactWork) return;

    const html = document.documentElement;
    lenis?.stop();
    html.classList.add("rv-work-sheet-lock");

    return () => {
      html.classList.remove("rv-work-sheet-lock");
      lenis?.start();
    };
  }, [mobileSheetOpen, isCompactWork, lenis]);
  // Close sheet when returning to desktop layout
  useEffect(() => {
    if (!isCompactWork) setMobileSheetOpen(false);
  }, [isCompactWork]);

  // Escape closes mobile sheet
  useEffect(() => {
    if (!mobileSheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileSheet();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileSheetOpen]);

  // Services pillar hover-focus only on wide pointer-capable viewports
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1101px) and (hover: hover)");
    const apply = () => {
      setSvcPillarHoverAllowed(mq.matches);
      if (!mq.matches) setSvcPillarFocus(null);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Scroll-triggered entrance animations for every section in the chain
  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      // Batch-reveal for every .rv-reveal element
      gsap.utils.toArray<HTMLElement>(".rv-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Work rows — staggered wipe-in from left
      gsap.utils.toArray<HTMLElement>(".rv-work-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -40, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 1,
            x: 0,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            delay: i * 0.08,
            ease: "power4.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      // Process progress line fills left-to-right as you scroll through the track
      if (processTrackRef.current && processLineFillRef.current) {
        gsap.fromTo(
          processLineFillRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: processTrackRef.current,
              start: "top 75%",
              end: "bottom 40%",
              scrub: 0.4,
            },
          }
        );
      }

      // Process steps stagger in individually
      gsap.utils.toArray<HTMLElement>(".rv-process-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // FAQ rows fade/stagger in
      gsap.utils.toArray<HTMLElement>(".rv-faq-item").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="rv-rising-layer">
        {/* === SELECTED WORK (simple list + one-time video mount) === */}
        <section className="rv-work" id="work" ref={workSectionRef}>
          <div className="rv-work-inner">
            <header className="rv-work-header rv-reveal">
              <p className="rv-eyebrow">Selected Work</p>
              <h2 className="rv-work-heading">Projects I&apos;ve shipped.</h2>
              <p className="rv-work-lede">
                {isCompactWork
                  ? "Tap a project to open its preview. Close the sheet to pick another—no scrolling up and down."
                  : "Select a project to preview it. Videos load once when this section enters view."}{" "}
                Full practice map is in <a href="#full-services">Services</a> below.
              </p>
            </header>

            <div className="rv-work-layout" id="work-project-list">
              <div className="rv-work-col-list">
                <ul className="rv-work-list" role="list">
                  {FEATURED_PROJECTS.map((project, i) => {
                    const isActive = activeProject?.id === project.id;
                    return (
                      <li key={project.id}>
                        <button
                          type="button"
                          className={`rv-work-row${isActive ? " rv-work-row--active" : ""}`}
                          aria-pressed={isActive}
                          aria-haspopup={isCompactWork ? "dialog" : undefined}
                          onClick={() => selectProject(project.id)}
                        >
                          <span className="rv-work-row-num" aria-hidden="true">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="rv-work-row-main">
                            <span className="rv-work-row-title">{project.title}</span>
                            <span className="rv-work-row-scope">{project.scope}</span>
                          </div>
                          <span className="rv-work-row-year">{project.year}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <aside
                className={`rv-work-col-detail${mobileSheetOpen ? " rv-work-col-detail--sheet-open" : ""}`}
                aria-live="polite"
                aria-label="Project preview"
                {...(isCompactWork
                  ? {
                      role: "dialog" as const,
                      "aria-modal": true as const,
                      "aria-hidden": !mobileSheetOpen,
                    }
                  : {})}
              >
                {isCompactWork ? (
                  <button
                    type="button"
                    className="rv-work-sheet-backdrop"
                    aria-label="Close preview"
                    tabIndex={mobileSheetOpen ? 0 : -1}
                    onClick={closeMobileSheet}
                  />
                ) : null}
                <div className="rv-work-detail-card" data-lenis-prevent>
                  {isCompactWork ? (
                    <div className="rv-work-sheet-chrome">
                      <span className="rv-work-sheet-handle" aria-hidden="true" />
                      <button
                        type="button"
                        className="rv-work-sheet-close"
                        onClick={closeMobileSheet}
                      >
                        Close
                      </button>
                    </div>
                  ) : null}
                  <WorkVideoStage
                    projects={FEATURED_PROJECTS}
                    activeId={activeProject?.id ?? FEATURED_PROJECTS[0]?.id ?? ""}
                    allowFullscreen
                  />
                  {activeProject ? <WorkDetailCard project={activeProject} /> : null}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* === FULL SERVICES (capability map) === */}
        <section className="rv-services-full" id="full-services" aria-labelledby="full-services-heading">
          <div className="rv-services-full-inner">
            <header className="rv-services-full-head rv-reveal">
              <p className="rv-eyebrow rv-eyebrow--light">Services</p>
              <div className="rv-services-full-head-grid">
                <h2 id="full-services-heading" className="rv-services-full-title">
                  The full picture of what I deliver—one person, three practices.
                </h2>
                <p className="rv-services-full-lede">
                  Three practice areas, shared standards. Whether you need inference in production,
                  a platform your team can operate, or a launch that matches both—here is how I
                  scope it end-to-end.
                </p>
              </div>
            </header>

            <div
              className={["rv-services-full-pillars", svcPillarHoverAllowed ? "rv-services-full-pillars--interactive" : ""]
                .filter(Boolean)
                .join(" ")}
              onMouseLeave={() => {
                if (svcPillarHoverAllowed) setSvcPillarFocus(null);
              }}
              role="presentation"
            >
              {FULL_SERVICE_PILLARS.map((pillar) => {
                const PillarIcon = PILLAR_ICON_MAP[pillar.icon];
                const isFocus = svcPillarHoverAllowed && svcPillarFocus === pillar.id;
                const isMuted = svcPillarHoverAllowed && !!svcPillarFocus && svcPillarFocus !== pillar.id;
                const pillarFlexStyle: React.CSSProperties | undefined = svcPillarHoverAllowed
                  ? {
                      flex: !svcPillarFocus ? "1 1 0%" : pillar.id === svcPillarFocus ? "1.95 1 0%" : "1.025 1 0%",
                    }
                  : undefined;
                return (
                  <article
                    key={pillar.id}
                    id={`service-pillar-${pillar.id}`}
                    className={[
                      "rv-svc-pillar",
                      "rv-reveal",
                      isFocus ? "rv-svc-pillar--focus" : "",
                      isMuted ? "rv-svc-pillar--muted" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={pillarFlexStyle}
                    onMouseEnter={() => {
                      if (svcPillarHoverAllowed) setSvcPillarFocus(pillar.id);
                    }}
                  >
                    <div className="rv-svc-pillar-top">
                      <span className="rv-svc-pillar-num" aria-hidden="true">
                        {pillar.num}
                      </span>
                      <span className="rv-svc-pillar-icon" aria-hidden="true">
                        <PillarIcon />
                      </span>
                    </div>
                    <h3 className="rv-svc-pillar-title">{pillar.title}</h3>
                    <p className="rv-svc-pillar-lede">{pillar.lede}</p>

                    <div className="rv-svc-pillar-block">
                      <p className="rv-svc-pillar-label">Outcomes you should expect</p>
                      <ul className="rv-svc-pillar-list">
                        {pillar.outcomes.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rv-svc-pillar-block">
                      <p className="rv-svc-pillar-label">Typical deliverables</p>
                      <ul className="rv-svc-pillar-list rv-svc-pillar-list--deliverables">
                        {pillar.deliverables.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="rv-svc-pillar-foot">
                      <span className="rv-svc-pillar-foot-label">Engagement shapes</span>
                      <span className="rv-svc-pillar-foot-val">{pillar.engagements}</span>
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="rv-services-spine rv-reveal">
              <p className="rv-services-spine-label">Across every project</p>
              <p className="rv-services-spine-desc">
                Shared threads from kickoff to handover—so creative, data, and engineering stay
                aligned.
              </p>
              <ul className="rv-services-spine-list" role="list">
                {SERVICE_SPINE_ITEMS.map((item) => (
                  <li key={item} className="rv-services-spine-chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* === PROCESS === */}
        <section className="rv-process">
          <div className="rv-process-inner">
            <div className="rv-process-header rv-reveal">
              <p className="rv-eyebrow rv-eyebrow--light">How I Work</p>
              <h2 className="rv-process-headline">From first call to&nbsp;launch&mdash;five clear stages.</h2>
            </div>
            <div className="rv-process-track" ref={processTrackRef}>
              <div className="rv-process-line">
                <div className="rv-process-line-fill" ref={processLineFillRef} />
              </div>
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.id} className="rv-process-step">
                  <div className="rv-process-step-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="rv-process-step-title">{step.title}</h3>
                  <p className="rv-process-step-body">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === FAQ === */}
        <section className="rv-faq-block" id="faq" aria-labelledby="faq-heading">
          <div className="rv-faq-block-inner">
            <div className="rv-faq-split">
              <div className="rv-faq-split-intro">
                <header className="rv-faq-block-header rv-reveal">
                  <p className="rv-eyebrow">FAQ</p>
                  <h2 id="faq-heading" className="rv-faq-block-headline">
                    I answer plainly—so you always know what you&apos;re buying.
                  </h2>
                </header>
                <p className="rv-faq-split-lede rv-reveal">
                  How I price, ship timelines, IP, and what happens after launch—expand any row for
                  the full answer.
                </p>
              </div>
              <div className="rv-faq-split-main">
                <div className="rv-faq-list">
                  {FAQ_ITEMS.map((item, i) => {
                    const isOpen = openFaqId === item.id;
                    const triggerId = `faq-trigger-${item.id}`;
                    const panelId = `faq-panel-${item.id}`;
                    return (
                      <div key={item.id} className={`rv-faq-item${isOpen ? " rv-faq-item--open" : ""}`}>
                        <h3 className="rv-faq-item-heading">
                          <button
                            type="button"
                            id={triggerId}
                            className="rv-faq-item-trigger"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => setOpenFaqId((cur) => (cur === item.id ? null : item.id))}
                          >
                            <span className="rv-faq-item-num" aria-hidden="true">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="rv-faq-item-q">{item.q}</span>
                            <span className="rv-faq-item-icon" aria-hidden="true" />
                          </button>
                        </h3>
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={triggerId}
                          className="rv-faq-item-panel"
                          data-open={isOpen}
                        >
                          <div className="rv-faq-item-panel-inner">
                            <span className="rv-faq-item-panel-gutter" aria-hidden="true">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="rv-faq-item-a">{item.a}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
