// Next.js dependencies
import Head from "next/head";
import { useRouter } from "next/router";

// React dependencies
import { useEffect } from "react";

// Material-ui dependencies
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../styles/theme";

// Global styling
import "../styles/globals.css";

// Components
import Layout from "../containers/layout/index";

// Third-party dependencies
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const MyApp = ({ Component, pageProps }) => {
  // Route data
  const router = useRouter();

  useEffect(() => {
    // Routes event listeners, Nprogress is used for showing loading state of a changing route
    NProgress.configure({ showSpinner: false, easing: "ease", speed: 500 });

    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });

    router.events.on("routeChangeError", () => {
      NProgress.done();
    });

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        {/* SEO Basics */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=no,minimum-scale=1,maximum-scale=1"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* PWA Basics */}
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        <link rel="mask-icon" href="/pinned.svg" color="#258cde"></link>
      </Head>
      <CssBaseline />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
