/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path")
const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

// This is a temporary
// In the future, it should only use PWA
const usePWA = false

if (usePWA) {
  module.exports = withPWA({
    includePaths: [path.join(__dirname, "styles")],
    pwa: {
      runtimeCaching,
    }
  })
} else {
  module.exports = {
    includePaths: [path.join(__dirname, "styles")],
  }
}
