
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";

export default function Home() {
  return (
    <main className="home">
      <header className="site-header">
        <a href="#" className="brand-mark">SJ.</a>

        <nav className="main-nav">
          <a href="#work">Work</a>
          <a href="#resources">Resources</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-location">
          <span className="location-line" />
          <span className="location-dot" />
          <span>INDIA, IN</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-image" />

        <div className="hero-intro">
          <div className="section-index">
            <span>01</span>
            <span className="index-line" />
          </div>

          <p className="eyebrow">
            INDEPENDENT<br />
            CREATIVE ARTIST<br />
            BASED IN INDIA.
          </p>

          <h1>
            CRAFTED
            <br />
            BEYOND
            <br />
            THE <span>FRAME.</span>
          </h1>

          <p className="hero-description">
            A visual exploration of ideas, motion,
            <br className="desktop-break" />
            design and storytelling.
          </p>

          <a href="#work" className="scroll-link">
            <span className="scroll-circle">
              <ArrowDown size={23} strokeWidth={1.3} />
            </span>
            <span>SCROLL TO EXPLORE</span>
          </a>
        </div>

        <div className="hero-disciplines">
          <span>VISUALS</span>
          <span>MOTION</span>
          <span>DESIGN</span>
          <span>STORYTELLING</span>
          <span className="discipline-mark">//</span>
        </div>

        <a href="#showreel" className="showreel-card">
          <div className="showreel-image">
            <Play size={19} fill="currentColor" />
          </div>
          <div className="showreel-info">
            <span>SHOWREEL</span>
            <small>COMING SOON</small>
          </div>
          <ArrowUpRight size={17} className="showreel-arrow" />
        </a>
      </section>

      <div className="hero-footer">
        <span>CRAFTED BY SJ</span>
        <span>VISUAL ARTIST / VIDEO EDITOR</span>
        <span>© 2026</span>
      </div>
      
      <section className="resources-section" id="resources">
        <div className="resources-heading">
          <div>
            <p className="resources-eyebrow">02 / THE CREATIVE ARCHIVE</p>
            <h2>
              TOOLS FOR
              <br />
              THE <span>CREATIVE.</span>
            </h2>
          </div>

          <p className="resources-description">
            A curated collection of resources, tools and creative assets
            to make your workflow better.
          </p>
        </div>

        <div className="resources-topline">
          <span>SELECTED RESOURCES</span>
          <span>EXPLORE THE COLLECTION ↗</span>
        </div>

        <div className="resources-grid">
          <a href="#" className="resource-item">
            <div className="resource-visual resource-one">
              <span>01 / COLOUR</span>
              <strong>LUT<br />COLLECTION</strong>
              <span className="resource-arrow">↗</span>
            </div>
            <div className="resource-details">
              <h3>Colour Grading LUTs</h3>
              <span>PREMIERE PRO / DAVINCI RESOLVE</span>
            </div>
          </a>

          <a href="#" className="resource-item">
            <div className="resource-visual resource-two">
              <span>02 / MOTION</span>
              <strong>MOTION<br />PRESETS</strong>
              <span className="resource-arrow">↗</span>
            </div>
            <div className="resource-details">
              <h3>Motion & Animation</h3>
              <span>AFTER EFFECTS / PREMIERE PRO</span>
            </div>
          </a>

          <a href="#" className="resource-item">
            <div className="resource-visual resource-three">
              <span>03 / WORKFLOW</span>
              <strong>CREATIVE<br />TOOLS</strong>
              <span className="resource-arrow">↗</span>
            </div>
            <div className="resource-details">
              <h3>Editing Resources</h3>
              <span>TOOLS / PLUGINS / DOWNLOADS</span>
            </div>
          </a>
        </div>

        <div className="resources-bottom">
          <span>MADE FOR CREATORS</span>
          <span>MORE RESOURCES COMING SOON ↗</span>
        </div>
      </section>

    </main>
  );
}

