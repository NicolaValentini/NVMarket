const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error('NEXT_PUBLIC_SITE_URL is missing');
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: siteUrl,

  generateRobotsTxt: true,
  generateIndexSitemap: false,

  additionalPaths: async config => [
    await config.transform(config, '/'),
    await config.transform(config, '/it'),
    await config.transform(config, '/en'),
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/public/'],
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
};

export default config;
