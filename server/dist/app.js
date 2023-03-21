"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const app = (0, _express2.default)();

app.post("/add_post", (() => {
  var _ref = _asyncToGenerator(function* (request, response) {
    yield fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Write a blog for a blogging website being really descriptive as to compete with the content on wikipdeia in word count greater than 1500 with the title '${request.body.prompt}', enclode the content in a htl article tag with appropriate break line tags. dont add title html or body tags. add bold and underline where necessary. and focus on any kewords you find appropriate for the topic. just give me the article without and other introductory sentence`
        }]
      })
    }).then(function (e) {
      return e.json();
    }).then((() => {
      var _ref2 = _asyncToGenerator(function* (res) {
        let data = yield fetch("https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/chatgpt-yracd/graphql", {
          method: "POST",
          headers: {
            apikey: "1nNUblzUD65NC0IYfTNb3KvsGaOghczqOWvCPfFlWo8pE1jg08oQVrkCMBrURuZO",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: ` mutation {
              insertOneArticle (data : {title:"${request.body.prompt}", description:"${res.choices[0].message.content}", date_created:"${new Date()}" }) 
      
                  {
                    _id
                    article
                    date_created
                    title
                  } 
            }
            `
          })
        });
      });

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    })()).then(function (e) {
      return e.json();
    }).then(function (e) {
      return response.json(e);
    });
    ``;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

app.listen(5000);