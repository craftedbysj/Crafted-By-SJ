import type { Metadata } from "next";
import { DM_Sans,Cormorant_Garamond } from "next/font/google";
import LiquidGlass from "@/components/LiquidGlass";
import "./globals.css";
import "./liquid-glass.css";
import PageMotion from "@/components/PageMotion";
const dm=DM_Sans({subsets:["latin"],variable:"--font-dm",display:"swap"});
const cg=Cormorant_Garamond({subsets:["latin"],weight:["400","500"],style:["italic"],variable:"--font-cg",display:"swap"});
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000"),title:{default:"Crafted By SJ — Independent Creative Artist",template:"%s | Crafted By SJ"},description:"The personal portfolio and creative resource archive of SJ.",openGraph:{title:"Crafted By SJ",description:"Visuals, motion, design and storytelling.",type:"website"},twitter:{card:"summary_large_image"},icons:{icon:"/icon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${dm.variable} ${cg.variable}`}><PageMotion />
        <LiquidGlass />{children}</body></html>}
