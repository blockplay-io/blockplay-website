// React
import { Fragment, useEffect, useState } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Alert from "@material-ui/lab/Alert";

// Material icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

// Styling
import styles from "./koh-i-noor.module.css";

// Extra
import { assetUrlToUse, explorerToUse } from "../../utils/globalParameters";
import { thousands_separators } from "../../utils/function/extra";

// Burst.js
import { ContractDataView } from "@burstjs/contracts";
import burstApi from "../../utils/lib/burstjs";

// Components
import InfoCard from "../../components/pages/Champions/infoCard/index";
import MetaRenderer from "../../components/SEO/MetaRender";

// Third-party
import clsx from "clsx";
import QRCode from "react-qr-code";
import copy from "copy-to-clipboard";
import Fade from "react-reveal/Fade";
import { isMobile } from "react-device-detect";

const KohINoorToken = () => {
  // NFT data
  const [tokenData, updateTokenData] = useState({
    owner: "",
    ownerName: "",
    ownerId: "",
    currentPrice: "",
    smartContractAddress: "S-97RU-MV5H-3AML-BLP7Y",
    smartContractAt: "11463546296530605818",
  });

  // Loading status for ui purposes
  const [isLoading, updateLoadingStatus] = useState(true);

  // Previous owner data
  const [ownersChain, updateOwnersChain] = useState([]);

  // Loading status for owners chain data
  const [isLoadingOwnerChainData, updateLoadingOwnerChainDataStatus] =
    useState(true);

  // Pending transactions
  const [hasPendingTransactions, updateHasPendingTransactionStatus] =
    useState(false);

  // Assign/merge the smart contract data with the hooks
  const assignDataToHook = async () => {
    // Make Promise and fetch smart contract details
    return new Promise(async (resolve) => {
      // Request data for specific contract
      const response = await burstApi.contract.getContract(
        tokenData.smartContractAt
      );

      // Smart contract signum address
      const smartContractAddress = response.atRS;

      // Save more details of contract
      const helper = new ContractDataView(response);

      // Save owner details
      const tokenOwner = helper.getVariableAsDecimal(0);

      // Get current champion's data
      const ownerData = await burstApi.account.getAccount({
        accountId: tokenOwner,
        commitmentAtHeight: undefined,
        includeCommittedAmount: false,
        includeEstimatedCommitment: false,
      });

      // Get current champions name
      let ownerName =
        ownerData.name && ownerData.name !== "" ? ownerData.name : "";

      // Save current price details
      const priceStr = helper.getVariableAsDecimal(2);
      const currentPrice =
        thousands_separators(Math.ceil(parseFloat(priceStr) / 100000000)) || "";

      // MergeData
      updateTokenData({
        ...tokenData,
        ownerName,
        owner: ownerData.accountRS,
        ownerId: ownerData.account,
        currentPrice,
        smartContractAddress,
      });

      // Check for pendent transactions, (PENDENT FIGHTS in smart contract)
      const pendentTransactions =
        await burstApi.account.getUnconfirmedAccountTransactions(
          tokenData.smartContractAt
        );

      const { unconfirmedTransactions } = pendentTransactions;

      // Update pendent transaction alert
      updateHasPendingTransactionStatus(unconfirmedTransactions.length > 0);

      // If it is first time, fetch smart contract transactions
      //  This will list previous owners
      if (isLoading === true) {
        fetchPreviousOwners();
      }

      updateLoadingStatus(false);

      resolve(true);
    }).then(async (response) => {
      // Return updated weight info data
      return response;
    });
  };

  const fetchPreviousOwners = async () => {
    // Get account transactions
    const transactionsData = await burstApi.account.getAccountTransactions({
      accountId: tokenData.smartContractAt,
    });

    let owners = [];

    for (var i = 0; i < transactionsData.transactions.length; i++) {
      const tri = transactionsData.transactions[i];

      // Verify transaction for the most recent owner
      if (tri.type === 22) {
        if (tri.attachment != null && tri.attachment.message.startsWith("59")) {
          owners.push({
            amount: "Current owner",
            address: tri.recipientRS,
            block: "",
          });

          break;
        }
      }
    }

    for (var i = 0; i < transactionsData.transactions.length; i++) {
      const tri = transactionsData.transactions[i];

      // Verify transaction for previous owners
      if (tri.type === 22) {
        if (tri.attachment != null && tri.attachment.message.startsWith("4b")) {
          owners.push({
            amount:
              thousands_separators(
                parseInt(tri.amountNQT.substring(0, tri.amountNQT.length - 8))
              ) + " Signa",
            address: tri.recipientRS,
            block: "Block " + thousands_separators(tri.height),
          });
        }
      }
    }

    updateOwnersChain(owners);
    updateLoadingOwnerChainDataStatus(false);
  };

  // Copy address to clipboard and open deeplink "Signum Phoenix wallet"
  const makePayment = () => {
    alert("Signum address copied to clipboard!");
    copy(tokenData.smartContractAddress);
    window.location.href =
      "signum://requestBurst?receiver=" + tokenData.smartContractAddress;
  };

  // First function render
  const dataFetcher = async () => {
    const response = await assignDataToHook();

    if (response) {
      let handleRender = setInterval(async () => {
        // Fetch Koh-I-Noor data every 60 seconds
        await assignDataToHook();
      }, 60000);

      // After 500 seconds, stop fetching interval
      setTimeout(() => {
        // Delete intervals
        window.clearInterval(handleRender);
        handleRender = null;
      }, 500000);
    }
  };

  // Open owner in explorer
  const seeOwnerData = () => {
    window.open(explorerToUse + tokenData.ownerId);
  };

  // ComponentDidMount
  useEffect(() => {
    // Fetch initial data
    dataFetcher();
  }, []);

  return (
    <Fragment>
      {/* SEO */}
      <MetaRenderer
        title={`Koh-i-Noor - Block Champions`}
        description="Meet koh-i-noor, the trustless first signum-based nft, powered by SignumJ Smart Contracts"
        imgUrl={`${assetUrlToUse}assets/pages/champions/seo.jpg`}
      />
      {/* First section */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={clsx(styles.firstSectionBanner, "defaultBg")}
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), linear-gradient(0deg, rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0.3)), url(/assets/pages/koh-i-noor/diamondBg.jpg)",
        }}
      >
        {/* Content container */}
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={styles.firstSectionContentContainer}
          wrap="wrap"
        >
          {/* Left side */}
          <Grid item xs={12} md={7} className={styles.firstSectionLeftSide}>
            <Typography component="h1" variant="h3" align="left" gutterBottom>
              Koh-i-Noor{" "}
              <Hidden xsDown>
                <br />
              </Hidden>
              <b>The first and unique NFT</b>
            </Typography>

            <Typography variant="h6" align="left">
              Meet koh-i-noor, the trustless first signum-based nft{" "}
              <Hidden smDown>
                <br />
              </Hidden>{" "}
              powered by SignumJ Smart Contracts, Become owner of this unique
              NFT and then you either keep the token or have 10% return of
              investment when a new owner arrives.
            </Typography>
          </Grid>

          {/* Right side */}
          <Hidden smDown>
            <Grid
              item
              xs={12}
              md={4}
              lg={5}
              className={styles.firstSectionRightSide}
            >
              <img src="/assets/pages/koh-i-noor/fObject.png" />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
      {/* Second section */}
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        className={clsx(styles.cardContainer, styles.tokenCard)}
      >
        <Typography variant="h5" style={{ marginBottom: "1.2rem" }}>
          Token details
        </Typography>

        {/* Owner section */}
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

          <Grid className={styles.contentContainerRightSide}>
            <Typography> Current owner </Typography>
            {isLoading == false && tokenData.ownerName !== "" ? (
              <Typography
                onClick={seeOwnerData}
                component="span"
                color="textSecondary"
                style={{ cursor: "pointer" }}
              >
                <b> {tokenData.ownerName}</b>
              </Typography>
            ) : null}

            <Typography
              onClick={seeOwnerData}
              component="span"
              color="textSecondary"
              style={{ cursor: "pointer" }}
            >
              {isLoading == false ? tokenData.owner : "Loading..."}
            </Typography>
          </Grid>

          {hasPendingTransactions && hasPendingTransactions === true ? (
            <Alert
              severity="info"
              style={{
                width: "100%",
                marginTop: "1.5rem",
                fontWeight: 500,
              }}
            >
              Transaction in progress
            </Alert>
          ) : null}
        </Grid>

        {/* Current price section */}
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          className={styles.contentContainer}
        >
          <Grid className={styles.contentContainerLeftSide}>
            <MonetizationOnIcon />
          </Grid>

          <Grid className={styles.contentContainerRightSide}>
            <Typography>Current price</Typography>
            <Typography
              component="span"
              variant="h6"
              style={{ fontWeight: 500 }}
            >
              {isLoading == false
                ? tokenData.currentPrice + " Signa"
                : "Loading..."}
            </Typography>
          </Grid>
        </Grid>

        {/* Buy token section*/}
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={styles.contentContainer}
        >
          <Typography variant="h5">Become the owner!</Typography>
          <Typography align="center">
            Be the owner of first NFT powered by the Signum Blockchain
          </Typography>

          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            style={{ marginTop: "1.5rem" }}
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
                    : tokenData.smartContractAddress}
                </Typography>

                {/* Call to action indicator */}
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  style={{ marginTop: "0.7rem", width: "100%" }}
                >
                  {isLoading == false ? (
                    <Button
                      className={styles.challengeBtn}
                      onClick={makePayment}
                    >
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
                      tokenData.smartContractAddress
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

            <Alert
              severity="info"
              style={{
                width: "100%",
                marginTop: "1.5rem",
                fontWeight: 500,
              }}
            >
              In order to be the owner, you must pay current price
            </Alert>
          </Grid>
        </Grid>
      </Grid>

      {/* Third section */}
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        className={clsx(styles.thirdSectionContainer, "defaultBg")}
        style={{
          background:
            "linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0.92) 100%), url(/assets/pages/koh-i-noor/historyBanner.jpg)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          HISTORY
        </Typography>

        <Typography align="justify" gutterBottom>
          Koh-i-Noor is the most famous diamond of the ancient world, discovered
          in India about 5000 years ago. This diamond passed the hand of many
          rulers until being ceded to Queen Victoria after the British
          annexation of the Punjab in 1849. The Koh-i-Noor has long been a
          subject of diplomatic controversy, with India, Pakistan, Iran, and
          Afghanistan all demanding its return from the UK at various points.
          <br />
          In this virtual reality experiment, you can own the Koh-i-Noor token
          but you will never know for how long.
        </Typography>
      </Grid>

      {/* Forth section */}

      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        className={clsx(styles.cardContainer, styles.tokenCard)}
      >
        <Typography variant="h5">Owners chain</Typography>
        <Typography
          align="center"
          color="textSecondary"
          style={{ marginBottom: "1.2rem", width: "100%" }}
        >
          Discover the chain of the last {isMobile ? "18" : "45"} owners and the
          block they lost the ownership.
        </Typography>

        {/* Query of previous owner */}
        <Grid
          container
          item
          direction="row"
          alignItems="stretch"
          justifyContent="flex-start"
          wrap="wrap"
        >
          {isLoadingOwnerChainData === false ? (
            ownersChain.map((item, index) => {
              // Check if user is in mobile, it will render only 18 previous owners
              // Check if it is already in the item #45, render less
              if ((index > 17 && isMobile) || index > 44) {
                return null;
              }

              return (
                <Grid item className={styles.cardItemContainer} key={index}>
                  <InfoCard
                    title={item.amount}
                    label={item.address}
                    secondLabel={item.block}
                    thirdLabel=""
                  />
                </Grid>
              );
            })
          ) : (
            <Typography variant="h6" align="center" style={{ width: "100%" }}>
              Loading...
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Fifth section */}
      <Fade up>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          className={styles.fifthSectionContainer}
        >
          {/* Left side */}
          <Hidden smDown>
            <Grid item xs={12} md={4} className={styles.fifthSectionLeftSide}>
              <img src="/assets/pages/koh-i-noor/sObject.png" />
            </Grid>
          </Hidden>

          {/* Right side */}
          <Grid item xs={12} md={8} className={styles.fifthSectionRightSide}>
            <Typography variant="h4" align="center" gutterBottom>
              KOH-I-NOOR SMART CONTRACT
            </Typography>

            <Typography align="justify" gutterBottom>
              Check the Java{" "}
              <a href="https://bit.ly/2UnI8oN" target="_blank">
                <b>smart contract source code</b>
              </a>
              , written using Signum SmartJ smart contracts for Signum.
              <br />
              Multi-out transactions or transactions with less than 30 Signa are
              ignored. Never send funds directly from an exchange, use your own
              wallet.
              <br />
              Anyone sending the current price become the new owner and price is
              increased by 10%. Transactions sending less than the current price
              are refunded (minus 30 Signa). Previous owner receives a return of
              investment of 10% over his entering price (minus 1% fee). If the
              amount sent is higher than the current price, the value in excess
              is taken as fee.
              <br />
              After receiving a transaction, the ownership transfer and payment
              of previous owner takes place in the next block. If two or more
              transactions are received in the same block, one randomly chosen
              is the new owner and the others refunded (minus 30 Signa). The
              smart contract code running is available on github. Inspect this
              code, the bytecode running, and SRS code, since there is
              absolutely no warranty it actually works this way!
            </Typography>
          </Grid>
        </Grid>
      </Fade>
    </Fragment>
  );
};

export default KohINoorToken;
