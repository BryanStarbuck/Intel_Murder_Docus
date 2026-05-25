import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const siteUrl = process.env.DOCUSAURUS_URL ?? "https://intelligencemurders.com";
const baseUrl = process.env.DOCUSAURUS_BASE_URL ?? "/";

const config: Config = {
  title: "Intelligence Service Murdering Americans",
  tagline: "",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: siteUrl,
  baseUrl,
  trailingSlash: true,

  organizationName: "BryanStarbuck",
  projectName: "Intel_Murder_Docus",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'google-site-verification',
        content: 'dyttroI7C_kCpqpCQZrZ7juCWmwAhVK1Ri3ZaVIDsaU',
      },
    },
    // NOTE: do NOT add a site-wide <link rel="canonical"> here.
    // Docusaurus emits a correct per-page canonical automatically.
    // A global canonical here overrides every page's canonical to the
    // homepage, causing Google to treat all pages as "Alternate page
    // with proper canonical tag" and stop indexing them.
    {
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'author',
        content: 'Intelligence Murders Investigation',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:site_name',
        content: 'Intelligence Murders',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:locale',
        content: 'en_US',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:site',
        content: '@HolonCitizen',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Intelligence Murders',
        alternateName: 'Intelligence Service Murdering Americans',
        url: siteUrl + '/',
        description:
          'Investigative archive documenting 250+ suspicious deaths linked to intelligence agencies (CIA, MI6, Mossad, KGB/FSB/GRU, DINA, ISI) and the Jeffrey Epstein network — journalists, scientists, activists, witnesses, and elected leaders. Sourced research, timelines, cross-references.',
        inLanguage: 'en',
        potentialAction: {
          '@type': 'SearchAction',
          target: siteUrl + '/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Intelligence Murders',
        url: siteUrl + '/',
        logo: siteUrl + '/img/logo.svg',
        sameAs: [
          'https://uapmurders.com/',
        ],
      }),
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs/Epstein",
          routeBasePath: "epstein-murders",
          sidebarPath: "./sidebarsEpstein.ts",
          exclude: ["**/CLAUDE.md", "**/claude.md", "**/README.md", "**/README.mdx"],
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.7,
          ignorePatterns: ["/tags/**", "/404", "/404.html", "/404/"],
          filename: "sitemap.xml",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "intelligence-service-murders",
        path: "docs/Intel",
        routeBasePath: "intelligence-service-murders",
        sidebarPath: "./sidebarsIntelligence.ts",
        exclude: ["**/CLAUDE.md", "**/claude.md", "**/README.md", "**/README.mdx"],
        showLastUpdateTime: true,
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    metadata: [
      {
        name: "description",
        content:
          "Investigative archive of 250+ suspicious deaths connected to intelligence services (CIA, MI6, Mossad, KGB/FSB/GRU, DINA, ISI) and the Jeffrey Epstein network — journalists, scientists, activists, witnesses, and elected leaders.",
      },
      {
        name: "keywords",
        content:
          "intelligence service murders, CIA assassinations, MI6, Mossad, KGB, FSB, GRU, DINA, ISI, Jeffrey Epstein, Ghislaine Maxwell, political assassinations, journalist murders, scientist murders, Operation Condor, Church Committee, COINTELPRO, suspicious deaths, declassified documents, intelligence agencies, whistleblowers",
      },
      { property: "og:title", content: "Intelligence Service Murdering Americans" },
      {
        property: "og:description",
        content:
          "250+ documented profiles of journalists, scientists, activists, and elected leaders killed by or connected to intelligence services and the Epstein network.",
      },
      { property: "og:image", content: siteUrl + "/img/docusaurus-social-card.jpg" },
      { property: "og:image:alt", content: "Intelligence Murders investigation archive" },
      { property: "og:url", content: siteUrl + "/" },
      { name: "twitter:title", content: "Intelligence Service Murdering Americans" },
      {
        name: "twitter:description",
        content:
          "250+ documented profiles of journalists, scientists, activists, and elected leaders killed by or connected to intelligence services and the Epstein network.",
      },
      { name: "twitter:image", content: siteUrl + "/img/docusaurus-social-card.jpg" },
      { name: "twitter:image:alt", content: "Intelligence Murders investigation archive" },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Intel Murdering Americans",
      logo: {
        alt: "Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "sidebar",
          position: "left",
          label: "Epstein Murders",
        },
        {
          type: "docSidebar",
          sidebarId: "sidebar",
          position: "left",
          label: "Intelligence Service Murders",
          docsPluginId: "intelligence-service-murders",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} ACT 3 AI, Inc. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
