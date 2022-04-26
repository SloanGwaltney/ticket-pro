export const ironOptions = {
  cookieName: process.env.IRON_COOKIE_NAME,
  password: process.env.IRON_COOKIE_PASS,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.USE_HTTP === 'true' ? true : false,
  },
};