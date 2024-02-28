const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/Users"
    ],
    target: "https://localhost:7024",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
