# Uncorked social artwork

`social-preview.html` is the editable 1200 × 630 composition. It reuses the current wordmark typography, paper/oxblood/brass palette and the existing editorial wine photograph. The shipped export is `public/images/social/uncorked-share-v1.jpg`; provenance is recorded beside it.

To regenerate, run `npm run build`, then `npm run og:image`. The exporter needs Node 22+ and Chrome (set `CHROME_PATH` if it is not in a standard location), reads the site's already-built Bodoni Moda/Geist fonts and embeds the local photo. The exported JPEG ships as a normal public asset; production does not run Chrome or depend on a remote image-generation service. Keep the image path/version in `app/layout.tsx` synchronized if a new version is exported.

The root Next.js metadata supplies this image to Open Graph and Twitter large-image cards, including dimensions, MIME type and alt text. Individual page titles/descriptions remain in place. See the [Next.js metadata reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph).

Set `SITE_URL` to this deployment's actual public origin on non-Vercel hosting. If it is blank on Vercel, the [production-domain system variable](https://vercel.com/docs/environment-variables/system-environment-variables#vercel_project_production_url) is used before the generated deployment domain. This avoids image links accidentally pointing to a different store website. A correctly configured public deployment is required before social platforms can fetch the artwork; the local implementation is not a claim of a published preview.
