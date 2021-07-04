// Next.js dependencies
import { useRouter } from "next/router";

// React dependencies
import { Fragment, useState, useEffect, Component } from "react";

// Components
import MetaRenderer from "../../components/SEO/MetaRender";
import Header from "./Header/index";
import Footer from "./Footer/index";
import Sidebar from "./Sidebar/index";

interface LayoutProps {
  children: Component | any;
}

const Layout = ({ children }: LayoutProps) => {
  // Route details
  const router = useRouter();

  // Sidebar manipulation
  const [showSidebar, updateSidebarStatus] = useState(false);

  const sidebarOpener = () => {
    updateSidebarStatus(true);
  };

  const sidebarCloser = () => {
    updateSidebarStatus(false);
  };

  // URL canonical manipulation
  const [urlCanonical, updateCanonicalURL] = useState(
    process.env.REACT_APP_PROD_DOMAIN + router.asPath.replace("/", "")
  );

  // Detect route changes for updating canonical
  useEffect(() => {
    updateCanonicalURL(window.location.href);
  }, [router]);

  // Render
  return (
    <Fragment>
      {/* Default SEO settings */}
      <MetaRenderer
        title="BlockPlay"
        description="⚡ BlockPlay, create your game! creating smart contracts using Signum SmartJ on the Signum BlockChain."
        imgUrl={null}
        canonical={urlCanonical}
      />

      {/* Header */}
      <Header openSidebar={sidebarOpener} />

      {/* Sidebar */}
      <Sidebar showSideDrawer={showSidebar} closeSideDrawer={sidebarCloser} />

      {
        // Body content
        children
      }

      {/* Footer */}
      <Footer />
    </Fragment>
  );
};

export default Layout;
