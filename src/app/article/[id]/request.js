"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const requestPost = async (prompt) => {
  await fetch("http://server.itsdope.in/add_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt.toLowerCase(),
    }),
  });
  return { status: true };
};

export default function Request({ value }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  return (
    <div className="request">
      <button
        onClick={async (e) => {
          setLoading(true);
          setRequested(false);
          let status = await requestPost(value);
          if (status) {
            router.push(`/article/${value.toLowerCase()}`);
          }
        }}
        disabled={loading}
      >
        {loading ? "Generating just 2 min ....." : "Request Article"}
      </button>
    </div>
  );
}
