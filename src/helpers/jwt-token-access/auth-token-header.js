export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("authUser"))

  if (obj && obj.data.tokens.accessToken) {
    return { Authorization: obj.data.tokens.accessToken }
  } else {
    return {}
  }
}
