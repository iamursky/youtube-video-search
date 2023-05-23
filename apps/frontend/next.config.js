const IS_PRODUCTION = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
module.exports = {
  output: IS_PRODUCTION ? "standalone" : undefined,

  eslint: {
    ignoreDuringBuilds: IS_PRODUCTION,
  },
};
