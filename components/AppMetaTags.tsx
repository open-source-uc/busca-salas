import { objMap } from "../lib/helpers"

export type MetaTagsData = {
  title?: string,
  shortName?: string,
  description?: string,
  themeColor?: string,
  domain?: string,
  images?: {
    large?: string,
    small?: string
    apple?: {
      icon?: {
        "default"?: string,
        "152x152"?: string
        "180x180"?: string
        "167x167"?: string
      }
      splash?: {
        "2048x2732"?: string
        "1668x2224"?: string
        "1536x2048"?: string
        "1125x2436"?: string
        "1242x2208"?: string
        "750x1334"?: string
        "640x1136"?: string
      }
    }
  }
  twitter?: {
    creator?: string,
    site?: string
  }
}


function AppMetaTags(data: MetaTagsData) {
  const { domain, title, shortName, description, themeColor, images } = data
  return <>
    {/* ShortName */}
    {shortName ?
      <>
        <meta name='application-name' content={shortName} />
        <meta name='apple-mobile-web-app-title' content={shortName} />
      </> : null
    }
    {/* Description */}
    {description ? <meta name='description' content={description} /> : null}
    {/* PWA */}
    <link rel='manifest' href='/manifest.json' />
    {/* Other */}
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <meta name='mobile-web-app-capable' content='yes' />
    <meta name='msapplication-tap-highlight' content='no' />
    {/* Color */}
    {themeColor ? <>
      <meta name='theme-color' content={themeColor} />
      <meta name='msapplication-TileColor' content={themeColor} />
      <meta name='apple-mobile-web-app-status-bar-style' content={themeColor} />
    </> : null
    }
    {/* Social preview */}
    {title ? <meta name='twitter:title' content={title} /> : null}
    {images.large ? <meta name='twitter:card' content='summary_large_image' /> : null}
    {domain ? <meta name='twitter:url' content={domain} /> : null}
    {description ? <meta name='twitter:description' content={description} /> : null}
    {images.large ? <meta name='twitter:image' content={images.large} /> : null}
    {data.twitter.site ? <meta name='twitter:site' content={data.twitter.site} /> : null}
    {data.twitter.creator ? <meta name='twitter:creator' content={data.twitter.creator} /> : null}
    <meta property='og:type' content='website' />
    {title ? <meta property='og:title' content={title} /> : null}
    {description ? <meta name='og:description' content={description} /> : null}
    {shortName ? <meta property='og:site_name' content={shortName} /> : null}
    {domain ? <meta property='og:url' content={domain} /> : null}
    {images.small? <meta property='og:image' content={images.small} /> : null}
    {/* Icons */}
    <link rel='shortcut icon' href='/favicon.ico' />
    {images.apple.icon ? objMap(images.apple.icon, (key, value) => <link rel='apple-touch-icon' sizes={key !== "default" ? key : null} href={value} />) : null}
    {/* Apple splash screen images */}
    {images.apple.splash ? objMap(images.apple.splash, (key, value) => <link rel='apple-touch-startup-image' href={value} sizes={key} />) : null}
  </>
}

export default AppMetaTags
