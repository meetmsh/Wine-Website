export const siteUrl = (() => {
  try { return new URL(process.env.SITE_URL || "https://www.uncorkedhoboken.com").origin; }
  catch { return "https://www.uncorkedhoboken.com"; }
})();
