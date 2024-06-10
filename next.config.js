/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "@/components/index",
      "@/components/_shared",
      "@/components/_icons",
    ],
  },
  // See: https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1712429322
  webpack: (config, context) => {
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
        }),
      );
    }
    return config;
  },
};

module.exports = nextConfig;
