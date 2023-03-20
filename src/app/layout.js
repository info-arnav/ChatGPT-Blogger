"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./globals.css";

export const metadata = {
  title: {
    default: "Infinity",
    template: "%s | Infinity",
  },
  description:
    "Infinity is a place to view AI generated blogs on a hige amount of topics",
  generator: "Dope",
  applicationName: "Infinity",
  referrer: "origin-when-cross-origin",
  keywords: ["Infinity", "Dope", "Articles"],
  openGraph: {
    title: "Infinity",
    description:
      "Infinity is a place to view AI generated blogs on a hige amount of topics",
    url: "https://infinity.itsdope.in",
    siteName: "Infinity",
    images: [
      {
        url: "https://infinity.itsdope.in/logo.png",
        width: 491,
        height: 500,
        alt: "This is the logo of Infinity",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/apple-icon.png",
  },
  themeColor: "white",
  manifest: "https://infinity.itsdope.in/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: "Infinity",
    description:
      "Infinity is a place to view AI generated blogs on a hige amount of topics",
    images: ["https://infinity.itsdope.in/logo.png"],
  },
};

export default function RootLayout({ children }) {
  const [value, setValue] = useState("");
  return (
    <html lang="en">
      <head />
      <body>
        <nav>
          <Link href="/">Home</Link>
          <input placeholder="Search"></input>
          <Link href="/about">About</Link>
        </nav>
        <div className="nav-space"></div>
        <main>{children}</main>
        <footer id="#footer">
          <div className="cols">
            <div className="rows">
              <Link href="/">
                <Image
                  alt="This the the logo of site infinity"
                  src="/logo.png"
                  width={200}
                  height={200}
                ></Image>
                <h1>INFINITY</h1>
              </Link>
              <p>
                Ininifty is a platform which can generate blogs on numerous
                topics automatically. This is what makes the platform so vast
                and useful for readers.
              </p>
            </div>
          </div>
          <div className="cols">
            <div className="rows">
              <h4>Links</h4>
            </div>
            <div className="rows">
              <Link href="/">Home</Link>
            </div>
            <div className="rows">
              <Link href="/about">About</Link>
            </div>
            <div className="rows">
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
          <div className="cols">
            <div className="rows">
              <h2>Request New Article</h2>
            </div>
            <div className="rows">
              <input
                placeholder="Enter Title"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></input>
            </div>
            <div className="rows">
              <button onClick={(e) => requestPost(value)}>
                Request Article
              </button>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
