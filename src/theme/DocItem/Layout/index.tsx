import React from "react";
import clsx from "clsx";
import { useWindowSize } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import DocItemPaginator from "@theme/DocItem/Paginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocItemFooter from "@theme/DocItem/Footer";
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile";
import DocItemContent from "@theme/DocItem/Content";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import ContentVisibility from "@theme/ContentVisibility";
import PeopleSidebar from "../../../components/PeopleSidebar";

function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  return { hidden, mobile, windowSize };
}

export default function DocItemLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();
  const showDesktopSidebar =
    docTOC.windowSize === "desktop" || docTOC.windowSize === "ssr";

  return (
    <div className="row">
      <div className={clsx("col", showDesktopSidebar && "col--9")}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {showDesktopSidebar && (
        <div className="col col--3">
          <PeopleSidebar />
        </div>
      )}
    </div>
  );
}
