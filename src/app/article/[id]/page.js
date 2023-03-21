import Image from "next/image";
import "./article.css";

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
  if (articles.data.articles.length > 0) {
    if (articles.data.articles[0].article == undefined) {
      articles.data.articles[0].article = "No description";
    }
    return {
      title: params.id[0].toUpperCase() + params.id.slice(1),
      description: articles.data.articles[0].article.slice(0, 150),
      keywords: ["Infinity", "Dope", "Articles"],
      openGraph: {
        title: `${params.id[0].toUpperCase() + params.id.slice(1)} | Infinity`,
        description: articles.data.articles[0].article.slice(0, 150),
        url: url,
        siteName: "Infinity",
        images: [
          {
            url:
              articles.data.articles[0].image ||
              "https://infinity.itsdope.in/article-fallback.png",
            alt: "This is the article theme image",
          },
        ],
        locale: "en-US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${params.id[0].toUpperCase() + params.id.slice(1)} | Infinity`,
        description: articles.data.articles[0].article.slice(0, 150),
        images: [
          articles.data.articles[0].image ||
            "https://infinity.itsdope.in/article-fallback.png",
        ],
      },
    };
  } else {
    fetch("https://infinity.itsdope.in/api/add_post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Write a blog for a blogging website being really descriptive as to compete with the content on wikipdeia in word count greater than 1500 with the title '${params.id}', enclode the content in a htl article tag with appropriate break line tags. dont add title html or body tags. add bold and underline where necessary. and focus on any kewords you find appropriate for the topic. just give me the article without and other introductory sentence`,
      }),
    });
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
  params.id = decodeURIComponent(params.id);
  return (
    <>
      {articles.data.articles.length > 0 ? (
        <div className="article">
          <article>
            <center className="title">
              <h1>{params.id[0].toUpperCase() + params.id.slice(1)}</h1>
            </center>
            <p
              className="content"
              dangerouslySetInnerHTML={{
                __html: articles.data.articles[0].article,
              }}
            ></p>
          </article>
        </div>
      ) : (
        <div className="article-not-found">
          <p>
            No Article with the title exists. However it has been requested and
            will be available withing 24 hours.
          </p>
        </div>
      )}
    </>
  );
}
