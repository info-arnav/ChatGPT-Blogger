export default async (request, response) => {
  response.json({ status: true });
  await fetch("https://infinity.itsdope.in/api/request_post", {
    method: "POST",
    body: JSON.stringify(request.body),
  });
};
