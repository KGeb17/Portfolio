import { useState, useEffect, useRef } from "react";

// ── Google Fonts injected once ──
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Space+Mono:wght@400;700&display=swap";
document.head.appendChild(fontLink);

// ── Design tokens ──
const T = {
  cream: "#F7F3EE",
  warm: "#EDE6DA",
  earth: "#C4A882",
  rust: "#B85C38",
  forest: "#2D4A3E",
  night: "#1A1A18",
  gold: "#D4A843",
  muted: "#7A7268",
  text: "#1A1A18",
};

// ── Global styles ──
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: ${T.cream}; color: ${T.text}; overflow-x: hidden; }

  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.5); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatCard {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-8px) rotate(0.5deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .fade-up { opacity: 0; transform: translateY(36px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }

  .nav-link {
    font-size: 0.76rem; font-weight: 500; letter-spacing: 0.13em;
    text-transform: uppercase; color: ${T.muted}; text-decoration: none;
    transition: color 0.2s;
  }
  .nav-link:hover { color: ${T.rust}; }

  .btn-primary {
    background: ${T.rust}; color: white; padding: 0.9rem 2.2rem;
    border-radius: 5px; text-decoration: none; font-size: 0.88rem;
    font-weight: 500; letter-spacing: 0.04em; display: inline-block;
    transition: all 0.25s; border: none; cursor: pointer;
  }
  .btn-primary:hover { background: ${T.forest}; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(45,74,62,0.22); }

  .btn-outline {
    border: 1.5px solid ${T.earth}; color: ${T.forest}; padding: 0.9rem 2.2rem;
    border-radius: 5px; text-decoration: none; font-size: 0.88rem;
    font-weight: 500; letter-spacing: 0.04em; display: inline-block;
    transition: all 0.25s; background: transparent; cursor: pointer;
  }
  .btn-outline:hover { border-color: ${T.forest}; background: ${T.warm}; }

  .pillar-card {
    background: white; border: 1px solid rgba(196,168,130,0.3);
    border-radius: 18px; padding: 2rem; transition: all 0.3s; cursor: default;
  }
  .pillar-card:hover { transform: translateY(-7px); box-shadow: 0 22px 55px rgba(45,74,62,0.1); border-color: ${T.earth}; }

  .venture-card { border-radius: 18px; padding: 2rem; position: relative; overflow: hidden; }

  .timeline-dot::before {
    content: '';
    position: absolute; left: -2.15rem; top: 0.45rem;
    width: 11px; height: 11px; border-radius: 50%;
    background: ${T.rust}; border: 2px solid ${T.cream};
    box-shadow: 0 0 0 3px rgba(184,92,56,0.2);
  }

  .social-btn {
    display: inline-flex; align-items: center; gap: 0.55rem;
    padding: 0.75rem 1.5rem; border-radius: 9px; text-decoration: none;
    font-size: 0.82rem; font-weight: 500; letter-spacing: 0.04em;
    transition: all 0.25s; border: 1px solid rgba(255,255,255,0.14); color: white;
  }
  .social-btn:hover { background: rgba(255,255,255,0.09); transform: translateY(-2px); }

  @media (max-width: 860px) {
    .hero-grid    { grid-template-columns: 1fr !important; }
    .chapter-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
    .three-col    { grid-template-columns: 1fr !important; }
    .two-col      { grid-template-columns: 1fr !important; }
    .lang-grid    { grid-template-columns: repeat(2,1fr) !important; }
    .meki-grid    { grid-template-columns: 1fr !important; }
  }
`;

// ── Helpers ──
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className="fade-up"
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {visible
        ? <div style={{ animation: `fadeUp 0.75s ease ${delay}ms both` }}>{children}</div>
        : children}
    </div>
  );
}

function Tag({ children, variant = "forest" }) {
  const styles = {
    forest: { bg: "rgba(45,74,62,0.1)", color: T.forest, border: "rgba(45,74,62,0.2)" },
    rust:   { bg: "rgba(184,92,56,0.1)", color: T.rust,   border: "rgba(184,92,56,0.2)" },
    gold:   { bg: "rgba(212,168,67,0.15)", color: "#8A6A1A", border: "rgba(212,168,67,0.3)" },
    earth:  { bg: "rgba(196,168,130,0.15)", color: "#6B5535", border: "rgba(196,168,130,0.3)" },
  };
  const s = styles[variant];
  return (
    <span style={{
      padding: "0.42rem 1rem", borderRadius: "100px", fontSize: "0.78rem",
      fontWeight: 500, letterSpacing: "0.04em",
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>
      {children}
    </span>
  );
}

// ── NAV ──
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.3rem 4rem",
      background: scrolled ? "rgba(247,243,238,0.92)" : "rgba(247,243,238,0.6)",
      backdropFilter: "blur(14px)",
      borderBottom: scrolled ? `1px solid rgba(196,168,130,0.25)` : "1px solid transparent",
      transition: "all 0.35s ease",
    }}>
      <a href="#" style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem",
        fontWeight: 600, letterSpacing: "0.05em", color: T.forest, textDecoration: "none",
      }}>Kalkidan G.</a>
      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
        {[["#work","Work"],["#impact","Impact"],["#content","Content"],["#ventures","Ventures"],["#contact","Connect"]].map(([href, label]) => (
          <li key={href}><a href={href} className="nav-link">{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

// ── HERO ──
function Hero() {
  return (
    <section style={{ minHeight: "100vh", padding: "8rem 4rem 4rem", position: "relative", overflow: "hidden" }}>
      {/* background orb */}
      <div style={{
        position: "absolute", top: "-15%", right: "-8%",
        width: 650, height: 650, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(196,168,130,0.16) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "4rem", maxWidth: 1200, margin: "0 auto" }}>
        {/* LEFT */}
        <div>
          <FadeUp delay={0}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.55rem",
              background: T.forest, color: T.gold, fontSize: "0.72rem",
              fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "0.42rem 1.1rem", borderRadius: "100px", marginBottom: "1.8rem",
            }}>
              <span style={{ width: 7, height: 7, background: T.gold, borderRadius: "50%", animation: "pulse 2s infinite" }} />
              Open to Opportunities
            </div>
          </FadeUp>

          <FadeUp delay={80}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem,6vw,6rem)", fontWeight: 300,
              lineHeight: 1.05, color: T.night, marginBottom: "0.2rem",
            }}>
              Kalkidan<br />
              <em style={{ fontStyle: "italic", color: T.rust }}>Gebremichael</em>
            </h1>
          </FadeUp>

          <FadeUp delay={160}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.05rem,1.8vw,1.45rem)", fontWeight: 300,
              color: T.muted, marginBottom: "1.8rem", fontStyle: "italic",
            }}>
              Builder. Leader. Storyteller.
            </p>
          </FadeUp>

          <FadeUp delay={240}>
            <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: "#4A4540", maxWidth: 490, marginBottom: "2.5rem" }}>
              Industrial Engineer turned Amazon Operations Leader. Davis Peace Project recipient.
              Directing a children's show in Addis. Building financial literacy for the Ethiopian
              diaspora — one Amharic reel at a time.
            </p>
          </FadeUp>

          <FadeUp delay={320}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#work" className="btn-primary">See My Work</a>
              <a href="#contact" className="btn-outline">Let's Connect</a>
            </div>
          </FadeUp>
        </div>

        {/* RIGHT — floating card stack */}
        <FadeUp delay={200} style={{ display: "flex", justifyContent: "center" }}>
          <HeroCard />
        </FadeUp>
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div style={{ position: "relative", width: 360, height: 490 }}>
      {/* back cards */}
      <div style={{ position: "absolute", inset: 0, background: T.forest, borderRadius: 18, transform: "rotate(4deg)" }} />
      <div style={{ position: "absolute", inset: 0, background: T.earth, borderRadius: 18, transform: "rotate(-2deg)" }} />
      {/* main */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 18,
        background: T.warm, border: `1px solid rgba(196,168,130,0.4)`,
        overflow: "hidden", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "1.8rem",
        animation: "floatCard 5s ease-in-out infinite",
      }}>
        {/* green top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "63%",
          background: `linear-gradient(155deg, ${T.forest} 0%, #3A6B5A 100%)`,
        }} />
        {/* avatar */}
        <div style={{ position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%" }}>
          <div style={{
            width: 100, height: 100, background: T.gold, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Cormorant Garamond', serif", fontSize: "2.3rem", fontWeight: 600,
            color: T.forest, margin: "0 auto 0.9rem",
            border: "3px solid rgba(255,255,255,0.18)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}>KG</div>
          <div style={{ color: "white", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.45rem", fontWeight: 400 }}>Kalkidan G.</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem" }}>Ops Leader · Creator · Builder</div>
        </div>
        {/* stats */}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", marginTop: "5rem" }}>
          {[["60+","Teams Led"],["4","Languages"],["$10K","Davis Award"],["2","Cafes 🧋"]].map(([num, lbl]) => (
            <div key={lbl} style={{ background: "white", borderRadius: 9, padding: "0.6rem 0.7rem", textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", fontWeight: 700, color: T.rust }}>{num}</div>
              <div style={{ fontSize: "0.64rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TICKER ──
function Ticker() {
  const items = ["Amazon Operations Leader","Davis Peace Project 2021","UWC Adriatic · Italy","Methodist University","Lean Six Sigma Certified","Future of Energy · Sudan","Meki in Merkato","Boba Café · Addis Ababa","Finance Literacy in Amharic","4 Languages Fluent","Industrial Engineering","Generational Wealth Builder"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: T.forest, color: T.gold, padding: "0.95rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-block", animation: "ticker 32s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.13em", textTransform: "uppercase", margin: "0 3rem" }}>
            ✦&nbsp;&nbsp;{item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── CHAPTER WRAPPER ──
function Chapter({ id, bg = T.cream, reverse = false, children }) {
  return (
    <section id={id} style={{ background: bg, borderTop: `1px solid rgba(196,168,130,0.22)` }}>
      <div className="chapter-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem",
        alignItems: "center", padding: "6rem 4rem",
        maxWidth: 1200, margin: "0 auto",
        direction: reverse ? "rtl" : "ltr",
      }}>
        {children}
      </div>
    </section>
  );
}

function ChapterContent({ children }) {
  return <div style={{ direction: "ltr", position: "relative" }}>{children}</div>;
}

function SectionLabel({ children }) {
  return (
    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.rust, marginBottom: "0.7rem" }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,4vw,3.4rem)", fontWeight: 300, lineHeight: 1.1, color: T.night, marginBottom: "1.1rem" }}>
      {children}
    </h2>
  );
}

function Body({ children, style = {} }) {
  return <p style={{ fontSize: "0.95rem", lineHeight: 1.78, color: "#4A4540", ...style }}>{children}</p>;
}

// ── CHAPTER 01: WORK ──
function WorkChapter() {
  return (
    <Chapter id="work">
      <ChapterContent>
        <FadeUp>
          <SectionLabel>Professional Experience</SectionLabel>
          <SectionTitle>I lead at <em style={{ fontStyle: "italic", color: T.rust }}>scale</em></SectionTitle>
          <Body style={{ marginBottom: "1.6rem" }}>
            With 2+ years at one of the world's largest ecommerce companies, I managed operations
            across 60+ teams — driving efficiency, process improvement, and people-first leadership
            inside Amazon's high-velocity environment.
          </Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem", marginBottom: "2rem" }}>
            {[["Amazon","forest"],["Lean Six Sigma","gold"],["Process Optimization","rust"],["Industrial Engineering","earth"],["Team Leadership","forest"],["Operations","rust"]].map(([t,v]) => <Tag key={t} variant={v}>{t}</Tag>)}
          </div>
        </FadeUp>

        <FadeUp delay={120}>
          {/* Timeline */}
          <div style={{ borderLeft: `2px solid ${T.earth}`, paddingLeft: "2rem", marginTop: "0.5rem" }}>
            {[
              { year: "2022 – Present", role: "Operations Manager", place: "Amazon · United States", body: "Led cross-functional fulfillment operations across 60+ team leads. Applied Lean Six Sigma methodologies to cut waste, improve throughput, and build high-performing people-first teams." },
              { year: "2018 – 2022", role: "B.Sc. Industrial Engineering", place: "Methodist University · Full Ride Scholarship", body: "Systems thinking, operations research, and process design — the technical foundation behind everything I build." },
            ].map(({ year, role, place, body }, i) => (
              <div key={i} className="timeline-dot" style={{ position: "relative", paddingBottom: i === 0 ? "2rem" : 0 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: T.rust, letterSpacing: "0.1em", marginBottom: "0.25rem" }}>{year}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, color: T.night, marginBottom: "0.15rem" }}>{role}</div>
                <div style={{ fontSize: "0.8rem", color: T.muted, marginBottom: "0.5rem" }}>{place}</div>
                <Body>{body}</Body>
              </div>
            ))}
          </div>
        </FadeUp>
      </ChapterContent>

      <FadeUp delay={150}>
        <div style={{ background: T.forest, borderRadius: 20, padding: "3rem 2.5rem", position: "relative", overflow: "hidden", color: "white" }}>
          <div style={{ position: "absolute", bottom: "-2.5rem", right: "-2.5rem", width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", top: "-1rem", left: "-1rem", width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5.5rem", fontWeight: 300, lineHeight: 1, color: T.gold, marginBottom: "0.3rem" }}>60+</div>
          <div style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.65, marginBottom: "1rem" }}>Teams Managed at Amazon</div>
          <Body style={{ color: "rgba(255,255,255,0.78)" }}>
            From daily standups to strategic process redesigns — leading at scale means every decision
            multiplies across hundreds of people and millions of packages.
          </Body>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            {["Yellow Belt","Lean Six Sigma","Process Design"].map(t => (
              <span key={t} style={{ background: "rgba(212,168,67,0.18)", color: T.gold, padding: "0.28rem 0.85rem", borderRadius: "100px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t}</span>
            ))}
          </div>
        </div>
      </FadeUp>
    </Chapter>
  );
}

// ── CHAPTER 02: IMPACT ──
function ImpactChapter() {
  return (
    <Chapter id="impact" bg={T.warm} reverse>
      <ChapterContent>
        <FadeUp>
          <SectionLabel>Global Impact</SectionLabel>
          <SectionTitle>Peace is a <em style={{ fontStyle: "italic", color: T.rust }}>project</em></SectionTitle>
          <Body style={{ marginBottom: "1.3rem" }}>
            Awarded the <strong>$10,000 Davis Peace Project Prize in 2021</strong> for leading the{" "}
            <em>Future of Energy</em> project in Sudan — a community-driven initiative exploring
            sustainable energy access. Proof that young Africans are already solving tomorrow's
            problems today.
          </Body>
          <Body style={{ marginBottom: "1.6rem" }}>
            Prior to this, a <strong>full-ride scholarship to UWC Adriatic College in Italy</strong>{" "}
            placed me in a global network of changemakers from 150+ countries — cementing my belief
            that cross-cultural collaboration is the most powerful lever for change.
          </Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
            {[["Davis Peace Project","rust"],["Sudan · Energy","forest"],["UWC Adriatic · Italy","gold"],["Sustainability","earth"]].map(([t,v]) => <Tag key={t} variant={v}>{t}</Tag>)}
          </div>
        </FadeUp>
      </ChapterContent>

      <FadeUp delay={150} style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: "1.2rem", alignItems: "center" }}>
        {/* Award badge */}
        <div style={{
          background: `linear-gradient(135deg, ${T.gold}, #B8882A)`,
          color: T.night, padding: "2.2rem 2.5rem", borderRadius: 18,
          textAlign: "center", width: "100%", maxWidth: 300,
          boxShadow: "0 16px 48px rgba(212,168,67,0.3)",
        }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.8rem", fontWeight: 600, lineHeight: 1 }}>$10K</div>
          <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.72, margin: "0.5rem 0" }}>Davis Peace Project · 2021</div>
          <div style={{ fontSize: "0.85rem", fontStyle: "italic", opacity: 0.65, marginTop: "0.8rem" }}>"Future of Energy" · Sudan</div>
        </div>
        {/* UWC card */}
        <div style={{
          background: "white", border: `1px solid rgba(196,168,130,0.35)`,
          borderRadius: 16, padding: "1.5rem 2rem", textAlign: "center", width: "100%", maxWidth: 300,
        }}>
          <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>🌍</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: T.forest, marginBottom: "0.3rem" }}>UWC Adriatic College</div>
          <div style={{ fontSize: "0.82rem", color: T.muted, lineHeight: 1.55 }}>Full Ride Scholarship · Trieste, Italy<br />International Baccalaureate</div>
        </div>
      </FadeUp>
    </Chapter>
  );
}

// ── CHAPTER 03: CONTENT ──
function ContentChapter() {
  return (
    <section id="content" style={{ background: T.cream, borderTop: `1px solid rgba(196,168,130,0.22)`, padding: "6rem 4rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Mission banner */}
        <FadeUp>
          <div style={{ background: T.forest, borderRadius: 22, padding: "3.5rem", marginBottom: "3rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-3rem", right: "-3rem", width: 240, height: 240, borderRadius: "50%", background: "rgba(212,168,67,0.07)", pointerEvents: "none" }} />
            <SectionLabel>Content & Community</SectionLabel>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3.1rem)", fontWeight: 300, color: "white", lineHeight: 1.18, maxWidth: 680, marginBottom: "1.4rem" }}>
              I create because someone once needed{" "}
              <em style={{ fontStyle: "italic", color: T.gold }}>this content</em>
              {" "}and it didn't exist.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.97rem", lineHeight: 1.78, maxWidth: 600 }}>
              Growing up between Ethiopia, Italy, and the US — I lived at the intersection of cultures,
              languages, and systems. I saw how access to the right information changed outcomes.
              So now I make it. In English. In Amharic. In whatever format reaches the person who needs it most.
            </p>
          </div>
        </FadeUp>

        {/* Two platform cards */}
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.8rem", marginBottom: "1.8rem" }}>
          <FadeUp delay={0}>
            <div style={{ background: "white", border: `1px solid rgba(196,168,130,0.3)`, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ background: T.night, padding: "2rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-1rem", right: "-1rem", width: 100, height: 100, borderRadius: "50%", background: "rgba(212,168,67,0.07)" }} />
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>🖥️</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "white", marginBottom: "0.8rem" }}>Tech & Career</h3>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {[{label:"LinkedIn",color:"rgba(10,102,194,0.3)",text:"#6AADFF"},{label:"YouTube · Soon",color:"rgba(255,255,255,0.08)",text:"rgba(255,255,255,0.5)"}].map(({ label, color, text }) => (
                    <span key={label} style={{ background: color, color: text, padding: "0.25rem 0.75rem", borderRadius: "100px", fontSize: "0.67rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
                  ))}
                </div>
              </div>
              <div style={{ padding: "1.8rem 2rem" }}>
                <Body style={{ marginBottom: "1.4rem" }}>
                  Behind-the-scenes of working in big tech. The realities of Amazon operations,
                  breaking into data science, navigating a career as a first-generation African
                  professional, and what no one tells you about engineering roles in the US.
                </Body>
                <div style={{ borderTop: `1px solid rgba(196,168,130,0.2)`, paddingTop: "1.2rem" }}>
                  <p style={{ fontSize: "0.72rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.7rem" }}>Topics</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {[["Data Science","forest"],["Big Tech Life","forest"],["Career Strategy","forest"],["First-Gen Pros","earth"]].map(([t,v]) => <Tag key={t} variant={v}>{t}</Tag>)}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={120}>
            <div style={{ background: "white", border: `1px solid rgba(196,168,130,0.3)`, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ background: T.rust, padding: "2rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-1rem", right: "-1rem", width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>💰</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "white", marginBottom: "0.8rem" }}>Finance in Amharic</h3>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {["Instagram","TikTok","Facebook"].map(p => (
                    <span key={p} style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "100px", fontSize: "0.67rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p}</span>
                  ))}
                </div>
              </div>
              <div style={{ padding: "1.8rem 2rem" }}>
                <Body style={{ marginBottom: "1.4rem" }}>
                  The Ethiopian diaspora deserves financial education in their own language.
                  Investing, budgeting, building credit, and generational wealth — entirely in Amharic.
                  Because the gap isn't ambition. It's access.
                </Body>
                <div style={{ borderTop: `1px solid rgba(196,168,130,0.2)`, paddingTop: "1.2rem" }}>
                  <p style={{ fontSize: "0.72rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.7rem" }}>Topics</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {[["Investing","rust"],["Generational Wealth","rust"],["Budgeting","rust"],["Diaspora Finance","earth"]].map(([t,v]) => <Tag key={t} variant={v}>{t}</Tag>)}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Meki full-width */}
        <FadeUp delay={80}>
          <div className="meki-grid" style={{ background: `linear-gradient(135deg, #1A1A18 0%, #2D1F0E 100%)`, borderRadius: 22, padding: "3rem", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3rem", alignItems: "center", position: "relative", overflow: "hidden", marginBottom: "1.8rem" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: `radial-gradient(circle, rgba(212,168,67,0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(212,168,67,0.14)", border: "1px solid rgba(212,168,67,0.3)", color: T.gold, padding: "0.35rem 0.9rem", borderRadius: "100px", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
                <span style={{ width: 6, height: 6, background: T.gold, borderRadius: "50%", animation: "pulse 2s infinite" }} />
                In Production
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 400, color: "white", lineHeight: 1.1, marginBottom: "1rem" }}>
                Meki in <em style={{ color: T.gold, fontStyle: "italic" }}>Merkato</em>
              </h3>
              <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.95rem", lineHeight: 1.78, marginBottom: "1.4rem" }}>
                A children's show set in Merkato — the largest open-air market in Africa. Think
                SpongeBob's warmth and wit, reimagined to show young Africans that they can build,
                create, and solve. Every episode is a lesson in curiosity, resilience, and community.
              </p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", fontStyle: "italic" }}>
                "If the stories we grow up with shape who we become — let's change the stories."
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[["🎬","Director","Role"],["🌍","Addis Ababa","Location"]].map(([emoji, val, lbl]) => (
                <div key={lbl} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "1.2rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{emoji}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "white", fontWeight: 600 }}>{val}</div>
                  <div style={{ fontSize: "0.66rem", color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 3 }}>{lbl}</div>
                </div>
              ))}
              <div style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: 13, padding: "1.2rem", textAlign: "center", gridColumn: "1/-1" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: T.gold, fontWeight: 600, marginBottom: "0.3rem" }}>Target Audience</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>Young Africans aged 4–12 across the continent and diaspora</div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Mission triptych */}
        <div className="three-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
          {[
            { label: "The Mission", bg: T.warm, border: true, color: T.night, accent: T.rust, text: "Knowledge shouldn't be gated by language, geography, or who your parents knew." },
            { label: "The Gap",     bg: T.warm, border: true, color: T.night, accent: T.rust, text: "Millions of Ethiopians navigate finance, tech, and careers without content made for them." },
            { label: "The Answer",  bg: T.forest, border: false, color: "white", accent: T.gold, text: "I create it. In Amharic, in English, and in every format that works — until the gap closes." },
          ].map(({ label, bg, border, color, accent, text }) => (
            <FadeUp key={label}>
              <div style={{ background: bg, border: border ? `1px solid rgba(196,168,130,0.3)` : "none", borderRadius: 17, padding: "1.8rem" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: accent, marginBottom: "0.7rem" }}>{label}</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 400, color, lineHeight: 1.55 }}>{text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CHAPTER 04: VENTURES ──
function VenturesChapter() {
  return (
    <Chapter id="ventures" bg={T.warm} reverse>
      <ChapterContent>
        <FadeUp>
          <SectionLabel>Entrepreneurship & Life</SectionLabel>
          <SectionTitle>I don't just teach wealth —{" "}<em style={{ fontStyle: "italic", color: T.rust }}>I build it</em></SectionTitle>
          <Body style={{ marginBottom: "1.3rem" }}>
            Two boba cafes in Addis Ababa. A children's TV show in production. Side businesses
            aren't side projects — they're the proof of concept for everything I teach.
            Generational wealth starts with owning something.
          </Body>
          <Body style={{ marginBottom: "1.8rem" }}>
            When I'm not working or creating, I'm on a yoga mat, lifting heavy, hiking somewhere
            beautiful, or exploring a new country. Fluent in four languages and always learning.
          </Body>

          {/* Languages */}
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: T.rust, marginBottom: "0.9rem" }}>Languages</p>
          <div className="lang-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.9rem" }}>
            {[["🇪🇹","Amharic","Native"],["🇺🇸","English","Fluent"],["🇮🇹","Italian","Fluent"],["🌍","+ More","4 total"]].map(([flag, name, level]) => (
              <div key={name} style={{ background: "white", border: `1px solid rgba(196,168,130,0.3)`, borderRadius: 12, padding: "1.1rem 0.7rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.7rem", marginBottom: "0.4rem" }}>{flag}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600, color: T.night }}>{name}</div>
                <div style={{ fontSize: "0.66rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{level}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </ChapterContent>

      <FadeUp delay={150} style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <div className="venture-card" style={{ background: T.forest, color: "white" }}>
          <div style={{ position: "absolute", bottom: "-2rem", right: "-2rem", width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <span style={{ fontSize: "2.2rem", display: "block", marginBottom: "0.8rem" }}>🧋</span>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>Boba Cafes · Addis Ababa</div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.65, opacity: 0.82 }}>Two cafes in the heart of Addis. Building community, creating jobs, and proving that African entrepreneurship is alive and thriving.</p>
        </div>
        <div className="venture-card" style={{ background: T.rust, color: "white" }}>
          <div style={{ position: "absolute", bottom: "-2rem", right: "-2rem", width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontSize: "2.2rem", display: "block", marginBottom: "0.8rem" }}>🎥</span>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>Meki in Merkato</div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.65, opacity: 0.82 }}>Directing a children's show with the heart of SpongeBob and the soul of Africa — teaching kids to build, create, and lead.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {[["🧘","Yoga & Fitness"],["✈️","Travel · 4 Languages"],["🌱","Generational Wealth"],["☀️","Outdoors & Nature"]].map(([emoji, label]) => (
            <div key={label} style={{ background: "white", border: `1px solid rgba(196,168,130,0.3)`, borderRadius: 12, padding: "1rem", display: "flex", alignItems: "center", gap: "0.7rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{emoji}</span>
              <span style={{ fontSize: "0.82rem", fontWeight: 500, color: T.text, lineHeight: 1.4 }}>{label}</span>
            </div>
          ))}
        </div>
      </FadeUp>
    </Chapter>
  );
}

