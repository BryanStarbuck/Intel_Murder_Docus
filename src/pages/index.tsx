import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import TOC from '../theme/TOC';

export default function Home(): React.ReactElement {
  return (
    <Layout title="Intelligence Service Murdering Americans">
      <main>
        <div className="container margin-vert--lg">
          <div className="row" style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <div className="col" style={{ flex: '1 1 0%', minWidth: 0 }}>
              <article className="markdown">
                <h1>Intelligence Service Murdering Americans</h1>
                <p>
                  Documenting suspicious deaths connected to intelligence operations and the
                  Epstein network. Over 250 profiles with sourced research, timelines, and
                  cross-references.
                </p>

                <hr />

                <h2>Epstein Murders</h2>
                <p>
                  <strong>110+ profiles</strong> |{' '}
                  <Link to="/epstein/">View Full Investigation</Link>
                </p>
                <p>
                  Deaths possibly connected to the Jeffrey Epstein cover-up. An unusual number
                  of victims, witnesses, investigators, journalists, and associates have died
                  under circumstances ranging from clearly natural to deeply questionable.
                </p>
                <p><strong>Notable cases:</strong></p>
                <ul>
                  <li>
                    <Link to="/epstein/Details/Jean_Luc_Brunel">Jean-Luc Brunel</Link>{' '}
                    — Found hanged in prison awaiting trafficking trial, same method as Epstein
                  </li>
                  <li>
                    <Link to="/epstein/Details/Virginia_Giuffre">Virginia Giuffre</Link>{' '}
                    — Top Epstein accuser, posted "not suicidal," died by gunshot in strict-gun-law Australia
                  </li>
                  <li>
                    <Link to="/epstein/Details/Daniel_Anderl">Daniel Anderl</Link>{' '}
                    — Judge's son killed 4 days after Epstein-Deutsche Bank case assignment
                  </li>
                  <li>
                    <Link to="/epstein/Details/Mark_Middleton">Mark Middleton</Link>{' '}
                    — Clinton aide who logged Epstein into the White House; hanged and shot, records sealed by judge
                  </li>
                  <li>
                    <Link to="/epstein/Details/Steven_Silks">4 NYPD officers</Link>{' '}
                    who allegedly viewed Weiner laptop — all dead by suicide within weeks
                  </li>
                </ul>
                <p>
                  <Link
                    to="/epstein/"
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.25rem',
                      background: 'var(--ifm-color-primary)',
                      color: '#fff',
                      borderRadius: '4px',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    View Full Investigation
                  </Link>
                </p>

                <hr />

                <h2>Intelligence Service Murders</h2>
                <p>
                  <strong>149+ profiles</strong> |{' '}
                  <Link to="/intel/">View Full Investigation</Link>
                </p>
                <p>
                  Political assassinations and suspicious deaths from 1953 to the present,
                  carried out by or connected to intelligence agencies worldwide — CIA, MI6,
                  Mossad, KGB/FSB/GRU, DINA, ISI, Saudi GIP, and others.
                </p>
                <p><strong>Notable cases:</strong></p>
                <ul>
                  <li>
                    <Link to="/intel/Details/Patrice_Lumumba">
                      Patrice Lumumba
                    </Link>{' '}
                    — Congolese PM, CIA and Belgian intelligence orchestrated overthrow and assassination
                  </li>
                  <li>
                    <Link to="/intel/Details/Orlando_Letelier">
                      Orlando Letelier
                    </Link>{' '}
                    — Chilean diplomat killed by car bomb in Washington DC by DINA agents
                  </li>
                  <li>
                    <Link to="/intel/Details/Alexander_Litvinenko">
                      Alexander Litvinenko
                    </Link>{' '}
                    — Former FSB officer poisoned with polonium-210 in London
                  </li>
                  <li>
                    <Link to="/intel/Details/Dag_Hammarskjold">
                      Dag Hammarskjold
                    </Link>{' '}
                    — UN Secretary-General, 2019 inquiry found plane "plausibly" shot down
                  </li>
                  <li>
                    <Link to="/intel/Details/Alexei_Navalny">
                      Alexei Navalny
                    </Link>{' '}
                    — Russian opposition leader, died in Arctic penal colony
                  </li>
                </ul>
                <p>
                  <Link
                    to="/intel/"
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.25rem',
                      background: 'var(--ifm-color-primary)',
                      color: '#fff',
                      borderRadius: '4px',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    View Full Investigation
                  </Link>
                </p>
                <hr />

                <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                  <Link
                    to="/ipfs"
                    style={{
                      display: 'inline-block',
                      padding: '0.6rem 1.5rem',
                      background: 'var(--ifm-color-emphasis-200)',
                      borderRadius: '6px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                    }}
                  >
                    Help keep videos alive — run our IPFS script
                  </Link>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--ifm-color-emphasis-600)' }}>
                    Pin all investigation videos to your IPFS node with one command.
                    The more people who run it, the harder these videos are to censor.
                  </p>
                </div>
              </article>
            </div>
            <div
              className="col col--3"
              style={{
                flex: '0 0 300px',
                maxWidth: 300,
                width: 300,
              }}
            >
              <TOC />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
