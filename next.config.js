/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path")
const withPWA = require("next-pwa")

/**
 * @type {import('next').NextConfig}
 */
module.exports = withPWA({
  includePaths: [path.join(__dirname, "styles")],
  pwa: {
    dest: "public"
  }
})
