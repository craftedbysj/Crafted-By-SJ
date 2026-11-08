
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const categories = [
  {
    number: "01",
    name: "COLOR TRANSFORMS",
    subtitle: "Conversion LUTs",
    description: "Transform log footage into a colour-ready Rec.709 image.",
    slug: "color-transforms",
    image: "color-transforms.jpg",
  },
  {
    number: "02",
    name: "FILM LOOKS",
    subtitle: "Cinematic LUTs",
    description: "Create distinctive cinematic colour and atmosphere.",
    slug: "film-looks",
    image: "film-looks.jpg",
  },
  {
    number: "03",
    name: "SOUND LIBRARY",
    subtitle: "Sound Effects / SFX",
    description: "Sound effects and audio elements for your edits.",
    slug: "sound-library",
    image: "sound-library.jpg",
  },
  {
    number: "04",
    name: "VISUAL LAYERS",
    subtitle: "Overlays & Textures",
    description: "Light leaks, film grain, textures and visual overlays.",
    slug: "visual-layers",
    image: "visual-layers.jpg",
  },
  {
    number: "05",
    name: "MOTION FLOW",
    subtitle: "Video Transitions",
    description: "Transitions and movement for more dynamic edits.",
    slug: "motion-flow",
    image: "motion-flow.jpg",
  },
  {
    number: "06",
    name: "PLUGIN CABINET",
    subtitle: "Plugins & Extensions",
    description: "Useful plugins and extensions for creative software.",
    slug: "plugin-cabinet",
    image: "plugin-cabinet.jpg",
  },
  {
    number: "07",
    name: "PROMPT LAB",
    subtitle: "AI Prompts & Workflows",
    description: "Prompts and creative workflows for AI tools.",
    slug: "prompt-lab",
    image: "prompt-lab.jpg",
  },
];

export default function ResourceArchive() {
  return (
    <main className="home archive-page">
      <header className="site-header">
        <Link href="/" className="brand-mark">SJ.</Link>

        <nav className="main-nav">
          <Link href="/#work">Work</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <Link href="/" className="header-location">
          <i />
          <b />
          HOME
        </Link>
      </header>

      <section className="archive-hero">
        <div className="archive-index">02 / THE CREATIVE ARCHIVE</div>

        <div className="archive-heading">
          <h1>
            THE CREATIVE
            <br />
            <span>ARCHIVE.</span>
          </h1>

          <p>
            A curated collection of creative assets,
            visual tools and resources to shape your
            next project.
          </p>
        </div>

        <div className="archive-meta">
          <span>07 COLLECTIONS</span>
          <span>LUTS / SFX / MOTION / DESIGN / AI</span>
          <span>CURATED BY SJ</span>
        </div>
      </section>

      <section className="archive-list">
        <div className="archive-list-heading">
          <span>THE COLLECTIONS</span>
          <span>01 — 07</span>
        </div>

        {categories.map((category) => (
          <article
            className="archive-category"
            key={category.slug}
            id={category.slug}
          >
            <span className="archive-category-number">
              {category.number}
            </span>

            <div
              className="archive-category-info"
              style={{
                display: "grid",
                gridTemplateColumns: "clamp(88px, 13vw, 176px) minmax(0, 1fr)",
                alignItems: "center",
                gap: "clamp(12px, 2vw, 26px)",
                minWidth: 0,
              }}
            >
              <div
                role="img"
                aria-label={`${category.name} digital resource pack cover`}
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  backgroundImage: `url("/images/resources/${category.image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#211f1c",
                  border: "1px solid rgba(238, 234, 228, 0.16)",
                }}
              />
              <div style={{ minWidth: 0 }}>
                <h2>{category.name}</h2>
                <span>{category.subtitle}</span>
                <p>{category.description}</p>
              </div>
            </div>

            <div className="archive-category-status">
              <span>COLLECTION</span>
              <small>BEING CURATED</small>
            </div>

            <Link
              href={`#${category.slug}`}
              className="archive-category-arrow"
              aria-label={`Explore ${category.name}`}
            >
              <ArrowUpRight size={22} />
            </Link>
          </article>
        ))}
      </section>

      <footer className="archive-footer">
        <Link href="/" className="archive-back">
          <ArrowLeft size={15} />
          BACK TO CRAFTED BY SJ
        </Link>

        <span>© 2026 CRAFTED BY SJ</span>
      </footer>
    </main>
  );
}
