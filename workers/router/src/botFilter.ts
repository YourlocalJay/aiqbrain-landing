export const isBot = (req: Request) => {
  const ua = req.headers.get('user-agent') || '';
  return !ua || /bot|crawl|spider|preview|facebookexternalhit|embed/i.test(ua);
};
