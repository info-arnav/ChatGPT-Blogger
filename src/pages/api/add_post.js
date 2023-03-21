export default async (request, response) => {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello!" }],
    }),
  });
  let data = await fetch(process.env.GRAPHQL_STRING, {
    method: "POST",
    headers: {
      apikey: process.env.GRAPHQL_API,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mutation: `
      {
        insertOneArticle (data : {title:"${request.body.prompt.toLowerCase()}", description:"${
        res.choices[0].message.content
      }", date_created:${new Date()} }) 
      }
    `,
    }),
  });
  response.json(data);
};
