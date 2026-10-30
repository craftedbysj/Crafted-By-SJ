import type {MetadataRoute} from "next";
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";return ["","/resources/colour-grading-luts","/resources/motion-presets","/resources/editing-resources"].map(p=>({url:base+p,lastModified:new Date()}));}
