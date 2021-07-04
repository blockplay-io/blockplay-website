// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Accordion - Material UI
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

// Material icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Styling
import styles from "./howToSection.module.css";

// Third-party
import clsx from "clsx";

// Box container, do not need typescript
const CardBoxContainer = (props) => {
  const { title, children } = props;

  return (
    <Grid className={styles.cardBoxContainer}>
      <Typography variant="h5">{title}</Typography>

      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        className={styles.boxContentContainer}
      >
        {children}
      </Grid>
    </Grid>
  );
};

// Render
const howToSection = () => {
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      {/* First card - How can i play this game? */}
      <CardBoxContainer title="How to Play">
        {/* Requirements */}
        <Grid className={styles.boxRowContentContainer}>
          <Typography component="span">Requirements</Typography>

          <Typography component="li">
            A personal{" "}
            <a
              target="_blank"
              href="https://phoenix-wallet.rocks/"
              style={{
                color: "var(--secondary-dark-color)",
                textDecoration: "underline",
              }}
            >
              Signum wallet
            </a>{" "}
            (not from an exchange)
          </Typography>

          <Typography component="li">
            Enough Signa in your wallet to cover the challenge plus a small
            transaction fee
          </Typography>

          <Typography component="li">
            Use BTDEX or other exchanges to get Signa
          </Typography>
        </Grid>

        {/* Choose your class */}
        <Grid className={styles.boxRowContentContainer}>
          <Typography component="span">Choose your class</Typography>

          <Typography>
            Select your preferred weight class ranging from Heavyweight to
            Atomweight.
          </Typography>
        </Grid>

        {/* Challenge the champion */}
        <Grid className={styles.boxRowContentContainer}>
          <Typography component="span">Challenge the champion</Typography>

          <Typography>
            In order to challenge the champion, click the "Challenge now"
            button. Your wallet will automatically open and be populated with
            the proper information to send the challenge funds. All funds in the
            game are secured by smart contracts on the Signum blockchain.
          </Typography>

          <Typography
            component="li"
            style={{ color: "var( --primary-error-color)" }}
          >
            Never send funds directly from an exchange, use your own wallet
          </Typography>
          <Typography
            component="li"
            style={{ color: "var( --primary-error-color)" }}
          >
            Never send funds to the current champion's address
          </Typography>
        </Grid>

        {/* Wait for fight results */}
        <Grid className={styles.boxRowContentContainer}>
          <Typography component="span">Wait for the fight results</Typography>

          <Typography>
            This game runs in an autonomous and trustless way. After your
            challenge funds are sent, the fight takes place in the next block
            confirmation (about 4 minutes). If two or more challenges are
            received in the same block, the fights occur in a random order.
          </Typography>
        </Grid>

        {/* Definitive Results */}
        <Grid className={styles.boxRowContentContainer}>
          <Typography component="span">Definitive Results</Typography>

          <Typography>
            If the challenger is the winner, his challenge will be refunded and
            he will become the new champion.
          </Typography>
          <Typography>
            If the current champion is the winner, the champion will take the
            challenger’s amount.
          </Typography>
        </Grid>
      </CardBoxContainer>

      {/* Second card - FAQ*/}
      <CardBoxContainer title="Frequently Asked Questions">
        {/* First question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              Are my chances of winning higher if I challenge with more Signa?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography gutterBottom>
                Yes, by challenging with a higher amount, you increase your
                chances of winning. However, you risk a higher amount going to
                the current champion if you lose.
              </Typography>

              <Typography>
                You can see examples of a challenge at the bottom.
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Second question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              How is the winner determined?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography gutterBottom>
                For each category there is a weight. The challenger's chances of
                winning are a function of the weight class and the chosen
                challenge amount in Signa as follows: chance =
                challenge/(challenge + weight).
              </Typography>
              <Typography>
                You can see examples of a challenge at the bottom.
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Third question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              Will rich players always win?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography>
                By challenging with more Signa you increase your chances, but
                you still might lose no matter how large your challenge is. So,
                if the champion beats a high challenge, the champion will get a
                good return.
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Forth question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              To challenge the champion, which address should I send the Signa
              to?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography>
                Always send Signa to the smart contract address, never to the
                current champion's address.
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Fifth question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              Can I challenge if there are other fighters waiting in line?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography>
                You can challenge a champion anytime. If there are multiple
                challengers in line, all fights take place in a single block in
                a random order.
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Sixth question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              If I'm the reigning champion, what should I do?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography>
                Congratulations, take a screenshot and share with your frineds!
                Now you just have to wait for challengers. Invite your friends
                to challenge you. Every time you beat a challenger you get their
                challenge Signa.
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Seventh question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              If I beat the champion do I get the prize pot?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography>
                No, there is no prize pot. If you beat the current champion you
                get your challenge back (minus fees) and become the new
                champion. Being a champion means you get the Signa challenge of
                all challengers you defeat.
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Eight question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              Can i challenge multiple champions?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography>
                Yes, you can challenge champions in different weight classes
                with the same Signum wallet.
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Nith question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              What is the minimum transaction fee?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography>
                Every transaction on the Signum blockchain costs a fee to be
                processed. Transactions with higher fees are processed faster,
                so you should have no problem if you choose the standard fee.
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Tenth question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              Details about fees
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography>
                Every smart contract on the blockchain costs Signa to run which
                is paid to the miners. The Block Champions smart contract costs
                around 1% fee on challenges. This fee goes to the TRT holders.
                (plus 0.1 Signa activation fee).
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Eleventh question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              What is TRT?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography>
                Trade Token (TRT) is a new token with a unique distribution
                mechanism: trade rewards. For every finished BTDEX cross-chain
                or fiat trade, offer makers are rewarded with TRT in an amount
                numerically equal to the taker fee (0.25 %). In addition, every
                TRT holder is entitled to Signa trading fees monthly, coming
                from the 0.25 % fees paid in Signa by offer takers.
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </CardBoxContainer>

      {/* Third card - Example  */}
      <CardBoxContainer title="Examples">
        {/* Example #1 question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              View example #1
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container direction="column">
              {/* Choose a class*/}
              <Grid className={styles.boxRowContentContainer}>
                <Typography component="span">
                  Choose one weight class and challenge the current champion
                </Typography>

                <Typography>
                  You have chosen the Lightweight class (1,000 Signa)
                </Typography>
              </Grid>

              {/* Send amount */}
              <Grid className={styles.boxRowContentContainer}>
                <Typography component="span">
                  Send your challenge amount
                </Typography>

                <Typography>
                  Challenging with 900 Signa means there is a 47.36% chance you
                  will become the new champion.
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontWeight: 500 }}
                >
                  Calculating the probability of winning
                </Typography>

                <Typography component="li">
                  (Challenge you have sent) / (Challenge you have sent + weight)
                </Typography>
                <Typography component="li">(900) / (900 + 1,000)</Typography>
                <Typography component="li">(900) / (1,900)</Typography>
                <Typography component="li">0.4736</Typography>
                <Typography component="li">
                  (0.4736) * (100) = 47.36%
                </Typography>
              </Grid>

              {/* Wait for fight results*/}
              <Grid className={styles.boxRowContentContainer}>
                <Typography component="span">Wait for fight results</Typography>

                <Typography>
                  After your challenge funds are sent, the fight takes place in
                  the next block confirmation (about 4 minutes). If two or more
                  challenges are received in the same block, the fights occurs
                  in a random order.
                </Typography>
              </Grid>

              {/* Wait for fight results*/}
              <Grid className={styles.boxRowContentContainer}>
                <Typography component="span">Definitive Results</Typography>

                <Typography>
                  If you are the winner, your challenge will be refunded and you
                  will become the new champion.
                </Typography>

                <Typography>
                  If the current champion is the winner, the champion will take
                  your challenge amount.
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Example #2 question */}
        <Accordion
          style={{ width: "100%" }}
          className={clsx("defaultTransition", styles.accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={styles.questionTitle}>
              View example #2
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container direction="column">
              {/* Choose a class*/}
              <Grid className={styles.boxRowContentContainer}>
                <Typography component="span">
                  Choose one weight class and challenge the current champion
                </Typography>

                <Typography>
                  You have choosen the Middleweight class (5,000 Signa)
                </Typography>
              </Grid>

              {/* Send amount */}
              <Grid className={styles.boxRowContentContainer}>
                <Typography component="span">
                  Send your challenge amount
                </Typography>

                <Typography>
                  Challenging with 2,795 Signa means there is a 35% chance you
                  will become the new champion.
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontWeight: 500 }}
                >
                  Calculating the probability of winning
                </Typography>

                <Typography component="li">
                  (Challenge you have sent) / (Challenge you have sent + weight)
                </Typography>
                <Typography component="li">
                  (2,795) / (2,795 + 5,000)
                </Typography>
                <Typography component="li">(2,795) / (7,795) </Typography>
                <Typography component="li">0.35</Typography>
                <Typography component="li">(0.35) * (100) = 35%</Typography>
              </Grid>

              {/* Wait for fight results*/}
              <Grid className={styles.boxRowContentContainer}>
                <Typography component="span">Wait for fight results</Typography>

                <Typography>
                  After your challenge funds are sent, the fight takes place in
                  the next block confirmation (about 4 minutes). If two or more
                  challenges are received in the same block, the fights occurs
                  in a random order.
                </Typography>
              </Grid>

              {/* Wait for fight results*/}
              <Grid className={styles.boxRowContentContainer}>
                <Typography component="span">Definitive Results</Typography>

                <Typography>
                  If you are the winner, your challenge will be refunded and you
                  will become the new champion.
                </Typography>

                <Typography>
                  If the current champion is the winner, the champion will take
                  your challenge amount.
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </CardBoxContainer>
    </Grid>
  );
};

export default howToSection;
