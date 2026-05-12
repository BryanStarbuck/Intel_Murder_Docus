import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound(): React.ReactElement {
  return (
    <Layout
      title="Page Not Found (404)"
      description="The page you requested could not be found on Intelligence Murders. Browse the Epstein Murders or Intelligence Service Murders investigations."
    >
      <main className="container margin-vert--xl">
        <article className="markdown">
          <h1>Page Not Found</h1>
          <p>
            We could not find what you were looking for. The URL may have moved, been renamed, or never existed.
          </p>
          <h2>Continue investigating</h2>
          <ul>
            <li>
              <Link to="/">Home</Link> — overview of both investigations
            </li>
            <li>
              <Link to="/epstein-murders/">Epstein Murders</Link> — 110+ profiles of deaths connected to the Jeffrey Epstein network
            </li>
            <li>
              <Link to="/intelligence-service-murders/">Intelligence Service Murders</Link> — 149+ profiles of journalists, scientists, and elected leaders killed by intelligence services
            </li>
            <li>
              <a href="https://uapmurders.com/" rel="noopener">UAP Murders (sister site)</a> — UAP, energy systems, and physics investigations
            </li>
          </ul>
          <p>
            If you followed a link that brought you here, please report it so we can fix it.
          </p>
        </article>
      </main>
    </Layout>
  );
}
