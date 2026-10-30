import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crafted By SJ — Visual Storyteller",
  description:
    "The creative portfolio and resource hub of SJ. Explore selected work, editing resources, and collaborations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
