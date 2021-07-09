// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Styling
import styles from "./classCard.module.css";

// Functions
import { thousands_separators } from "../../../../utils/function/extra";

// Props
interface classCardProps {
  // Obvious!
  title: any;

  // Champion's info, username or signa address
  champion: any;

  // Side of images of card
  imgUrl: any;

  // Weight label (Quantiy of signa)
  weightPriceLabel: any;

  // Action
  onClick: any;
}

const classCard = ({
  title,
  champion,
  imgUrl,
  weightPriceLabel,
  onClick,
}: classCardProps) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      justifyContent="flex-start"
      wrap="wrap"
      className={styles.platformCardContainer}
    >
      <Grid
        item
        className={styles.platformCardImgContainer}
        style={{
          background: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.75) 100%), url(${imgUrl})`,
        }}
      >
        <Typography align="center">{title}</Typography>
        <Typography
          component="span"
          align="center"
          style={{
            color: "var(--primary-error-color)",
            fontWeight: 500,
            fontSize: 22.5,
          }}
        >
          {thousands_separators(weightPriceLabel)}
        </Typography>
      </Grid>

      <Grid className={styles.platformCardContentContainer}>
        <Typography component="span" color="textPrimary">
          Defending champion
        </Typography>
        <Typography color="textSecondary">{champion}</Typography>

        <Button onClick={onClick} color="secondary">
          Open now
        </Button>
      </Grid>
    </Grid>
  );
};

export default classCard;
