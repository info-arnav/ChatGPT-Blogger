export default async (request, response) => {
  response.json({ status: true });
  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write  a blog for a blogging website being really descriptive as to compete with the content on wikipdeia in word count greater than 1500 with the title '${request.body.prompt}', enclode the content in a htl article tag with appropriate break line tags. dont add title html or body tags. add bold and underline where necessary. and focus on any kewords you find appropriate for the topic. just give me the article without and other introductory sentence`,
        },
      ],
    }),
  })
    .then((e) => e.json())
    .then(
      async (res) =>
        await fetch(process.env.GRAPHQL_STRING, {
          method: "POST",
          headers: {
            apikey: process.env.GRAPHQL_API,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
      mutation {
        insertOneArticle (data : {title:"${
          request.body.prompt
        }", article:"${res.choices[0].message.content
              .replaceAll('"', "'")
              .replaceAll("\n", "")}" }) 

            {
              _id
              article
              date_created
              title
            } 
      }
    `,
          }),
        })
    );
};
