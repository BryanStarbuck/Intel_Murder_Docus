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
  trailingSlash: false,

  organizationName: "BryanStarbuck",
  projectName: "Intel_Murder_Docus",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs/Epstein",
          routeBasePath: "epstein-murders",
          sidebarPath: "./sidebarsEpstein.ts",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
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
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
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
