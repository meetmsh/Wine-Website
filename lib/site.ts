type SiteEnvironment = Readonly<Record<string, string | undefined>>;

export function resolveSiteUrl(environment: SiteEnvironment = process.env) {
  const candidates = [
    environment.SITE_URL,
    environment.VERCEL_PROJECT_PRODUCTION_URL && `https://${environment.VERCEL_PROJECT_PRODUCTION_URL}`,
    environment.VERCEL_URL && `https://${environment.VERCEL_URL}`,
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const url = new URL(candidate);
      if (url.protocol === "https:" || url.protocol === "http:") return url.origin;
    } catch { /* Fall through to the deployment's next public origin. */ }
  }
  return "https://www.uncorkedhoboken.com";
}

export const siteUrl = resolveSiteUrl();