// ── CONTACT ──
function Contact() {
  return (
    <section id="contact" style={{ background: T.night, padding: "8rem 4rem", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <FadeUp>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: "0.8rem" }}>Let's Connect</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: "white", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Ready to <em style={{ fontStyle: "italic", color: T.gold }}>collaborate?</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.97rem", lineHeight: 1.78, marginBottom: "2.5rem" }}>
            Whether it's a speaking opportunity, brand partnership, consulting project,
            or just a great conversation — I'd love to hear from you.
          </p>
          <a href="mailto:hello@kalkidan.com" className="btn-primary" style={{ fontSize: "1rem", padding: "1rem 2.8rem", display: "inline-block", marginBottom: "3rem" }}>
            Say Hello →
          </a>
          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/kgeb17", icon: "in" },
              { label: "Instagram", href: "https://instagram.com", icon: "ig" },
              { label: "TikTok", href: "https://tiktok.com", icon: "tt" },
              { label: "Facebook", href: "https://facebook.com", icon: "fb" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="social-btn">{label}</a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: T.night, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center", padding: "2rem 4rem", color: "rgba(255,255,255,0.25)", fontSize: "0.76rem", letterSpacing: "0.06em" }}>
      © 2026 Kalkidan Gebremichael · Addis Ababa ✦ Seattle
    </footer>
  );
}

// ── ROOT ──
export default function Portfolio() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <WorkChapter />
      <ImpactChapter />
      <ContentChapter />
      <VenturesChapter />
      <Contact />
      <Footer />
    </>
  );
}
