import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Infinity is a place to view AI generated blogs on a hige amount of topics",
  keywords: ["Infinity", "Dope", "Articles", "About"],
  openGraph: {
    title: "About | Infinity",
    description:
      "Infinity is a place to view AI generated blogs on a hige amount of topics",
    url: "https://infinity.itsdope.in/about",
    siteName: "Infinity",
    images: [
      {
        url: "https://infinity.itsdope.in/logo.png",
        width: 800,
        height: 600,
        alt: "This is the logo of Infinity",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Infinity",
    description:
      "Infinity is a place to view AI generated blogs on a hige amount of topics",
    images: ["https://infinity.itsdope.in/logo.png"],
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
