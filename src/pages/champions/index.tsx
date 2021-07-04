// Next
import { useRouter } from "next/router";

// React
import { Fragment, useEffect, useState } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

// Styling
import styles from "./Champions.module.css";

// Extra
import {
  weightClassessInfo,
  championsContractsToUse,
  assetUrlToUse,
} from "../../utils/globalParameters";

// Burst.js
import { ContractDataView } from "@burstjs/contracts";
import burstApi from "../../utils/lib/burstjs";

// Components
import ClassCard from "../../components/pages/Champions/classCard/index";
import HowToSection from "../../components/pages/Champions/howToSection/index";
import MetaRenderer from "../../components/SEO/MetaRender";

// Third party
import Fade from "react-reveal/Fade";

// Interval variables
var handleRenders = null;
var handleFetchingData = null;

const Champions = () => {
  // Router details
  const router = useRouter();
  const { pathname } = router;

  // Redirect user
  const goToSite = (route) => {
    router.push(route).then(() => {
      window.scrollTo(0, 0);
    });
  };

  // Weight info data
  const [weightClassData, updateWeightClassData] = useState({
    HEAVYWEIGHT: { champion: "", address: "" },
    CRUISERWEIGHT: { champion: "", address: "" },
    MIDDLEWEIGHT: { champion: "", address: "" },
    WELTERWEIGHT: { champion: "", address: "" },
    LIGHTWEIGHT: { champion: "", address: "" },
    JR_HEAVYWEIGHT: { champion: "", address: "" },
    JR_CRUISERWEIGHT: { champion: "", address: "" },
    JR_MIDDLEWEIGHT: { champion: "", address: "" },
    JR_WELTERWEIGHT: { champion: "", address: "" },
    JR_LIGHTWEIGHT: { champion: "", address: "" },
    STRAW_WEIGHT: { champion: "", address: "" },
    ATOMWEIGHT: { champion: "", address: "" },
    loadedData: false,
  });

  // Loading status for ui purposes
  const [isLoading, updateLoadingStatus] = useState(true);

  // Functions-----

  // Assign every smart contract address to specific class
  const assignDataToHook = async () => {
    // Weight info data (Got that data from hooks)
    let weightInfoDataToUpdate = weightClassData;

    // Make Promise and Loop through every smart contract
    return new Promise(async (resolve) => {
      championsContractsToUse.map(async (contract, index) => {
        // Request data for specific contract
        const response = await burstApi.contract.getContract(contract);

        // Smart contract address
        const smartContractAddress = response.at;

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

        // Get owner's name or wallet
        const holdingChampionTag =
          data.name && data.name.trim() !== "" ? data.name : data.accountRS;

        // Smart contract weight(pricetag), classify class by fetching the weight class "pricetag"
        // Obtain the "Weight class" EX: 20,000 | 10,000 | ETC

        let smartContractClass = await parseFloat(
          response.name.replace("Champions", "")
        );

        // Find class by pricetag
        Object.keys(weightClassessInfo).map(async (classInfo) => {
          // Check if fetched pricetag match with predefined class price
          // If true, it will assign that smart contract address to that class and assign current champion name/address to that class
          if (weightClassessInfo[classInfo].priceTag == smartContractClass) {
            weightInfoDataToUpdate[classInfo].address = smartContractAddress;
            weightInfoDataToUpdate[classInfo].champion = holdingChampionTag;

            // Also check if the element checked is the last one of the array
            // If true, let's finish the promise
            if (index == championsContractsToUse.length - 1) {
              resolve(weightInfoDataToUpdate);
            }
          }
        });
      });
    }).then(async (response) => {
      // Return updated weight info data
      return response;
    });
  };

  // Re-render cards with champions (Name/Wallet)
  const RenderCardData = async () => {
    const response: any = await assignDataToHook();
    const newObject = await {
      ...weightClassData,
      ...response,
      loadedData: true,
    };

    updateWeightClassData({ ...newObject });
  };

  // ComponentDidMount
  useEffect(() => {
    // Reset championFetch status
    localStorage.removeItem("championFetch");

    RenderCardData();
  }, []);

  useEffect(() => {
    if (weightClassData.loadedData == true && isLoading == true) {
      // Update loading indicator to false
      updateLoadingStatus(false);

      // Event listner's function
      const handleRouteChange = (execute = null) => {
        // Get localstorage details in order to see if user can fetch data or not
        const tempFetch: any = localStorage.getItem("championFetch") || null;

        // Re-render cards interval
        // Once the Smart contract address is "Loaded..." re-render cards
        handleRenders = setInterval(() => {
          updateWeightClassData({ ...weightClassData });
        }, 1000);

        // Every 15 seconds, Update hooks interval
        handleFetchingData = setInterval(() => {
          if (localStorage.getItem("championFetch") == "true") {
            assignDataToHook();
          }
        }, 15000);

        // Check if user wants to remove the intervals
        if (
          pathname == "/champions" &&
          tempFetch == "true" &&
          execute != true
        ) {
          // Delete intervals
          window.clearInterval(handleRenders);
          window.clearInterval(handleFetchingData);
          handleRenders = 0;
          handleFetchingData = 0;

          // Reset championFetch status
          localStorage.removeItem("championFetch");
        } else {
          // Enable fetching (Activate interval)!
          localStorage.setItem("championFetch", "true");
        }

        // After 100 seconds, user will delete intervals, and alert the user
        setTimeout(() => {
          window.clearInterval(handleRenders);
          window.clearInterval(handleFetchingData);

          if (localStorage.getItem("championFetch") == "true") {
            // After 2 minutes more, ask if user wants to reload page
            setTimeout(() => {
              if (localStorage.getItem("championFetch") == "true") {
                if (window.confirm("Do you want to reload the page?")) {
                  window.location.reload();
                }
              }
            }, 120000);
          }
        }, 100000);
      };

      if (
        pathname == "/champions" &&
        localStorage.getItem("championFetch") == null
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

  return (
    <Fragment>
      {/* SEO */}
      <MetaRenderer
        title="Block Champions - BlockPlay"
        description="Meet Block Champions, a dApp made with Signum SmartJ. Beat the every challenge you face! choose your class and knock their block off!"
        imgUrl={`${assetUrlToUse}assets/pages/champions/seo.jpg`}
      />

      <Fade>
        {/* First section */}
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={styles.firstSectionBanner}
          wrap="nowrap"
        >
          <Typography component="h1" variant="h3" align="center">
            Take over{" "}
            <Hidden mdUp>
              <br />
            </Hidden>
            <b>your class</b>
          </Typography>
          <Typography align="center">
            Meet Block Champions, the trustless Signum-based game.
            <Hidden smDown>
              <br />
            </Hidden>{" "}
            Overcome challenges and become the new champion in your class.
          </Typography>
          <Hidden mdDown>
            <Grid
              container
              direction="row"
              alignItems="stretch"
              justify="space-between"
              className={styles.firstSectionActionsContainer}
            >
              <Typography>Challenge</Typography>
              <Typography>Become the champion</Typography>
              <Typography>Keep winning</Typography>
            </Grid>
          </Hidden>
        </Grid>
      </Fade>

      {/* Second section */}
      <Fade bottom>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={styles.secondSectionContainer}
        >
          <Typography
            variant="h5"
            align="center"
            style={{ fontWeight: 500, color: "var(--primary-text-color)" }}
          >
            Pick your desired class
          </Typography>

          <Typography
            align="center"
            style={{
              marginBottom: "2rem",
              color: "var(--primary-text-color)",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            Show them who's the boss, overcome anyone in your way.
          </Typography>

          <Grid
            item
            container
            direction="row"
            alignItems="stretch"
            justify="space-between"
            wrap="wrap"
          >
            {
              // Render loop
              Object.keys(weightClassessInfo).map((key) => (
                <ClassCard
                  key={key}
                  title={weightClassessInfo[key].name}
                  weightPriceLabel={weightClassessInfo[key].priceTag}
                  champion={
                    isLoading == false
                      ? weightClassData[key].champion || "Loading..."
                      : "Loading..."
                  }
                  imgUrl={`/assets/pages/champions/${key}.jpg`}
                  onClick={() => {
                    goToSite(
                      `/champions/${
                        weightClassData[key].address
                      }/${key.toLowerCase()}`
                    );
                  }}
                />
              ))
            }
          </Grid>
        </Grid>
      </Fade>

      {/* How To Section */}
      <HowToSection />
    </Fragment>
  );
};

export default Champions;
