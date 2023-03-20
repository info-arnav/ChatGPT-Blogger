import Image from "next/image";

async function getPost(id) {
  id = decodeURIComponent(id);
  const res = await fetch(process.env.GRAPHQL_STRING, {
    method: "POST",
    headers: {
      apikey: process.env.GRAPHQL_API,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      {
        articles (query:{title:"${id.toLowerCase()}"}) {
              _id
              article
              date_created
              image
              title
        }
      }
    `,
    }),
  });
  return res.json();
}

export async function generateMetadata({ params }) {
  const articles = await getPost(params.id);
  let url = `https://infinity.itsdope.in/article/${params.id}`;
  params.id = decodeURIComponent(params.id);
  if (articles.legnth > 0) {
    return {
      title: params.id[0].toUpperCase() + params.id.slice(1),
      description:
        "Infinity is a place to view AI generated blogs on a hige amount of topics",
      keywords: ["Infinity", "Dope", "Articles"],
      openGraph: {
        title: `${params.id[0].toUpperCase() + params.id.slice(1)} | Infinity`,
        description:
          "Infinity is a place to view AI generated blogs on a hige amount of topics",
        url: url,
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
      twitter: {
        card: "summary_large_image",
        title: `${params.id[0].toUpperCase() + params.id.slice(1)} | Infinity`,
        description:
          "Infinity is a place to view AI generated blogs on a hige amount of topics",
        images: ["https://infinity.itsdope.in/logo.png"],
      },
    };
  } else {
    return {
      title: params.id[0].toUpperCase() + params.id.slice(1),
      description: "No article with this title generated yet.",
      keywords: ["Infinity", "Dope", "Articles"],
      openGraph: {
        title: `${params.id[0].toUpperCase() + params.id.slice(1)} | Infinity`,
        description: "No article with this title generated yet.",
        url: url,
        siteName: "Infinity",
        images: [
          {
            url: "https://infinity.itsdope.in/article-fallback.png",
            width: 491,
            height: 500,
            alt: "This is fallback image when no article image exists",
          },
        ],
        locale: "en-US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${params.id[0].toUpperCase() + params.id.slice(1)} | Infinity`,
        description: "No article with this title generated yet.",
        images: ["https://infinity.itsdope.in/article-fallback.png"],
      },
    };
  }
}

export default async function Article({ params }) {
  const articles = await getPost(params.id);
  return <>{articles.legnth > 0 ? <></> : <></>}</>;
}
