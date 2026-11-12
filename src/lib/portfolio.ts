export type PortfolioProject = {
  id: string;
  title: string;
  /** Paste only the numeric Vimeo video ID here, for example: "123456789". */
  vimeoId: string;
  vimeoHash?: string;
  /** Optional direct thumbnail image URL. Leave empty to use the category artwork. */
  thumbnail: string;
  aspectRatio?: string;
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
    projects: [
      { id: "creators-1", title: "PROJECT 01", vimeoId: "1244853693", vimeoHash: "11e27f0db2", thumbnail: "" },
      { id: "creators-2", title: "PROJECT 02", vimeoId: "1244853654", vimeoHash: "bf1d3d2ca7", thumbnail: "" },
      { id: "creators-3", title: "PROJECT 03", vimeoId: "1244853656", vimeoHash: "ba386d8bff", thumbnail: "" },
      { id: "creators-4", title: "PROJECT 04", vimeoId: "1244853655", thumbnail: "" },
      { id: "creators-5", title: "PROJECT 05", vimeoId: "1244853653", thumbnail: "" },
    ],
  },
  {
    slug: "gym",
    name: "Gym",
    description: "FITNESS CAMPAIGNS / TRAINING FILMS / PERFORMANCE",
    projects: [
      { id: "gym-1", title: "PROJECT 01", vimeoId: "1245746199", thumbnail: "https://i.vimeocdn.com/video/2224962990-435b5e89afeb013711b1b49ef329af3f3077f24b1667b806060c20fb09b98136-d_1280?region=us", aspectRatio: "1280 / 720" },
      { id: "gym-2", title: "PROJECT 02", vimeoId: "1245746423", thumbnail: "https://i.vimeocdn.com/video/2224963457-9f24814e98c78ba294031d61e825c00711c580c5e1b6d081c8c2615af9f2c621-d_1280?region=us", aspectRatio: "1280 / 723" },
      { id: "gym-3", title: "PROJECT 03", vimeoId: "1245746350", thumbnail: "https://i.vimeocdn.com/video/2224964043-dd7339b94d7aae8ae98a59c60e611db0cc7d01b6efd61d4ab01d449fdb4bcbbd-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "gym-4", title: "PROJECT 04", vimeoId: "1245746198", thumbnail: "https://i.vimeocdn.com/video/2224965949-befbdb7b7915a3f0fc305ffb6d5bd8371b93a99275be873494717d075c06be19-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "gym-5", title: "PROJECT 05", vimeoId: "1245746200", thumbnail: "https://i.vimeocdn.com/video/2224966539-0676a69cc22dcbe57c07e2d7a043278fe1ebfd0f2280b3ec20735439b6c8ec1c-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "gym-6", title: "PROJECT 06", vimeoId: "1245746326", thumbnail: "https://i.vimeocdn.com/video/2224966840-8b7a73d6aaea320e012684338f04b0ae557b01301c7ea71fd7ed12f03eae9d76-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "gym-7", title: "PROJECT 07", vimeoId: "1245746197", thumbnail: "https://i.vimeocdn.com/video/2224967941-eab06f1236bd878b9ccbaf090630c65d261c5373e6146c806bc2e8a477f43d95-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "gym-8", title: "PROJECT 08", vimeoId: "1245746355", thumbnail: "https://i.vimeocdn.com/video/2224968304-3541d57be6f5009f0c20093d034beaa139bbf2f39e6f95e04dea762eefb17774-d_640?region=us", aspectRatio: "720 / 1280" },
    ],
  },
  {
    slug: "ai",
    name: "AI",
    description: "GENERATIVE VISUALS / EXPERIMENTAL STORIES / AI FILMS",
    projects: [
      { id: "ai-1", title: "PROJECT 01", vimeoId: "1244600534", thumbnail: "" },
      { id: "ai-2", title: "PROJECT 02", vimeoId: "1244600535", thumbnail: "" },
      { id: "ai-3", title: "PROJECT 03", vimeoId: "1244600536", thumbnail: "" },
      { id: "ai-4", title: "PROJECT 04", vimeoId: "1244600533", thumbnail: "" },
    ],
  },
  {
    slug: "clubs",
    name: "Clubs",
    description: "NIGHTLIFE / EVENT PROMOS / CLUB EXPERIENCES",
    projects: [
      { id: "clubs-1", title: "PROJECT 01", vimeoId: "1245752403", thumbnail: "https://i.vimeocdn.com/video/2224974415-5a518dc17d8faf242ed45998a16a29dfc7db83b0b03c472ecf0d68cbaf5d809f-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "clubs-2", title: "PROJECT 02", vimeoId: "1245752404", thumbnail: "https://i.vimeocdn.com/video/2224975057-8bd296acd0dfcf5ec798262de319709385d5ff70e525ad9233c8448b396f4474-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "clubs-3", title: "PROJECT 03", vimeoId: "1245752402", thumbnail: "https://i.vimeocdn.com/video/2224975815-ea2104707a9d630e48a8878e1dc93e324237caeae4f5c074b9011a76d8f9b175-d_640?region=us", aspectRatio: "720 / 1280" },
    ],
  },
  {
    slug: "clothing",
    name: "Clothing",
    description: "FASHION CAMPAIGNS / BRAND FILMS / PRODUCT STORIES",
    projects: [
      { id: "clothing-1", title: "PROJECT 01", vimeoId: "1245754819", thumbnail: "https://i.vimeocdn.com/video/2224983986-2e947ac7f1b53e2db4d9e47290d16971cdfd1aaa871d4833cd22564556f739da-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "clothing-2", title: "PROJECT 02", vimeoId: "1245754875", thumbnail: "https://i.vimeocdn.com/video/2224984853-1fee78cedf622c481208cfc54ad67c222d87bf4fcb9553b33d4c0c61b4a2119f-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "clothing-3", title: "PROJECT 03", vimeoId: "1245754874", thumbnail: "https://i.vimeocdn.com/video/2224985047-e0b8f3311fb7cdf12b5931e690c6b77f4139fbca2bb956a2361376c5c3c1644d-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "clothing-4", title: "PROJECT 04", vimeoId: "1245754852", thumbnail: "https://i.vimeocdn.com/video/2224985314-d66bc268e7d8488d86e4d89770d1860cf0fe771c5ddf57b9f8d312acad422889-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "clothing-5", title: "PROJECT 05", vimeoId: "1245754817", thumbnail: "https://i.vimeocdn.com/video/2224985839-69ebbde4f0d937a4a0582f89614920634fc542128ee31db718c66f3d453c9ec5-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "clothing-6", title: "PROJECT 06", vimeoId: "1245754881", thumbnail: "https://i.vimeocdn.com/video/2224985523-3eaf5cd688edb6a4d31730f279c9514ef617a64afbd64e2d678a8accae2b0ff0-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "clothing-7", title: "PROJECT 07", vimeoId: "1245754818", thumbnail: "https://i.vimeocdn.com/video/2224986187-332c8cf68d4a6176955283c3a4d4e9ad1fbc0045ebff8a794e943f90bc871b33-d_640?region=us", aspectRatio: "720 / 1280" },
    ],
  },
  {
    slug: "music-videos",
    name: "Music Videos",
    description: "ARTIST VISUALS / MUSIC FILMS / PERFORMANCE",
    projects: [
      { id: "music-videos-1", title: "PROJECT 01", vimeoId: "1245759921", thumbnail: "https://i.vimeocdn.com/video/2224980220-9918e290ee9c02632ed30c98ae0504610eced974977002619806729868cafd78-d_1280?region=us", aspectRatio: "1280 / 720" },
      { id: "music-videos-2", title: "PROJECT 02", vimeoId: "1245761478", thumbnail: "https://i.vimeocdn.com/video/2224982564-fe4fcf1b440394d1252846e7734d42e3e69da6324a57a91caed8e8fa340e0695-d_960?region=us", aspectRatio: "1280 / 640" },
      { id: "music-videos-3", title: "PROJECT 03", vimeoId: "1245759920", thumbnail: "https://i.vimeocdn.com/video/2224980611-4b67ef44ba14f2917fdcf4dd0cfc4fdfe80d27ffbd71ba97789816111d9918fd-d_640?region=us", aspectRatio: "720 / 1280" },
    ],
  },
  {
    slug: "motion-graphics",
    name: "Motion Graphics",
    description: "TYPOGRAPHY / ANIMATION / VISUAL SYSTEMS",
    projects: [
      { id: "motion-graphics-1", title: "PROJECT 01", vimeoId: "1245754511", thumbnail: "https://i.vimeocdn.com/video/2224977607-5a8c9b71044f097add14bc696fc5ea90c349cbedbfa0b4e71ab263d7aab16568-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "motion-graphics-2", title: "PROJECT 02", vimeoId: "1245754508", thumbnail: "https://i.vimeocdn.com/video/2224972570-c7beaacf5f0dfc8f79165c9ebef3eac13d0fe36fedcdab9dfc99c62b6b569d74-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "motion-graphics-3", title: "PROJECT 03", vimeoId: "1245754510", thumbnail: "https://i.vimeocdn.com/video/2224978430-fbc7f6af6fb9a665fbfda9b1725b418aeefc543af885ca72e78402be1632faa4-d_640?region=us", aspectRatio: "720 / 1280" },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    description: "FOOD FILMS / HOSPITALITY / BRAND CAMPAIGNS",
    projects: [
      { id: "restaurants-1", title: "PROJECT 01", vimeoId: "1246228569", thumbnail: "https://i.vimeocdn.com/video/2225566428-2108abfb887b312d1aa9cb2c7daf4005e619f5b66d91c547f30611219111b71b-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "restaurants-2", title: "PROJECT 02", vimeoId: "1246228572", thumbnail: "https://i.vimeocdn.com/video/2225566823-421420ac75c524c3a1e02e8cac78c655c83ae3bfc0fbbc50c9db2cc26fc05aad-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "restaurants-3", title: "PROJECT 03", vimeoId: "1246228571", thumbnail: "https://i.vimeocdn.com/video/2225567437-5cee9f420d98fec6bd30c5a04773bd327f000190184d1c209938a6704aa550b9-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "restaurants-4", title: "PROJECT 04", vimeoId: "1246200832", thumbnail: "https://i.vimeocdn.com/video/2225567194-02b435e4f2be5d5affd07f573d43ed5d4a830f1ae162312a0711e6b24efcaf22-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "restaurants-5", title: "PROJECT 05", vimeoId: "1246200834", thumbnail: "https://i.vimeocdn.com/video/2225567903-4cd34952a6bfbdbaa62eb95ce513239ed2798726675039bbc13e1e15d5155c06-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "restaurants-6", title: "PROJECT 06", vimeoId: "1246200831", thumbnail: "https://i.vimeocdn.com/video/2225568262-c41a4ad89b207f516a01d14cffec92016495f3027f735845df46dc041062b479-d_640?region=us", aspectRatio: "720 / 1280" },
    ],
  },
  {
    slug: "wedding",
    name: "Wedding",
    description: "WEDDING FILMS / CELEBRATIONS / STORYTELLING",
    projects: [
      { id: "wedding-1", title: "PROJECT 01", vimeoId: "1246238957", thumbnail: "https://i.vimeocdn.com/video/2225594077-98fdde83ec0b47e0f43c2d67ecfc8b0e4cecc881278e02cf62a065691eed97c9-d_1280?region=us", aspectRatio: "1280 / 720" },
      { id: "wedding-2", title: "PROJECT 02", vimeoId: "1246238844", thumbnail: "https://i.vimeocdn.com/video/2225595366-073fe46496beb5b20f6d7fbac5bf342fd23912949fc68f953dbc5846a052c17a-d_1280?region=us", aspectRatio: "1280 / 720" },
      { id: "wedding-3", title: "PROJECT 03", vimeoId: "1246238956", thumbnail: "https://i.vimeocdn.com/video/2225595797-9b7e1ba9375379ffea325d8e18c074adb9ddd5764d5efeefe2e8d7fa1abbac26-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "wedding-4", title: "PROJECT 04", vimeoId: "1246238846", thumbnail: "https://i.vimeocdn.com/video/2225596242-a8219f37ac47e4dcda5d367bd8371d72801fcffe5bf9f8ea1afc29bf03fb90e4-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "wedding-5", title: "PROJECT 05", vimeoId: "1246238848", thumbnail: "https://i.vimeocdn.com/video/2225596801-670c1c205c06a8211c0d8db05ba9e7317d162eb3692f8b0a2f3a6dd331e814ef-d_640?region=us", aspectRatio: "720 / 1280" },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description: "PROPERTY FILMS / PROJECT SHOWCASES / ARCHITECTURE VISUALS",
    projects: [
      { id: "real-estate-1", title: "PROJECT 01", vimeoId: "1245755015", thumbnail: "/images/real-estate-cover.png", aspectRatio: "720 / 1280" },
      { id: "real-estate-2", title: "PROJECT 02", vimeoId: "1245755014", thumbnail: "https://i.vimeocdn.com/video/2225004299-2baaf14e4400d94eb254909fe3858180c29bf2538eaf3a22ffaa230ffc575ea9-d_640?region=us", aspectRatio: "720 / 1280" },
      { id: "real-estate-3", title: "PROJECT 03", vimeoId: "1245755016", thumbnail: "https://i.vimeocdn.com/video/2225004553-d38d5d3ca03e93a41fbf84bda58aa8e089a8611ccfff088cb84df4b2b2665e3d-d_640?region=us", aspectRatio: "720 / 1280" },
    ],
  },
  {
    slug: "others",
    name: "Others",
    description: "SELECTED EXPERIMENTS / VISUAL STORIES / MISCELLANEOUS",
    projects: createProjects("others"),
  },
];








