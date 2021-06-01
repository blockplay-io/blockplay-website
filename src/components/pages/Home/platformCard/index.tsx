// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Styling
import styles from "./platformCard.module.css";

// Third-party
import clsx from "clsx";

// Props
interface platformCardProps {
  // Obvious!
  title: any;

  // Is pretty obvious!
  description: any;

  //Button "text" label
  btnLabel: any;

  // Side of images of card
  imgUrl: any;

  // Side of images of card
  side: "left" | "right";

  // Action
  onClick: any;
}

const platformCard = ({
  title,
  description,
  btnLabel,
  imgUrl,
  side,
  onClick,
}: platformCardProps) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="space-between"
      wrap="wrap"
      className={clsx(
        side && side == "right" ? styles.platformCardRight : null,
        styles.platformCardContainer
      )}
    >
      <img src={imgUrl} loading="lazy" />
      <Grid className={styles.platformCardContentContainer}>
        <Typography variant="h6" component="p">
          {title}
        </Typography>
        <Typography component="span" color="textSecondary" gutterBottom>
          {description}
        </Typography>
        <Button onClick={onClick} color="secondary">
          {btnLabel}
        </Button>
      </Grid>
    </Grid>
  );
};

export default platformCard;
