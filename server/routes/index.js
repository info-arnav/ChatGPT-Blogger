var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: true });
});

router.post("/add_post", async function (request, response) {
  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write a blog for a blogging website being really descriptive as to compete with the content on wikipdeia in word count greater than 1500 with the title '${request.body.prompt}', enclode the content in a htl article tag with appropriate break line tags. dont add title html or body tags. add bold and underline where necessary. and focus on any kewords you find appropriate for the topic. just give me the article without and other introductory sentence`,
        },
      ],
    }),
  })
    .then((e) => e.json())
    .then(async (res) => {
      let data = await fetch(
        "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/chatgpt-yracd/graphql",
        {
          method: "POST",
          headers: {
            apikey:
              "1nNUblzUD65NC0IYfTNb3KvsGaOghczqOWvCPfFlWo8pE1jg08oQVrkCMBrURuZO",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: ` mutation {
              insertOneArticle (data : {title:"${
                request.body.prompt
              }", description:"${
              res.choices[0].message.content
            }", date_created:"${new Date()}" }) 
      
                  {
                    _id
                    article
                    date_created
                    title
                  } 
            }
            `,
          }),
        }
      );
    })
    .then((e) => e.json())
    .then((e) => response.json(e));
  ``;
});

module.exports = router;
