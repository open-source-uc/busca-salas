/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path")
const withPWA = require("next-pwa")

/**
 * NOTE: next-pwa generates public/sw.js, witch prefetches and routes
 * every file under the public directory. This increases significantly
 * the PWA size. The configuration option `pwa.publicExcludes` is not
 * enough, since some files should be included only in specific scenarios
 * (`img/apple` for PWA in Apple devices and `img/social` for meta tags).
 *
 * This should be addressed in the future.
 * A temporally workaround would be to optimize static sizes during build.
 *
*/

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: {
    defaultLocale: "es-CL",
    locales: ["es-CL"]
  },
  includePaths: [path.join(__dirname, "styles")],
  pwa: {
    dest: "public",
    publicExcludes: ["!img/social/**/*"]
  }
}

module.exports = withPWA(nextConfig)
