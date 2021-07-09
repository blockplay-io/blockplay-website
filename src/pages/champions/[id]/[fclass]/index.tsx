// Next
import { useRouter } from "next/router";

// React
import { Fragment, useEffect, useState } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

// Material icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

// Styling
import styles from "./fightClass.module.css";

// Extra
import {
  weightClassessInfo,
  creatorSCToUse,
  assetUrlToUse,
  modernCreator,
} from "../../../../utils/globalParameters";
import { thousands_separators } from "../../../../utils/function/extra";

// Burst.js
import { ContractDataView } from "@burstjs/contracts";
import { sumNQTStringToNumber } from "@burstjs/util";
import burstApi from "../../../../utils/lib/burstjs";

// Components
import InfoCard from "../../../../components/pages/Champions/infoCard/index";
import HowToSection from "../../../../components/pages/Champions/howToSection/index";
import MetaRenderer from "../../../../components/SEO/MetaRender";

// Third-party
import clsx from "clsx";
import QRCode from "react-qr-code";
import copy from "copy-to-clipboard";
import Fade from "react-reveal/Fade";

// Header props
export interface HeaderProps {
  // Get smart contract address
  fetchedId: any;

  // Get details of that weight class
  fetchedClass: any;
}

// Localstorage key for fetching interval
const storageKey = "specificClassFetch";

// Interval variables
var handleFetchingData = null;

