export type PortfolioProject = {
  id: string;
  title: string;
  /** Paste only the numeric Vimeo video ID here, for example: "123456789". */
  vimeoId: string;
  /** Optional direct thumbnail image URL. Leave empty to use the category artwork. */
  thumbnail: string;
};

export type PortfolioCategory = {
  slug: string;
  name: string;
  description: string;
  projects: PortfolioProject[];
};

const createProjects = (category: string): PortfolioProject[] =>
  Array.from({ length: 5 }, (_, index) => ({
    id: `${category}-${index + 1}`,
    title: `PROJECT ${String(index + 1).padStart(2, "0")}`,
    vimeoId: "",
    thumbnail: "",
  }));

/**
 * Add your projects here. Each category starts with five video slots.
 * To show a video, replace its empty vimeoId with the numeric ID from its Vimeo URL.
 * Example: https://vimeo.com/123456789 -> vimeoId: "123456789"
 * Remove unused project entries if a category has only four videos.
 */
export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "creators",
    name: "Creators",
    description: "PERSONAL BRANDS / CONTENT FILMS / CREATOR CAMPAIGNS",
    projects: createProjects("creators"),
  },
  {
    slug: "gym",
    name: "Gym",
    description: "FITNESS CAMPAIGNS / TRAINING FILMS / PERFORMANCE",
    projects: createProjects("gym"),
  },
  {
    slug: "ai",
    name: "AI",
    description: "GENERATIVE VISUALS / EXPERIMENTAL STORIES / AI FILMS",
    projects: createProjects("ai"),
  },
  {
    slug: "clubs",
    name: "Clubs",
    description: "NIGHTLIFE / EVENT PROMOS / CLUB EXPERIENCES",
    projects: createProjects("clubs"),
  },
  {
    slug: "clothing",
    name: "Clothing",
    description: "FASHION CAMPAIGNS / BRAND FILMS / PRODUCT STORIES",
    projects: createProjects("clothing"),
  },
  {
    slug: "music-videos",
    name: "Music Videos",
    description: "ARTIST VISUALS / MUSIC FILMS / PERFORMANCE",
    projects: createProjects("music-videos"),
  },
  {
    slug: "motion-graphics",
    name: "Motion Graphics",
    description: "TYPOGRAPHY / ANIMATION / VISUAL SYSTEMS",
    projects: createProjects("motion-graphics"),
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    description: "FOOD FILMS / HOSPITALITY / BRAND CAMPAIGNS",
    projects: createProjects("restaurants"),
  },
  {
    slug: "others",
    name: "Others",
    description: "SELECTED EXPERIMENTS / VISUAL STORIES / MISCELLANEOUS",
    projects: createProjects("others"),
  },
];
