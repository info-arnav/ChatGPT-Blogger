export default async (request, response) => {
  await fetch("https://infinity.itsdope.in/api/request_post", {
    method: "POST",
    body: JSON.stringify(request.body),
  });
  response.json({ status: true });
};
