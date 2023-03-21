export default async (request, response) => {
  let body = request.body;
  response.json({ status: true });
  await fetch("https://infinity.itsdope.in/api/request_post", {
    method: "POST",
    body: JSON.stringify(body),
  });
};
