export default (request, response) => {
  fetch("https://infinity.itsdope.in/api/request_post", {
    method: "POST",
    body: JSON.stringify(request.body.body),
  });
  response.json({ status: true });
};