const FighthingClass = ({ fetchedId, fetchedClass }: HeaderProps) => {
  // Router details
  const router = useRouter();
  const { pathname } = router;

  // Weight info data
  const [weightClassData, updateWeightClassData] = useState({
    champion: {
      name: "",
      address: "",
      pendentFight: false,
    },
    smartContractAddress: "",
    unconfirmedTransactions: [],
    loadedData: false,
  });

  // Standing data
  const [standingData, updateStandingData] = useState([]);

  // Champion victories
  const [currentChampionVictories, updateVictoriesQuantity] = useState(0);

  // Loading status for ui purposes
  const [isLoading, updateLoadingStatus] = useState(true);
  const [isLoadingStandingData, updateLoadingStandingDataStatus] =
    useState(true);

  // Assign/merge the smart contract data with the hooks
  const assignDataToHook = async () => {
    // Make Promise and fetch smart contract details
    return new Promise(async (resolve) => {
      // Request data for specific contract
      const response = await burstApi.contract.getContract(fetchedId);

      // Smart contract signum address
      const smartContractAddress = response.atRS;

      // Check for pendent transactions, (PENDENT FIGHTS in smart contract)
      const pendentTransactions =
        await burstApi.account.getUnconfirmedAccountTransactions(fetchedId);
      const { unconfirmedTransactions } = pendentTransactions;

      // See if champion is has a pendent fight
      const pendentFight =
        sumNQTStringToNumber(response.balanceNQT) > 1 ||
        (unconfirmedTransactions.length && unconfirmedTransactions.length > 0)
          ? true
          : false;

      // Save account id of current champion
      const helper = new ContractDataView(response);
      const owner = helper.getVariableAsDecimal(1);

      // Get current champion's data
      const data = await burstApi.account.getAccount({
        accountId: owner,
        commitmentAtHeight: undefined,
        includeCommittedAmount: false,
        includeEstimatedCommitment: false,
      });

      // Get champion's name and address
      const championName =
        data.name && data.name.trim() !== "" ? data.name : "";

      const championAddress = data.accountRS;

      // Merge data
      await updateWeightClassData({
        ...weightClassData,
        champion: {
          ...weightClassData.champion,
          name: championName || "",
          address: championAddress || "",
          pendentFight,
        },
        smartContractAddress,
        unconfirmedTransactions,
        loadedData: true,
      });

      resolve(true);
    }).then(async (response) => {
      // Return updated weight info data
      return response;
    });
  };

  // Get victories
  const standingRender = async () => {
    // Get account transactions
    const transactionsData = await burstApi.account.getAccountTransactions({
      accountId: fetchedId,
    });

    // Victory counter
    let victories = 0;
    let dict = {};

    for (let i = 0; i < transactionsData.transactions.length; i++) {
      // Get specific transaction data
      let tri: any = transactionsData.transactions[i];

      // Check if transaction is related to the smart contract and count as a victory
      if (
        tri.type == 22 &&
        tri.amountNQT !== "0" &&
        tri.amountNQT !== 0 &&
        tri.recipient !== creatorSCToUse &&
        tri.recipient !== modernCreator
      ) {
        // Default counter
        victories = 1;

        // Dynamic counter
        if (dict[tri.recipientRS] != null) {
          victories += dict[tri.recipientRS];
        }

        // Save counter
        dict[tri.recipientRS] = victories;
      }
    }

    // Sort and show the holding time
    let items: any = Object.keys(dict).map(function (key, index) {
      return [key, dict[key]];
    });

    // Sort the array
    items.sort((a, b) => {
      return a[1] - b[1];
    });

    // Fetch every fighter's data
    const newData = await new Promise(async (resolve) => {
      if (items.length == 0) {
        resolve([]);
      } else {
        // Reverse array order
        items = items.reverse();

        // Only take 3 elements from an array in order to fetch data from the first 3 fighters
        let newItems = items.slice(0, 3) || [];

        await newItems.map(async (item, index) => {
          // Get current fighter's data
          const data = await burstApi.account.getAccount({
            accountId: item[0],
            commitmentAtHeight: undefined,
            includeCommittedAmount: false,
            includeEstimatedCommitment: false,
          });

          // Name or wallet
          newItems[index][0] =
            data.name && data.name.trim() !== "" ? data.name : data.accountRS;

          // Quantity of victories
          newItems[index][1] = item[1];

          if (index + 1 == newItems.length) {
            resolve(newItems);
          }
        });
      }
    }).then(async (response: any) => {
      return response;
    });

    let handleRender = setInterval(() => {
      // Return updated weight info data
      updateStandingData(newData);
      updateLoadingStandingDataStatus(false);
    }, 700);

    setTimeout(() => {
      // Delete intervals
      window.clearInterval(handleRender);
      handleRender = null;
    }, 2000);
  };

  // Copy address to clipboard and open deeplink "Signum Phoenix wallet"
  const makePayment = () => {
    alert("Signum address copied to clipboard!");
    copy(weightClassData.smartContractAddress);
    window.location.href =
      "signum://requestBurst?receiver=" + weightClassData.smartContractAddress;
  };

  // First function render
  const dataFetcher = async () => {
    const response = await assignDataToHook();

    // Standings render
    await standingRender();
  };

  // ComponentDidMount
  useEffect(() => {
    // Reset fetching interval status
    localStorage.removeItem(storageKey);

    // Fetch initial data
    dataFetcher();
  }, []);

  // Listen to any changes made to current champion or standingData in order to update the champion's victories
  useEffect(() => {
    if (
      standingData &&
      standingData.length &&
      standingData.length > 0 &&
      weightClassData.champion.address !== ""
    ) {
      standingData.map((championData) => {
        const address = championData[0];
        const victories = championData[1];

        if (
          (address == weightClassData.champion.address ||
            address == weightClassData.champion.name) &&
          victories &&
          victories > 0
        ) {
          updateVictoriesQuantity(victories);
        }
      });
    }
  }, [weightClassData.champion.address, standingData]);

  // Listen to any changes made to loadedData in order to activate the interval
  useEffect(() => {
    if (weightClassData.loadedData == true) {
      // Update loading indicator to false
      updateLoadingStatus(false);

      // Event listner's function
      const handleRouteChange = (execute = null) => {
        // Get localstorage details in order to see if user can fetch data or not
        const tempFetch: any = localStorage.getItem(storageKey) || null;

        // Every 10 seconds, Update hooks interval
        handleFetchingData = setInterval(() => {
          if (
            pathname == "/champions/[id]/[fclass]" &&
            localStorage.getItem(storageKey) == "true" &&
            execute != true
          ) {
            assignDataToHook();
          }
        }, 10000);

        // Check if user wants to remove the intervals
        if (
          pathname == "/champions/[id]/[fclass]" &&
          tempFetch == "true" &&
          execute != true
        ) {
          // Delete intervals
          window.clearInterval(handleFetchingData);
          handleFetchingData = 0;

          // Reset championFetch status
          localStorage.removeItem(storageKey);
        } else {
          // Enable fetching (Activate interval)!
          localStorage.setItem(storageKey, "true");
        }

        // After 100 seconds, user will delete intervals, and alert the user
        setTimeout(() => {
          window.clearInterval(handleFetchingData);

          if (localStorage.getItem(storageKey) == "true") {
            // After 2 minutes more, ask if user wants to reload page
            setTimeout(() => {
              if (localStorage.getItem(storageKey) == "true") {
                if (window.confirm("Do you want to reload the page?")) {
                  window.location.reload();
                }
              }
            }, 120000);
          }
        }, 100000);
      };

      if (
        pathname == "/champions/[id]/[fclass]" &&
        localStorage.getItem(storageKey) == null
      ) {
        // Activate interval, first time firing
        handleRouteChange();
      }

      // Event listeners for current fetching until component is unmounted
      // Create event listener
      router.events.on("routeChangeStart", handleRouteChange);

      // Cleaneup event listener
      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      };
    }
  }, [weightClassData.loadedData]);

  // Conditional rendering

  // First section
  let title = null;
  let pricetag = null;
  const weightkey = fetchedClass.toUpperCase();

  // Check if user selected a compatible object
  if (weightClassessInfo[weightkey]) {
    title = weightClassessInfo[weightkey].name;
    pricetag = thousands_separators(weightClassessInfo[weightkey].priceTag);
  }

  return (
    <Fragment>
      {/* SEO */}
      <MetaRenderer
        title={`${title} - Block Champions`}
        description="Meet Block Champions, a dApp made with Signum SmartJ. Beat the every challenge you face! choose your class and knock their block off!"
        imgUrl={`${assetUrlToUse}assets/pages/champions/seo.jpg`}
      />

      {/* First section */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={clsx(styles.firstSectionBanner, "defaultBg")}
        wrap="nowrap"
        style={{
          background:
            "linear-gradient(60deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.90)), url(/assets/pages/champions/fight-banner.jpg)",
        }}
      >
        <Typography component="h1" variant="h3" align="center">
          {title}
        </Typography>
        <Typography component="span" variant="h3" align="center">
          {pricetag}
        </Typography>
      </Grid>

      {/* Second section */}
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        className={clsx(styles.cardContainer, styles.championCard)}
      >
        <Typography variant="h5" style={{ marginBottom: "1.2rem" }}>
          Defending champion
        </Typography>

        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          className={styles.contentContainer}
        >
          <Grid className={styles.contentContainerLeftSide}>
            <AccountBoxIcon />
          </Grid>

          {isLoading == false ? (
            <Grid className={styles.contentContainerRightSide}>
              {/* Champion info */}

              {
                // Check if that signum address has a username available
                weightClassData.champion.name &&
                weightClassData.champion.name.trim() != "" ? (
                  <Typography>{weightClassData.champion.name || ""}</Typography>
                ) : null
              }

              <Typography component="span" color="textSecondary">
                {weightClassData.champion.address}
              </Typography>

              {
                // Victory indicator
                currentChampionVictories && currentChampionVictories > 0 ? (
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    className={styles.contentContainerRightSideVictoryIndicator}
                  >
                    <CheckCircleIcon />
                    <Typography>
                      {currentChampionVictories + " "}

                      {currentChampionVictories && currentChampionVictories > 1
                        ? "victories"
                        : "victory"}
                    </Typography>
                  </Grid>
                ) : null
              }

              {/* Fighting status */}
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                style={{ marginTop: "14px" }}
              >
                <Typography
                  className={clsx(
                    styles.fighStatusTag,
                    weightClassData.champion.pendentFight &&
                      weightClassData.champion.pendentFight == true
                      ? styles.fighthingStatusTag
                      : null
                  )}
                >
                  {
                    // Conditional tag to show to user
                    weightClassData.champion.pendentFight &&
                    weightClassData.champion.pendentFight == true
                      ? "Fighthing on-chain!"
                      : "Waiting for challenge"
                  }
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography style={{ paddingLeft: "1em", paddingTop: "0.58em" }}>
              Loading...
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Third section */}
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        className={styles.cardContainer}
      >
        <Typography variant="h5">Challenge the champion!</Typography>
        <Typography
          align="center"
          style={{
            color: "var(--secondary-text-color)",
            width: "100%",
            marginBottom: "1.2rem",
          }}
        >
          Send Signa to challenge
        </Typography>

        {/* Smart contract details */}
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          style={{
            marginBottom: "1rem",
            paddingBottom: "1em",
            borderBottom: "1px solid var(--primary-border-color)",
          }}
        >
          {/* Details */}
          <Grid className={styles.smartContractContainerDetailsLeftSide}>
            {/* Smart contract address */}
            <Grid className={styles.contentContainerLeftSide}>
              <VerifiedUserIcon />
            </Grid>

            <Grid className={styles.contentContainerRightSide}>
              {/* Smart contract info */}
              <Typography>Smart Contract address</Typography>

              <Typography component="span" color="textSecondary">
                {isLoading == true
                  ? "Loading..."
                  : weightClassData.smartContractAddress || "Loading..."}
              </Typography>

              {/* Call to action indicator */}
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                style={{ marginTop: "0.7rem" }}
              >
                {isLoading == false ? (
                  <Button className={styles.challengeBtn} onClick={makePayment}>
                    Challenge now
                  </Button>
                ) : null}
              </Grid>
            </Grid>
          </Grid>

          {/* Qr code */}
          <Grid className={styles.smartContractContainerDetailsRightSide}>
            <Grid item>
              {isLoading == true ? (
                <Typography>Loading...</Typography>
              ) : (
                <QRCode
                  size={110}
                  value={
                    "signum://requestBurst?receiver=" +
                    weightClassData.smartContractAddress
                  }
                />
              )}
            </Grid>

            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: 5 }}
            >
              Scan QR Code
            </Typography>
          </Grid>
        </Grid>

        {/* Upcoming fights section */}
        <Typography variant="h5">Upcoming fights!</Typography>
        <Typography
          align="center"
          style={{
            color: "var(--secondary-text-color)",
            width: "100%",
            marginBottom: "1.2rem",
          }}
        >
          Who can beat the reigning champion?
        </Typography>

        <Grid
          container
          item
          direction="row"
          alignItems="stretch"
          justifyContent="space-between"
        >
          {
            // Query of next fights
            weightClassData.unconfirmedTransactions.length &&
            weightClassData.unconfirmedTransactions.length > 0 ? (
              <Grid
                container
                item
                direction="row"
                alignItems="stretch"
                justifyContent="flex-start"
                wrap="wrap"
              >
                {
                  // Pendent fights loop
                  weightClassData.unconfirmedTransactions.map(
                    (transaction, index) => {
                      // Get burstquantity of bid
                      const signaAmount = thousands_separators(
                        sumNQTStringToNumber(transaction.amountNQT)
                      );

                      // Calculate probability
                      // (Bid amount) / (Bid amount + weight class)
                      const bidProbability = Math.ceil(
                        (sumNQTStringToNumber(transaction.amountNQT) /
                          (weightClassessInfo[weightkey].priceTag +
                            sumNQTStringToNumber(transaction.amountNQT))) *
                          100
                      );

                      // Determine if it is high chance!
                      let chanceStatus = "";

                      if (bidProbability >= 75) {
                        chanceStatus = "High chance";
                      } else if (bidProbability >= 49 && bidProbability < 75) {
                        chanceStatus = "Good chance";
                      }

                      return (
                        <Grid
                          item
                          className={styles.cardItemContainer}
                          key={index}
                        >
                          <InfoCard
                            title={`${signaAmount} SIGNA`}
                            label={transaction.senderRS}
                            secondLabel={`${bidProbability}% chance`}
                            thirdLabel={chanceStatus}
                          />
                        </Grid>
                      );
                    }
                  )
                }

                {/* Temp alert */}
                <Grid container style={{ marginTop: "0.4em", width: "100%" }}>
                  <Alert severity="info" style={{ width: "100%" }}>
                    <AlertTitle>Tip</AlertTitle>
                    The fight(s) takes place in the next block confirmation. —{" "}
                    <strong>you can come back later to see results!</strong>
                  </Alert>
                </Grid>
              </Grid>
            ) : (
              <Typography
                variant="h6"
                color="textSecondary"
                align="center"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                {isLoading == false
                  ? "The champion is waiting for a challenge!"
                  : "Loading..."}
              </Typography>
            )
          }
        </Grid>
      </Grid>

      {/* Fourth section */}
      <Fade bottom>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          className={clsx(styles.cardContainer, styles.lastCardContainer)}
        >
          <Typography variant="h5" style={{ marginBottom: "1.2rem" }}>
            Standings
          </Typography>

          {
            //  Standings
            isLoading == false ? (
              <Grid
                container
                item
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
              >
                {standingData &&
                standingData.length &&
                standingData.length > 0 ? (
                  <Grid
                    container
                    item
                    direction="row"
                    alignItems="stretch"
                    justifyContent="flex-start"
                  >
                    {
                      // Standing data loop
                      standingData.map((standingCard, key) => {
                        let positionLabel: any = "";
                        let positionClass: any = null;

                        // Get victories
                        const address = standingCard[0];
                        const victories = thousands_separators(standingCard[1]);

                        // If user has 0 vectories it does not need to be on the standings
                        if (standingCard[1] == 0 || standingCard[1] == "0") {
                          return null;
                        }

                        // Classify positions
                        switch (key) {
                          case 0:
                            positionLabel = "Gold";
                            positionClass = styles.goldTag;
                            break;

                          case 1:
                            positionLabel = "Silver";
                            positionClass = clsx(
                              styles.goldTag,
                              styles.silverTag
                            );
                            break;

                          case 2:
                            positionLabel = "Bronze";
                            positionClass = clsx(
                              styles.goldTag,
                              styles.bronzeTag
                            );
                            break;

                          default:
                            return null;
                        }

                        return (
                          <Grid
                            item
                            className={styles.cardItemContainer}
                            key={key}
                          >
                            <InfoCard
                              title={positionLabel}
                              label={address}
                              secondLabel={`${victories} ${
                                victories == "1" ? "victory" : "victories"
                              }`}
                              optionalClass={positionClass}
                            />
                          </Grid>
                        );
                      })
                    }
                  </Grid>
                ) : (
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  >
                    {isLoadingStandingData == false
                      ? "Not enough data, more fights needs to happen 🥊"
                      : "Loading..."}
                  </Typography>
                )}
              </Grid>
            ) : (
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                Loading...
              </Typography>
            )
          }
        </Grid>
      </Fade>

      {/* How To Section */}
      <HowToSection />
    </Fragment>
  );
};

export async function getServerSideProps(ctx) {
  // Get the route details
  const { query } = ctx;
  const { id, fclass } = query;
  const key = fclass.toUpperCase();

  // Check if link is valid, if not, redirect to index
  if (!id || !fclass || !weightClassessInfo[key]) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
  }

  // Export the route details
  return {
    props: { fetchedId: id, fetchedClass: fclass },
  };
}

export default FighthingClass;
