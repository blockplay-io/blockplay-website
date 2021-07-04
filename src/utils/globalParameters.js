// Global variables related to node connection
// Test-net - node connection
const TEST_NODE = "http://nivbox.co.uk:6876/";

// Production - node connection
const NODE = "https://europe.signum.network/";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Global variables related to champions

// Smart contract creator id
const creator = "2999936507779208272";

// Smart contract creator id (Test-net)
const TEST_creator = "5219831338759933722";

// Production - Champions Smart contracts id
const championsContractsID = [
  "2104636556710385990",
  "5867786426589854558",
  "16566155339920755692",
  "3773127936721202968",
  "8144416923953083888",
  "5128832264817383489",
  "16394505611682764",
  "4857544769878781440",
  "5629836608390158414",
  "1427404954199089369",
  "9379475099817729915",
  "3625111309442373666",
];

// Test-net - Champions Smart contracts id
const TEST_championsContractsID = [
  "5300485681465262099",
  "15038713542527629095",
  "11569031280817704325",
  "16926768272529820522",
  "6185209709926898",
  "11937214752807635335",
  "7089834284197358510",
  "1392067425686700089",
  "5650649397414987539",
  "10033673748232667955",
  "4158402268515943849",
  "12173319009585966150",
];

// Weight class info
export const weightClassessInfo = {
  // Normal classes
  HEAVYWEIGHT: { name: "Heavyweight", priceTag: 20000 },
  CRUISERWEIGHT: { name: "Cruiserweight", priceTag: 10000 },
  MIDDLEWEIGHT: { name: "Middleweight", priceTag: 5000 },
  WELTERWEIGHT: { name: "Welterweight", priceTag: 2000 },
  LIGHTWEIGHT: { name: "Lightweight", priceTag: 1000 },

  // Junior classes
  JR_HEAVYWEIGHT: { name: "Junior Heavyweight", priceTag: 500 },
  JR_CRUISERWEIGHT: { name: "Junior Cruiserweight", priceTag: 200 },
  JR_MIDDLEWEIGHT: { name: "Junior Middleweight", priceTag: 100 },
  JR_WELTERWEIGHT: { name: "Junior Welterweight", priceTag: 50 },
  JR_LIGHTWEIGHT: { name: "Junior Lightweight", priceTag: 20 },

  // Small classes
  STRAW_WEIGHT: { name: "Strawweight", priceTag: 10 },
  ATOMWEIGHT: { name: "Atomweight", priceTag: 5 },
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Global variables for burtcoin explorer

// Test-net explorer
const TEST_EXPLORER =
  "https://testnet.explorer.signum.network/?action=account&account=";

// Production explorer
const EXPLORER = "https://explorer.signum.network/?action=account&account=";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Global variables for asset url

// Development link
const TEST_ASSETURL = "http://localhost:3000/";

// Production link
const ASSETURL = "https://blockplay.io/";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Global variables that are going to be used by the website

// Set true or false if you wanna use the test-net enviroment or main-net enviroment
export const useTestNet = false;

// Node which website will use
export const NODEToUse = useTestNet && useTestNet == true ? TEST_NODE : NODE;

// Smart contract creator id which website will use
export const creatorSCToUse =
  useTestNet && useTestNet == true ? TEST_creator : creator;

// Champion addresses which website will use
export const championsContractsToUse =
  useTestNet && useTestNet == true
    ? TEST_championsContractsID
    : championsContractsID;

// burtcoin explorer which website will use
export const explorerToUse =
  useTestNet && useTestNet == true ? TEST_EXPLORER : EXPLORER;

// Assets links which website will use
export const assetUrlToUse =
  useTestNet && useTestNet == true ? TEST_ASSETURL : ASSETURL;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
