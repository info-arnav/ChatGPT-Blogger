import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";
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
        <Footer></Footer>
      </body>
    </html>
  );
}
