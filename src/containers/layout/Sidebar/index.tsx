// Next
import { useRouter } from "next/router";

// Material ui
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

// Material ui list
import Divider from "@material-ui/core/Divider";

// Material ui icons
import CloseIcon from "@material-ui/icons/Close";
import SportsMmaIcon from "@material-ui/icons/SportsMma";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PublicIcon from "@material-ui/icons/Public";

// Styling
import styles from "./Sidebar.module.css";

// Components
import ListRender from "./components/list/index";

// Third-party
import copy from "copy-to-clipboard";

interface SidebarProps {
  showSideDrawer: any;
  closeSideDrawer: any;
}

const Sidebar = ({ showSideDrawer, closeSideDrawer }: SidebarProps) => {
  // Router details
  const router = useRouter();

  // SideDrawer manipulation
  const goToSite = (route, newPage = false) => {
    closeSideDrawer();

    // Open tab in new page
    if (newPage == true) {
      return window.open(route, "_blank").focus();
    }

    router.push(route).then(() => {
      window.scrollTo(0, 0);
    });
  };

  // Conditional components
  let divider = <Divider style={{ width: "100%" }} light={true} />;

  // Render sidebar
  return (
    <Drawer anchor="top" open={showSideDrawer} onClose={closeSideDrawer}>
      <div className={styles.sideBarContainer}>
        {/* Close section */}
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <IconButton
            aria-label="close"
            size="medium"
            onClick={closeSideDrawer}
          >
            <CloseIcon style={{ fontSize: 37 }} />
          </IconButton>
        </Box>

        {/* First section */}
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          px={1}
          mb={2}
        >
          <Typography
            align="center"
            variant="body1"
            color="textPrimary"
            className={styles.firstTitle}
          >
            Made with ⚡ <br /> for enthusiasts by enthusiasts
          </Typography>
        </Box>

        {
          // Grey divider
          divider
        }

        {/* Second section */}
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          mt={1}
          mb={3}
        >
          <ListRender
            onClick={() => {
              goToSite("/champions");
            }}
            icon={
              <SportsMmaIcon
                style={{ fontSize: 27, color: "var(--primary-error-color)" }}
              />
            }
            textList="Block Champions"
          />

          <ListRender
            onClick={() => {
              goToSite("https://kohinoor.blockplay.io/", true);
            }}
            icon={
              <BlurOnIcon
                style={{ fontSize: 27, color: "var(--secondary-dark-color)" }}
              />
            }
            textList="Koh-i-Noor"
          />

          <ListRender
            onClick={() => {
              goToSite("/?build=app");
            }}
            icon={<AccountTreeIcon style={{ fontSize: 27 }} />}
            textList="Build your dApp"
          />
        </Box>

        {
          // Grey divider
          divider
        }

        {/* Share section */}
        <Box mt={2} width="100%"></Box>
        <Typography align="center" style={{ width: "100%" }}>
          Share it with your community!
        </Typography>

        <Box
          mt={2}
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box width={{ xs: "100%", md: "48%" }}>
            <ListRender
              onClick={() => {
                const mainLink = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
                window.open(mainLink);
              }}
              icon={<FacebookIcon style={{ fontSize: 25 }} />}
              textList="Facebook"
              hideArrow
            />
          </Box>
          <Box width={{ xs: "100%", md: "48%" }}>
            <ListRender
              onClick={() => {
                const mainLink = `https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this amazing site! 🔥`;
                window.open(mainLink);
              }}
              icon={<TwitterIcon style={{ fontSize: 25 }} />}
              textList="Twitter"
              hideArrow
            />
          </Box>

          <Box width={{ xs: "100%", md: "48%" }}>
            <ListRender
              onClick={() => {
                const mainLink = `https://t.me/share/url?url=${window.location.href}&text=Check out this amazing site! 🔥`;
                window.open(mainLink);
              }}
              icon={<TelegramIcon style={{ fontSize: 25 }} />}
              textList="Telegram"
              hideArrow
            />
          </Box>

          <Box width={{ xs: "100%", md: "48%" }}>
            <ListRender
              onClick={() => {
                const mainLink = `https://wa.me/?text=Check out this amazing site!, ${window.location.href}`;
                window.open(mainLink);
              }}
              icon={<WhatsAppIcon style={{ fontSize: 25 }} />}
              textList="WhatsApp"
              hideArrow
            />
          </Box>

          <Box width="100%">
            <ListRender
              onClick={async () => {
                const mainLink = window.location.href;
                await copy(mainLink);
                alert("Link copied successfully!");
                return closeSideDrawer();
              }}
              icon={<PublicIcon style={{ fontSize: 25 }} />}
              textList="Copy URL or Link"
              fullWidth={true}
            />
          </Box>
        </Box>
      </div>
    </Drawer>
  );
};

export default Sidebar;
