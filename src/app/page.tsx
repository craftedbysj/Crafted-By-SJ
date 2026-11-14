/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import Link from "next/link";
import Image from "next/image";
import {ArrowDown,ArrowUpRight,Play} from "lucide-react";
import PortfolioArchive from "@/components/PortfolioArchive";
import RecentWorks from "@/components/RecentWorks";
export default function Home(){return <main className="home">
<header className="site-header"><Link href="/" className="brand-mark">SJ.</Link><nav className="main-nav"><a href="#work">Work</a><a href="#resources">Resources</a><a href="#about">About</a><a href="#contact">Contact</a></nav><div className="header-location"><i/> <b/> INDIA, IN</div></header>
<section className="hero"><div className="hero-image"/><div className="hero-intro"><div className="section-index">01 <i/></div><p className="eyebrow">INDEPENDENT<br/>CREATIVE ARTIST<br/>BASED IN INDIA.</p><h1>CRAFTED<br/>BEYOND<br/>THE <span>FRAME.</span></h1><p className="hero-description">A visual exploration of ideas, motion,<br className="desktop-break"/> design and storytelling.</p><a href="#work" className="scroll-link"><span className="scroll-circle"><ArrowDown/></span> SCROLL TO EXPLORE</a></div><div className="hero-disciplines"><span>VISUALS</span><span>MOTION</span><span>DESIGN</span><span>STORYTELLING</span><span>//</span></div><a href="#showreel" className="showreel-card"><span className="showreel-image"><Play fill="currentColor"/></span><span className="showreel-info">SHOWREEL<small>COMING SOON</small></span><ArrowUpRight/></a></section>
<div className="hero-footer"><span>CRAFTED BY SJ</span><span>VISUAL ARTIST / VIDEO EDITOR</span><span>Â© 2026</span></div>
<section className="section" id="resources">
  <div className="section-heading">
    <div>
      <p className="eyebrow-small">02 / THE CREATIVE ARCHIVE</p>
      <h2>TOOLS FOR<br/>THE <span>CREATIVE.</span></h2>
    </div>
    <p className="section-intro">A curated collection of creative assets, visual tools and resources to shape your next project.</p>
  </div>
  <div className="section-topline">
    <span>THE CREATIVE ARCHIVE</span>
    <span>07 COLLECTIONS / CURATED BY SJ</span>
  </div>
  <Link
    href="/resources"
    className="archive-feature"
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.15fr) minmax(220px, 0.85fr)",
      alignItems: "stretch",
      gap: "clamp(24px, 5vw, 80px)",
      minHeight: "clamp(260px, 32vw, 430px)",
      padding: "clamp(24px, 4vw, 64px)",
      border: "1px solid rgba(238, 234, 228, 0.16)",
      background: "radial-gradient(ellipse at 82% 45%, rgba(169,138,112,0.24), transparent 48%), linear-gradient(135deg, #1b1a18, #10100f 72%)",
      color: "#eeeae4",
      textDecoration: "none",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "32px" }}>
      <div>
        <p className="eyebrow-small">ONE LIBRARY / SEVEN COLLECTIONS</p>
        <h3 style={{ fontSize: "clamp(2.6rem, 6vw, 6.5rem)", lineHeight: 0.9, letterSpacing: "-0.055em", fontWeight: 750, margin: "24px 0" }}>
          THE CREATIVE<br/><span style={{ color: "#a98a70" }}>ARCHIVE.</span>
        </h3>
        <p style={{ maxWidth: "440px", color: "#b8b2aa", fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.6 }}>
          LUTs, sound effects, overlays, transitions, plugins and AI prompts — gathered in one place for your next project.
        </p>
      </div>
      <span
        className="archive-claim-button"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          width: "fit-content",
          padding: "15px 22px",
          background: "#a98a70",
          color: "#10100f",
          border: "1px solid #a98a70",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          transition: "background 250ms ease, transform 250ms ease",
        }}
      >
        CLAIM FREE RESOURCES <ArrowUpRight size={17}/>
      </span>
    </div>
    <div className="archive-product-display">
      <Image
        src="/images/creative-archive-seven-packs-clean.png"
        alt="Seven Crafted By SJ creative resource packs displayed together"
        width={1095}
        height={510}
        priority
        sizes="(max-width: 700px) 100vw, 45vw"
      />
    </div>
  </Link>
  <div className="section-bottom">
    <span>MADE FOR CREATORS</span>
    <span>EXPLORE ALL SEVEN COLLECTIONS ↗</span>
  </div>
</section>
<RecentWorks />
<PortfolioArchive />
<section className="section" id="about"><div className="section-heading"><div><p className="eyebrow-small">04 / A LITTLE ABOUT ME</p><h2>THE PERSON<br/><span>BEHIND THE FRAME.</span></h2></div><p className="section-intro">Iâ€™m SJ â€” an independent creative artist working across video editing, motion design and visual storytelling. I enjoy turning ideas into thoughtful visual experiences.</p></div><div className="about-meta"><span>VIDEO EDITING</span><span>MOTION DESIGN</span><span>VISUAL ART</span><span>STORYTELLING</span></div></section>
<section className="section contact-section" id="contact"><p className="eyebrow-small">05 / LET'S CONNECT</p><h2>HAVE AN IDEA?<br/><span>LET'S MAKE IT.</span></h2><p className="section-intro">For collaborations, creative projects and enquiries, reach out through your preferred social channel.</p><div className="contact-links"><a href="https://www.instagram.com/crafted_by_sj/" target="_blank" rel="noreferrer">INSTAGRAM â†—</a><a href="https://www.linkedin.com/in/soumojitdesigns/" target="_blank" rel="noreferrer">LINKEDIN â†—</a></div></section>
<footer className="site-footer"><span>CRAFTED BY SJ</span><span>INDEPENDENT CREATIVE ARTIST</span><span>Â© 2026</span><Link href="/admin/login">ADMIN</Link></footer></main>}


