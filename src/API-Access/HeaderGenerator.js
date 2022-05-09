export function generateHeader(token) {
  const config = { headers: { Authorization: "Bearer " + token } };
  return config;
}
