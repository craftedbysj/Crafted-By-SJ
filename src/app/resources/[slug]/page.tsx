import Link from "next/link";
import {notFound} from "next/navigation";
import {resources} from "@/lib/content";
export function generateStaticParams(){return resources.map(r=>({slug:r.slug}));}
export default async function ResourcePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const r=resources.find(x=>x.slug===slug);if(!r)notFound();return <main className="detail-page"><header className="site-header"><Link href="/" className="brand-mark">SJ.</Link><Link href="/#resources" className="back-link">← BACK TO RESOURCES</Link></header><p className="eyebrow-small">RESOURCE ARCHIVE / {r.category}</p><h1>{r.title}</h1><p className="detail-copy">{r.description}</p><div className="detail-meta"><span>COMPATIBILITY</span><strong>{r.software}</strong></div><p className="notice">This resource is being prepared. A verified download or external link will be added soon.</p><footer className="site-footer"><span>CRAFTED BY SJ</span><span>© 2026</span></footer></main>}
