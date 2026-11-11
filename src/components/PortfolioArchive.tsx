import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioCategories } from "@/lib/portfolio";
import styles from "./PortfolioIndex.module.css";

const artworkClassBySlug: Record<string, string> = {
  creators: styles.artworkCreators,
  gym: styles.artworkGym,
  ai: styles.artworkAi,
  clubs: styles.artworkClubs,
  clothing: styles.artworkClothing,
  "music-videos": styles.artworkMusic,
  "motion-graphics": styles.artworkMotion,
  restaurants: styles.artworkRestaurants,
  others: styles.artworkOthers,
  "real-estate": styles.artworkRealEstate,
};

export default function PortfolioArchive() {
  return (
    <section className={`section ${styles.portfolioSection}`} id="work">
      <div className="section-heading">
        <div>
          <p className="eyebrow-small">03 / SELECTED WORK</p>
          <h2>MADE WITH<br /><span>INTENTION.</span></h2>
        </div>
        <p className="section-intro">A collection of films, campaigns and visual experiments across different worlds.</p>
      </div>

      <div className={styles.indexTopline}>
        <span>EXPLORE BY DISCIPLINE</span>
        <span>{String(portfolioCategories.length).padStart(2, "0")} COLLECTIONS / SELECTED PROJECTS</span>
      </div>

      <div className={styles.categoryGrid}>
        {portfolioCategories.map((category, index) => (
          <Link
            className={styles.categoryCard}
            href={`/work/${category.slug}`}
            key={category.slug}
            aria-label={`View ${category.name} portfolio`}
          >
            <div className={`${styles.cardArtwork} ${artworkClassBySlug[category.slug] || styles.artworkOthers}`}>
              <div className={styles.cardTopline}>
                <span>CRAFTED BY SJ</span>
                <span>{String(index + 1).padStart(2, "0")} / {String(portfolioCategories.length).padStart(2, "0")}</span>
              </div>
              <div className={styles.artworkWord}>{category.name.toUpperCase()}</div>
              <span className={styles.artworkRule} />
              <div className={styles.artworkFoot}>
                <span>SELECTED VISUALS</span>
                <span>{String(category.projects.length).padStart(2, "0")} FILMS</span>
              </div>
              <span className={styles.cardArrow}><ArrowUpRight size={19} /></span>
            </div>
            <div className={styles.cardDetails}>
              <div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
              <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.indexFooter}>
        <span>CRAFTED BY SJ / PORTFOLIO</span>
        <span>SELECT A DISCIPLINE TO EXPLORE <ArrowUpRight size={13} /></span>
      </div>
    </section>
  );
}