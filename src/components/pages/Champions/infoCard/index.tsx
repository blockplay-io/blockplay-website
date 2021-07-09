// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Props
interface infoCardProps {
  // Obvious!
  title: any;

  // Second line
  label: any;

  // Third line
  secondLabel: any;

  // Third line (Second text)
  thirdLabel?: any;

  // Optional style
  optionalClass?: any;
}

const infoCard = ({
  title,
  label,
  secondLabel,
  thirdLabel,
  optionalClass,
}: infoCardProps) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      className={optionalClass ? optionalClass : null}
      style={{
        padding: "1.25em 1em",
        border: "0.5px solid var(--primary-border-color)",
        borderRadius: 8,
      }}
    >
      <Typography component="span" style={{ fontSize: 16 }}>
        {title}
      </Typography>
      <Typography gutterBottom color="textSecondary" variant="subtitle2">
        {label}
      </Typography>
      <Grid
        item
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography color="textSecondary" variant="body2">
          {secondLabel}
        </Typography>

        {thirdLabel && thirdLabel.trim() != "" ? (
          <Typography
            variant="body2"
            style={{
              marginLeft: 4,
              color: "rgba(255, 0, 0, 1)",
              background: "rgba(255, 0, 0, 0.03)",
              padding: "0.2em 1em",
              fontSize: 12,
              borderRadius: 16,
            }}
          >
            {thirdLabel}
          </Typography>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default infoCard;
