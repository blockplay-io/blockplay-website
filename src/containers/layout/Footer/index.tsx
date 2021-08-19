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
      justifyContent="flex-start"
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
        justifyContent="flex-start"
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

          <Link href="https://github.com/signum-network/signum-smartj" passHref>
            <Typography component="a" target="_blank">
              Signum SmartJ
            </Typography>
          </Link>

          <Link href="https://signum-network.github.io/signumjs/" passHref>
            <Typography component="a" target="_blank">
              Signum.js
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

          <Link href="https://signum.network/exchanges.html" passHref>
            <Typography component="a" target="_blank">
              Buy Signa here
            </Typography>
          </Link>

          <Link href="/champions" passHref>
            <Typography component="a">Champions</Typography>
          </Link>

          <Link href="/koh-i-noor" passHref>
            <Typography component="a">Koh-i-Noor</Typography>
          </Link>
        </Grid>
      </Grid>

      {/* Second row */}
      <Grid
        container
        item
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        wrap="wrap"
        className={styles.footerBrandingContainer}
      >
        <Grid item xs={12} md={6}>
          <img
            src="/assets/powered.svg"
            style={{ width: "91px", marginRight: "12px" }}
          />

          <img src="/assets/signumjs.svg" style={{ width: "121px" }} />
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
