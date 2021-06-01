// Next.js dependencies
import { useRouter } from "next/router";
import Link from "next/link";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

// Material icons
import MenuIcon from "@material-ui/icons/Menu";

// Styles
import styles from "./Header.module.css";

// Third-party
import clsx from "clsx";

// Header props
export interface HeaderProps {
  openSidebar: any;
}

const Header = ({ openSidebar }: HeaderProps) => {
  // Route details
  const router = useRouter();
  const { query, pathname } = router;

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className={styles.headerContainer}
    >
      <Grid
        container
        item
        direction="row"
        alignItems="center"
        className={styles.floatingHeaderContainer}
        component="header"
      >
        {/* Mobile button */}
        <Grid item className={styles.mobileBtnContainer}>
          <IconButton onClick={openSidebar}>
            <MenuIcon style={{ fontSize: 36 }} />
          </IconButton>
        </Grid>

        {/* Logo side */}
        <Grid item>
          <Link href="/">
            <Typography
              className={styles.tempStyle}
              style={{
                fontSize: 20,
                color: "rgba(0,0,0,0.8)",
                fontWeight: 700,
                textAlign: "center",
                padding: "5px 7px",
                cursor: "pointer",
              }}
            >
              BlockPlay
            </Typography>
          </Link>
        </Grid>

        {/* Nav side */}
        <Grid item className={styles.navLinksContainer} component="nav">
          {/* Champions */}
          <Link href="/champions">
            <Typography
              className={clsx(
                "defaultTransition",
                pathname && pathname.includes("/champions")
                  ? styles.activeLink
                  : null
              )}
            >
              Champions
            </Typography>
          </Link>

          {/* Koh-i-Noor */}
          <Link href="https://kohinoor.blockplay.io/" passHref>
            <Typography component="a" target="_blank">
              Koh-i-Noor
            </Typography>
          </Link>

          <Link href="/?build=app">
            <Typography
              className={clsx(
                "defaultTransition",
                query.build && query.build == "app" ? styles.activeLink : null
              )}
            >
              Build your dApp
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
