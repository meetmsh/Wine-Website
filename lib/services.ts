export function configuredEndpoint(value: string | undefined) {
  try { return value && new URL(value).protocol === "https:" ? value : null; } catch { return null; }
}

export function serviceAvailability() {
  return {
    orders: Boolean(configuredEndpoint(process.env.ORDER_WEBHOOK_URL)),
    giftCards: Boolean(configuredEndpoint(process.env.GIFTCARD_WEBHOOK_URL)),
    newsletter: Boolean(configuredEndpoint(process.env.NEWSLETTER_WEBHOOK_URL)),
  };
}
