"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const requestPost = async (prompt) => {
  fetch("https://infinity.itsdope.in/api/add_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt.toLowerCase(),
    }),
  });
  await 5;
  return { status: true };
};

export default function Footer() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  return (
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
            Ininifty is a platform which can generate blogs on numerous topics
            automatically. This is what makes the platform so vast and useful
            for readers.
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
        {requested && (
          <div className="rows">
            <p style={{ fontWeight: "lighter" }}>
              Request Sent, New article will be available within 24 hours.
            </p>
          </div>
        )}
        <div className="rows">
          <button
            onClick={async (e) => {
              setLoading(true);
              setRequested(false);
              let status = await requestPost(value);
              if (status) {
                setLoading(false);
                setRequested(true);
              }
            }}
            disabled={loading}
          >
            {loading ? "Generating....." : "Request Article"}
          </button>
        </div>
      </div>
    </footer>
  );
}
