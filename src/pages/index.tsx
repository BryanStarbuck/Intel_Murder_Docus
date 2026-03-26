import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

const investigations = [
  {
    title: "Epstein Murders",
    href: "/epstein-murders/",
    count: "110+ profiles",
    summary:
      "Deaths possibly connected to the Jeffrey Epstein cover-up. An unusual number of victims, witnesses, investigators, journalists, and associates have died under circumstances ranging from clearly natural to deeply questionable.",
    highlights: [
      {
        text: "Jean-Luc Brunel — Found hanged in prison awaiting trafficking trial, same method as Epstein",
        href: "/epstein-murders/Details/Jean_Luc_Brunel",
      },
      {
        text: "Virginia Giuffre — Top Epstein accuser, posted \"not suicidal,\" died by gunshot in strict-gun-law Australia",
        href: "/epstein-murders/Details/Virginia_Giuffre",
      },
      {
        text: "Daniel Anderl — Judge's son killed 4 days after Epstein-Deutsche Bank case assignment",
        href: "/epstein-murders/Details/Daniel_Anderl",
      },
      {
        text: "Mark Middleton — Clinton aide who logged Epstein into the White House; hanged and shot, records sealed by judge",
        href: "/epstein-murders/Details/Mark_Middleton",
      },
      {
        text: "4 NYPD officers who allegedly viewed Weiner laptop — all dead by suicide within weeks",
        href: "/epstein-murders/Details/Steven_Silks",
      },
    ],
  },
  {
    title: "Intelligence Service Murders",
    href: "/intelligence-service-murders/",
    count: "149+ profiles",
    summary:
      "Political assassinations and suspicious deaths from 1953 to the present, carried out by or connected to intelligence agencies worldwide — CIA, MI6, Mossad, KGB/FSB/GRU, DINA, ISI, Saudi GIP, and others.",
    highlights: [
      {
        text: "Patrice Lumumba — Congolese PM, CIA and Belgian intelligence orchestrated overthrow and assassination",
        href: "/intelligence-service-murders/Details/Patrice_Lumumba",
      },
      {
        text: "Orlando Letelier — Chilean diplomat killed by car bomb in Washington DC by DINA agents",
        href: "/intelligence-service-murders/Details/Orlando_Letelier",
      },
      {
        text: "Alexander Litvinenko — Former FSB officer poisoned with polonium-210 in London",
        href: "/intelligence-service-murders/Details/Alexander_Litvinenko",
      },
      {
        text: "Dag Hammarskjold — UN Secretary-General, 2019 inquiry found plane \"plausibly\" shot down",
        href: "/intelligence-service-murders/Details/Dag_Hammarskjold",
      },
      {
        text: "Alexei Navalny — Russian opposition leader, died in Arctic penal colony",
        href: "/intelligence-service-murders/Details/Alexei_Navalny",
      },
    ],
  },
];

export default function Home(): React.JSX.Element {
  return (
    <Layout title="Intel Murder Docus" description="Documenting suspicious deaths connected to intelligence operations and the Epstein network">
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <h1>Intel Murder Docus</h1>
        <p style={{ fontSize: "1.15rem", color: "var(--ifm-color-emphasis-700)" }}>
          Documenting suspicious deaths connected to intelligence operations and
          the Epstein network. Over 250 profiles with sourced research, timelines,
          and cross-references.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2rem" }}>
          {investigations.map((inv) => (
            <div
              key={inv.title}
              style={{
                border: "1px solid var(--ifm-color-emphasis-300)",
                borderRadius: 8,
                padding: "1.5rem",
                background: "var(--ifm-card-background-color)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                <h2 style={{ margin: 0 }}>
                  <Link to={inv.href}>{inv.title}</Link>
                </h2>
                <span style={{ fontSize: "0.9rem", color: "var(--ifm-color-emphasis-600)" }}>
                  {inv.count}
                </span>
              </div>

              <p style={{ marginTop: "0.75rem" }}>{inv.summary}</p>

              <h4 style={{ marginBottom: "0.5rem" }}>Notable cases:</h4>
              <ul style={{ marginBottom: "1rem" }}>
                {inv.highlights.map((h) => (
                  <li key={h.href}>
                    <Link to={h.href}>{h.text}</Link>
                  </li>
                ))}
              </ul>

              <Link
                to={inv.href}
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1.25rem",
                  background: "var(--ifm-color-primary)",
                  color: "#fff",
                  borderRadius: 4,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Full Investigation
              </Link>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
