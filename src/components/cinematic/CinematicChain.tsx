"use client";

/**
 * CinematicChain — Selected Work, Full Services, Process, FAQ (contact + footer
 * excluded; this site keeps its own Footer).
 *
 * All content/copy lives in `@/data/cinematic-content`; this file only wires
 * up GSAP/ScrollTrigger behavior + markup.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  FAQ_ITEMS,
  FEATURED_PROJECTS,
  FULL_SERVICE_PILLARS,
  PROCESS_STEPS,
  SERVICE_SPINE_ITEMS,
  WORK_LANE_ROTATE_MS,
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
/* WorkDetailPlaceholder / WorkDetailPanel                                    */
/* ───────────────────────────────────────────────────────────────────────── */

function WorkDetailPlaceholder() {
  return (
    <div className="rv-work-detail-placeholder">
      <div className="rv-work-detail-ph-stage" aria-hidden="true" />
      <p className="rv-work-detail-ph-kicker">Live preview</p>
      <p className="rv-work-detail-ph-title">Hover a project</p>
      <p className="rv-work-detail-ph-copy">
        The video stage on the right updates as you move through the list—no overlay, just a sticky
        preview beside the work.
      </p>
    </div>
  );
}

function WorkDetailPanel({ project }: { project: FeaturedProject | null }) {
  if (!project) return <WorkDetailPlaceholder />;
  return (
    <div className="rv-work-detail-body">
      <div className="rv-work-detail-stage">
        {project.video ? (
          <video
            key={project.id}
            className="rv-work-detail-video"
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${project.title} preview`}
          />
        ) : (
          <div className="rv-work-detail-stage-fallback" style={{ background: project.gradient }} />
        )}
        <div className="rv-work-detail-stage-scrim" aria-hidden="true" />
        <div className="rv-work-detail-stage-meta">
          <span className="rv-work-detail-stage-label">Preview</span>
          <span className="rv-work-detail-stage-year">{project.year}</span>
        </div>
      </div>

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
        <ul className="rv-work-detail-highlights" role="list">
          {project.highlights.slice(0, 3).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="rv-work-detail-stack" aria-label="Technologies">
          {project.stack.map((tag) => (
            <span key={tag} className="rv-work-detail-tag">
              {tag}
            </span>
          ))}
        </div>
        <a href={project.href} className="rv-work-detail-cta">
          View case
          <span className="rv-work-detail-cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/* CinematicChain                                                             */
/* ───────────────────────────────────────────────────────────────────────── */

export default function CinematicChain() {
  const [hoveredProject, setHoveredProject] = useState<FeaturedProject | null>(null);
  const [activeWorkPillarIdx, setActiveWorkPillarIdx] = useState(0);
  const [workAutoPaused, setWorkAutoPaused] = useState(false);
  const [svcPillarFocus, setSvcPillarFocus] = useState<string | null>(null);
  const [svcPillarHoverAllowed, setSvcPillarHoverAllowed] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const workSectionRef = useRef<HTMLElement>(null);
  const workProjectsScrollRef = useRef<HTMLDivElement>(null);
  const workPracticeStripRef = useRef<HTMLElement>(null);
  const workPracticeCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const processTrackRef = useRef<HTMLDivElement>(null);
  const processLineFillRef = useRef<HTMLDivElement>(null);

  const activeWorkPillar = FULL_SERVICE_PILLARS[activeWorkPillarIdx] ?? FULL_SERVICE_PILLARS[0];
  const activeWorkPillarId = activeWorkPillar?.id ?? "ai-data";
  const visibleWorkProjects = useMemo(
    () => FEATURED_PROJECTS.filter((p) => p.pillarId === activeWorkPillarId),
    [activeWorkPillarId]
  );

  const activeProject =
    hoveredProject && visibleWorkProjects.some((p) => p.id === hoveredProject.id)
      ? hoveredProject
      : (visibleWorkProjects[0] ?? null);

  const focusWorkProjectsForPillar = useCallback((pillarId: string) => {
    const idx = FULL_SERVICE_PILLARS.findIndex((p) => p.id === pillarId);
    if (idx >= 0) setActiveWorkPillarIdx(idx);
    setHoveredProject(null);
    requestAnimationFrame(() => {
      workProjectsScrollRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    });
  }, []);

  // Selected Work — auto-rotate practice lane (timer resets when lane changes)
  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced) return undefined;
    if (workAutoPaused) return undefined;

    const id = window.setInterval(() => {
      setActiveWorkPillarIdx((i) => (i + 1) % FULL_SERVICE_PILLARS.length);
      setHoveredProject(null);
    }, WORK_LANE_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [workAutoPaused, activeWorkPillarIdx]);

  // Move a soft spotlight behind the active practice card (desktop + tablet)
  useEffect(() => {
    const strip = workPracticeStripRef.current;
    const activeEl = workPracticeCardRefs.current?.[activeWorkPillarIdx];
    if (!strip || !activeEl) return;

    const setVars = () => {
      const stripRect = strip.getBoundingClientRect();
      const cardRect = activeEl.getBoundingClientRect();
      const x = Math.max(0, cardRect.left - stripRect.left);
      const w = Math.max(1, cardRect.width);
      strip.style.setProperty("--work-spot-x", `${x}px`);
      strip.style.setProperty("--work-spot-w", `${w}px`);
    };

    setVars();
    const onResize = () => setVars();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeWorkPillarIdx]);

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
        {/* === SELECTED WORK === */}
        <section
          className="rv-work"
          id="work"
          ref={workSectionRef}
          onPointerEnter={() => setWorkAutoPaused(true)}
          onPointerLeave={(e) => {
            const rel = e.relatedTarget;
            if (rel instanceof Node && workSectionRef.current?.contains(rel)) return;
            setWorkAutoPaused(false);
            setHoveredProject(null);
          }}
          onFocusCapture={() => setWorkAutoPaused(true)}
          onBlurCapture={(e) => {
            const rel = e.relatedTarget;
            if (rel instanceof Node && workSectionRef.current?.contains(rel)) return;
            setWorkAutoPaused(false);
            setHoveredProject(null);
          }}
        >
          <div className="rv-work-inner">
            <header className="rv-work-header rv-reveal">
              <p className="rv-eyebrow">Selected Work</p>
              <p className="rv-work-lede">
                I work as one person across AI &amp; data, software &amp; cloud, and brand &amp;
                production. Below are spotlight engagements—hover for detail—while every practice
                lane is spelled out in Services just after this section.
              </p>
            </header>

            <nav
              ref={workPracticeStripRef}
              className="rv-work-practice-strip rv-reveal"
              aria-label="Practices I ship across"
              style={{ "--work-spot-bg": activeWorkPillar?.spotlight ?? "rgba(10, 10, 10, 0.08)" } as React.CSSProperties}
            >
              <span className="rv-work-practice-spotlight" aria-hidden="true" />
              <div className="rv-work-practice-cards">
                {FULL_SERVICE_PILLARS.map((pillar) => {
                  const PNavIcon = PILLAR_ICON_MAP[pillar.icon];
                  const isActive = pillar.id === activeWorkPillarId;
                  const pillarIdx = FULL_SERVICE_PILLARS.findIndex((p) => p.id === pillar.id);
                  return (
                    <div
                      key={pillar.id}
                      role="button"
                      tabIndex={0}
                      className={`rv-work-practice-card${isActive ? " rv-work-practice-card--active" : ""}`}
                      aria-label={`Show spotlight projects for ${pillar.title}`}
                      onClick={() => focusWorkProjectsForPillar(pillar.id)}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter" && e.key !== " ") return;
                        if (e.target instanceof HTMLElement && e.target.closest("a")) return;
                        e.preventDefault();
                        focusWorkProjectsForPillar(pillar.id);
                      }}
                      onMouseEnter={() => {
                        setActiveWorkPillarIdx(pillarIdx);
                        setHoveredProject(null);
                      }}
                      onFocus={() => {
                        setActiveWorkPillarIdx(pillarIdx);
                        setHoveredProject(null);
                      }}
                      ref={(el) => {
                        if (pillarIdx >= 0) workPracticeCardRefs.current[pillarIdx] = el;
                      }}
                    >
                      <span className="rv-work-practice-card-top">
                        <span className="rv-work-practice-num" aria-hidden="true">
                          {pillar.num}
                        </span>
                        <span className="rv-work-practice-icon" aria-hidden="true">
                          <PNavIcon />
                        </span>
                      </span>
                      <span className="rv-work-practice-title">{pillar.title}</span>
                      <span className="rv-work-practice-line">{pillar.coverLine}</span>
                      <a
                        className="rv-work-practice-cta"
                        href={`#service-pillar-${pillar.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open in Services
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  );
                })}
              </div>
              <a className="rv-work-practice-all" href="#full-services">
                Full capability map
                <span aria-hidden="true">→</span>
              </a>
            </nav>

            <div className="rv-work-rotate" aria-label="Practice lane steps">
              <div className="rv-work-rotate-steps" aria-hidden="true">
                {FULL_SERVICE_PILLARS.map((pillar, i) => {
                  const short =
                    pillar.id === "ai-data" ? "AI & Data" : pillar.id === "it-software" ? "Software" : "Creative";
                  return (
                    <span
                      key={pillar.id}
                      className={`rv-work-rotate-step${i === activeWorkPillarIdx ? " rv-work-rotate-step--active" : ""}`}
                      title={pillar.title}
                    >
                      <span className="rv-work-rotate-step-num">{pillar.num}</span>
                      <span className="rv-work-rotate-step-label">{short}</span>
                    </span>
                  );
                })}
              </div>
              <p className="rv-work-rotate-hint">
                {prefersReducedMotion()
                  ? "Practice lanes are listed above; click a card to jump to its projects, or use Open in Services for the full write-up."
                  : workAutoPaused
                    ? "Paused while you explore—move the pointer out of this section to resume the lane loop."
                    : `Lanes advance every ${WORK_LANE_ROTATE_MS / 1000} seconds while you are away from this section.`}
              </p>
            </div>

            <div className="rv-work-layout" id="work-project-list" ref={workProjectsScrollRef}>
              <div className="rv-work-col-list">
                <div
                  className="rv-work-list"
                  onPointerLeave={(e) => {
                    const rel = e.relatedTarget;
                    if (rel instanceof Node && e.currentTarget.contains(rel)) return;
                    setHoveredProject(null);
                  }}
                >
                  {visibleWorkProjects.map((project, i) => (
                    <a
                      key={project.id}
                      href={project.href}
                      className={`rv-work-row${activeProject?.id === project.id ? " rv-work-row--active" : ""}`}
                      onMouseEnter={() => setHoveredProject(project)}
                      onFocus={() => setHoveredProject(project)}
                      onBlur={(e) => {
                        window.requestAnimationFrame(() => {
                          const list = e.currentTarget.closest(".rv-work-list");
                          if (list && !list.contains(document.activeElement)) {
                            setHoveredProject(null);
                          }
                        });
                      }}
                    >
                      <span className="rv-work-row-num">{String(i + 1).padStart(2, "0")}</span>
                      <div className="rv-work-row-main">
                        <span className="rv-work-row-title">{project.title}</span>
                        <span className="rv-work-row-scope">{project.scope}</span>
                        <div className="rv-work-row-details">
                          <div className="rv-work-row-details-inner">
                            <span className="rv-work-row-desc">{project.desc}</span>
                            <div className="rv-work-row-extras" aria-hidden="true">
                              <ul className="rv-work-row-highlights">
                                {project.highlights.map((line) => (
                                  <li key={line}>{line}</li>
                                ))}
                              </ul>
                              <div className="rv-work-row-tags">
                                {project.stack.map((tag) => (
                                  <span key={tag} className="rv-work-row-tag">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="rv-work-row-cat">{project.category}</span>
                      <span className="rv-work-row-year">{project.year}</span>
                      <span className="rv-work-row-arrow" aria-hidden="true">
                        &#8599;
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <aside className="rv-work-col-detail" aria-live="polite" aria-label="Project snapshot">
                <div className="rv-work-detail-card">
                  <WorkDetailPanel key={activeProject?.id ?? "__none__"} project={activeProject} />
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
