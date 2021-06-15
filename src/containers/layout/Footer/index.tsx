// Next.js dependencies
import Link from "next/link";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Styles
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className={styles.footerContainer}
      component="footer"
    >
      {/* First row */}
      <Grid
        container
        item
        direction="row"
        alignItems="flex-start"
        justify="flex-start"
        wrap="wrap"
        className={styles.footerColumnsContainer}
        component="nav"
      >
        {/* First column */}
        <Grid item className={styles.footerForumLink}>
          <Typography component="span" gutterBottom>
            Important links
          </Typography>

          <Link href="https://signum.network/" passHref>
            <Typography component="a" target="_blank">
              Signum website
            </Typography>
          </Link>

          <Link href="https://burstcoin.ist/" passHref>
            <Typography component="a" target="_blank">
              Burstcoin.ist <b>*</b>
            </Typography>
          </Link>

          <Link href="https://github.com/burst-apps-team/blocktalk" passHref>
            <Typography component="a" target="_blank">
              BlockTalk <b>*</b>
            </Typography>
          </Link>

          <Link href="https://burst-apps-team.github.io/phoenix/" passHref>
            <Typography component="a" target="_blank">
              Burst.js <b>*</b>
            </Typography>
          </Link>
        </Grid>

        {/* Second column */}
        <Grid item className={styles.footerForumLink}>
          <Typography component="span" gutterBottom>
            Contact us!
          </Typography>

          <Link href="https://discord.gg/VagTTaKM2j" passHref>
            <Typography component="a" target="_blank">
              Discord
            </Typography>
          </Link>

          <Link href="https://t.me/signumnetwork" passHref>
            <Typography component="a" target="_blank">
              Telegram
            </Typography>
          </Link>

          <Link href="https://twitter.com/signum_official" passHref>
            <Typography component="a" target="_blank">
              Twitter
            </Typography>
          </Link>

          <Link href="https://www.reddit.com/r/Signum/" passHref>
            <Typography component="a" target="_blank">
              Reddit
            </Typography>
          </Link>
        </Grid>

        {/* Third column */}
        <Grid item className={styles.footerForumLink}>
          <Typography component="span" gutterBottom>
            Featured Links
          </Typography>

          <Link href="https://www.burst-coin.org/exchanges/" passHref>
            <Typography component="a">
              Buy Signa here <b>*</b>
            </Typography>
          </Link>

          <Link href="/champions" passHref>
            <Typography component="a">Champions</Typography>
          </Link>

          <Link href="https://kohinoor.blockplay.io/" passHref>
            <Typography component="a" target="_blank">
              Koh-i-Noor
            </Typography>
          </Link>
        </Grid>
      </Grid>

      {/* Second row */}
      <Grid
        container
        item
        direction="row"
        alignItems="center"
        justify="space-between"
        wrap="wrap"
        className={styles.footerBrandingContainer}
      >
        <Grid item xs={12} md={6}>
          <img
            src="/assets/powered.png"
            style={{ width: "71px", marginRight: "7px" }}
          />
          <img src="/assets/burstjs.png" style={{ width: "121px" }} />
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center">
          Hosted By{" "}
          <a target="_blank" href="https://shop.burstcoin.ro/index.php">
            shop.burstcoin.ro
          </a>{" "}
          @ BlockPlay
          {/* {new Date().getFullYear()} */}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
