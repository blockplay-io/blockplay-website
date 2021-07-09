// Next
import { useRouter } from "next/router";

// React dependencies
import { Fragment, useEffect } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

// Material icons
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import FlagIcon from "@material-ui/icons/Flag";
import GitHubIcon from "@material-ui/icons/GitHub";

import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

// Styling
import styles from "./Home.module.css";

// Components
import PlatformCard from "../components/pages/Home/platformCard/index";

// Third-party
import clsx from "clsx";
import { scroller } from "react-scroll";

// React reveal
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";

export default function Home() {
  // Router details
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    // Detect if user clicked the link "Build your dApp" it will scroll automatically to that section
    if (query.build && query.build == "app") {
      scroller.scrollTo("myScrollToElement", {
        duration: 1000,
        delay: 100,
        smooth: true,
        offset: -100,
      });
    }
  }, [query]);

  // Redirect user
  const goToSite = (route, newPage = false) => {
    // Open tab in new page
    if (newPage == true) {
      return window.open(route, "_blank").focus();
    }

    router.push(route).then(() => {
      window.scrollTo(0, 0);
    });
  };

  return (
    <Fragment>
      {/* First section */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={clsx("defaultBg", styles.firstSectionBanner)}
        style={{
          background:
            "linear-gradient(60deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.75)), url(/assets/pages/home/f-banner.jpg)",
        }}
      >
        <Bounce left>
          <Typography component="h1" variant="h3" align="center">
            Welcome to BlockPlay
          </Typography>
          <Typography align="center">
            Do you have a <b>crazy idea</b>? Take advantage of the latest{" "}
            <Hidden smDown>
              <br />
            </Hidden>
            blockchain features using smart contracts on the Signum "previously
            known as burstcoin" blockchain.
          </Typography>
        </Bounce>
      </Grid>

      {/* Second section */}
      <Fade bottom>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          className={styles.secondSectionContainer}
        >
          <Typography
            variant="h4"
            align="center"
            style={{ fontWeight: 500, color: "var(--primary-text-color)" }}
          >
            It's as wonderful as it seems
          </Typography>

          <Typography
            align="center"
            style={{ marginBottom: "2rem", color: "var(--primary-text-color)" }}
          >
            Check out these dApps created by BlockPlay
          </Typography>

          {/* Show platforms */}

          {/* Champions */}
          <PlatformCard
            title="Block Champions"
            description="Choose your class from heavyweight to atomweight and knock their block off!"
            btnLabel="Play  >"
            side="left"
            imgUrl="/assets/pages/home/champions.jpg"
            onClick={() => {
              goToSite("/champions");
            }}
          />

          {/* Soon, https://signum.dappository.world/ */}
          <PlatformCard
            title="Your next idea!"
            description="Easily create your dApp on the Signum blockchain using smart contracts, tokens and more!"
            btnLabel="See Examples >"
            side="right"
            imgUrl="/assets/pages/home/next.jpg"
            onClick={() => {
              goToSite("https://burst.dappository.world/", true);
            }}
          />
        </Grid>
      </Fade>

      {/* Third section */}
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        className={clsx(styles.thirdSectionContainer, "defaultBg")}
        style={{
          background:
            "linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0.92) 100%), url(/assets/pages/home/idea-banner.jpg)",
        }}
      >
        <Fade bottom>
          <form name="myScrollToElement" onSubmit={null}></form>
          <Typography component="h1" variant="h4" align="center">
            Bringing your ideas to life
          </Typography>
          <Typography align="center">
            BlockPlay uses some of the wonderful features of the Signum
            blockchain to make your ideas a reality.
          </Typography>

          <Grid
            item
            container
            direction="row"
            alignItems="stretch"
            justifyContent="space-between"
            wrap="wrap"
            className={styles.thirdSectionContentContainer}
          >
            {/* First idea */}
            <Grid item className={styles.thirdSectionIdeaCard}>
              <SportsEsportsIcon
                fontSize="large"
                className={styles.thirdSectionIdeaIcon}
              />

              <Typography component="p">Games</Typography>
              <Typography component="span" color="textSecondary">
                Create your own trustless and unstoppable game. If you have an
                idea, Signum SmartJ can bring it to life.
              </Typography>
            </Grid>

            {/* Second idea */}
            <Grid item className={styles.thirdSectionIdeaCard}>
              <DashboardIcon
                fontSize="large"
                className={styles.thirdSectionIdeaIcon}
              />

              <Typography component="p">NFTs</Typography>
              <Typography component="span" color="textSecondary">
                Our all-new NFT platform is coming soon. Enjoy a platform where
                you can sell, give away, or auction your digital collectibles.
              </Typography>
            </Grid>

            {/* Third idea */}
            <Grid item className={styles.thirdSectionIdeaCard}>
              <MonetizationOnIcon
                fontSize="large"
                className={styles.thirdSectionIdeaIcon}
              />

              <Typography component="p">Tokens</Typography>
              <Typography component="span" color="textSecondary">
                Create your own tokens and use the built-in functions to
                transfer, buy, and sell with just a few clicks.
              </Typography>
            </Grid>

            {/* Fourth idea */}
            {/* <Grid item className={styles.thirdSectionIdeaCard}>
              <Typography component="p">Marketplace</Typography>
              <Typography component="span" color="textSecondary">
                Buy and sell any type of merchandise including digital goods
                like software, music, and videos. All done peer-to-peer on the
                Signum blockchain.
              </Typography>
            </Grid> */}
          </Grid>
          <Typography align="center">And much more!</Typography>
        </Fade>
      </Grid>

      {/* Forth section */}
      <Fade bottom>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
          style={{
            maxWidth: "964px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1em",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          {/* First identity */}
          <Grid item className={styles.forthSectionCard}>
            <TrendingUpIcon fontSize="large" />
            <Typography component="p">Vision</Typography>
            <Typography component="span" color="textSecondary">
              To bring fair, trustless and open entertainment for the world.
            </Typography>
          </Grid>

          {/* Second identity */}
          <Grid item className={styles.forthSectionCard}>
            <FlagIcon fontSize="large" />
            <Typography component="p">Goal</Typography>
            <Typography component="span" color="textSecondary">
              To become the new blockchain standard for the entertainment
              industry.
            </Typography>
          </Grid>

          {/* Third identity */}
          <Grid item className={styles.forthSectionCard}>
            <GitHubIcon fontSize="large" />
            <Typography component="p">Open-source</Typography>
            <Typography component="span" color="textSecondary">
              Anyone can create their own smart contracts using Signum SmartJ.
              And it's free!.
            </Typography>
          </Grid>
        </Grid>
      </Fade>
    </Fragment>
  );
}
