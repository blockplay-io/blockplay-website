// Material ui list
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Material ui icons
import HelpIcon from "@material-ui/icons/Help";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// Extra
import clsx from "clsx";

// Style
import styles from "./index.module.css";

const ListRender = (props) => {
  // Conditional rendering
  let listedText = (
    <ListItemText
      className={clsx(
        styles.listText,
        props.proTag && props.proTag === true ? styles.proTag : null
      )}
      primary={props.textList || "Missing"}
    />
  );

  // Check if user has multiple text
  if (props.secondText && props.secondText.trim() !== "") {
    listedText = (
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "auto",
          paddingTop: "10px",
        }}
      >
        <ListItemText
          className={clsx(
            styles.listText,
            props.proTag && props.proTag === true ? styles.proTag : null
          )}
          primary={props.textList || "Missing"}
        />
        <ListItemText
          className={clsx(
            styles.listText,
            props.proTag && props.proTag === true ? styles.proTag : null,
            styles.secondText
          )}
          primary={props.secondText || "Missing"}
        />
      </Grid>
    );
  }

  return (
    <ListItem
      button
      className={clsx(
        styles.listContainer,
        props.activeTab && props.activeTab == true ? styles.activeList : null,
        props.fullWidth && props.fullWidth === true ? styles.fullWidth : null
      )}
      onClick={props.onClick}
    >
      <ListItemIcon style={{ minWidth: "37px" }}>
        {props.icon ? (
          props.icon
        ) : (
          <HelpIcon style={{ color: "rgba(0, 0, 0, 0.6)" }} />
        )}
      </ListItemIcon>

      {listedText}

      {props.hideArrow ? null : (
        <ChevronRightIcon style={{ color: "rgba(0, 0, 0, 0.6)" }} />
      )}
    </ListItem>
  );
};

export default ListRender;
