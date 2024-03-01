const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/Users",
      "/api"
    ],
    target: "http://localhost:5097",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
