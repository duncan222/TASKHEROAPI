const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/Users",
      "/api"
    ],
    target: "http://localhost:4200",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
