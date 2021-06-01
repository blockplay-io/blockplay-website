// Next
import Head from "next/head";

//To avoid duplicate tags in your head you can use the key property,
//which will make sure the tag is only rendered once

// Props,(sorry i did not use TypeScript)
// title
// canonical
// description
// imgUrl

const MetaRenderer = (props) => {
  return (
    <Head>
      {/* Basic tags*/}
      <title>{props.title}</title>

      {props.canonical && props.canonical !== null ? (
        <link rel="canonical" href={props.canonical} key="defaultCanonical" />
      ) : null}

      {props.description && props.description !== null ? (
        <meta
          name="description"
          content={props.description}
          key="defaultDescription"
        />
      ) : null}

      {props.keywords && props.keywords !== null ? (
        <meta name="keywords" content={props.keywords} key="defaultKeywords" />
      ) : null}

      {/* Facebook tags */}
      <meta property="og:type" content="website" key="defaultWebsite" />
      <meta
        property="og:site_name"
        content="blockplay.io"
        key="defaultSiteName"
      />
      <meta property="fb:app_id" content="681600232333515" key="defaultAppId" />
      <meta
        property="fb:admins"
        content="100007775565224"
        key="defaultFbAdmin"
      />

      <meta property="og:title" key="defaultOgTitle" content={props.title} />

      {props.description ? (
        <meta
          property="og:description"
          key="defaultOgDescription"
          content={props.description}
        />
      ) : null}

      {props.imgUrl && props.imgUrl !== null ? (
        <meta property="og:image" content={props.imgUrl} key="defaultOgImage" />
      ) : null}

      {props.canonical && props.canonical !== null ? (
        <meta
          property="og:url"
          content={props.canonical}
          key="defaultOgCanonical"
        />
      ) : null}

      {/* Twitter tagss*/}
      <meta name="twitter:card" content="summary" key="defaultTwitterCard" />

      <meta
        name="twitter:title"
        content={props.title}
        key="defaultTwitterTitle"
      />

      {props.description && props.description !== null ? (
        <meta
          name="twitter:description"
          content={props.description}
          key="defaultTwitterDescription"
        />
      ) : null}

      {props.imgUrl && props.imgUrl !== null ? (
        <meta
          property="twitter:image"
          content={props.imgUrl}
          key="defaultTwitterImage"
        />
      ) : null}

      {/* <meta name="twitter:creator" content="" /> key="defaultTwitterCreator" */}
      {/* <meta name="twitter:site" content="@website-username"/> key="defaultTwitterUsername" */}

      {/* Google */}
      <meta name="robots" content="all" key="defaultRobots" />
      <meta name="distribution" content="global" key="defaultDistribution" />
      {/* <meta name="google-site-verification" content="SOrGm9gIXrQhfWQOMTE8fuLV5ZwD1mb6f3as7ON5Eco" key="defaultGoogleVerification" /> */}

      {/* Microsoft */}
      {/* <meta name="msvalidate.01" content="4CFAA27DC2D965416FD6727438A5EF80"  key="defaultMicrosoftVerification" /> */}

      {/* Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebSite",
            alternateName: "BlockPlay",
            url: "https://www.blockplay.io/",
          }),
        }}
      />
    </Head>
  );
};

export default MetaRenderer;
