

//export const at = "17068648140630745133";
export const at = "11463546296530605818";
export const atRS = "BURST-97RU-MV5H-3AML-BLP7Y"; //kohinoor address

export const creatorRS = "BURST-JJQS-MMA4-GHB4-4ZNZU";
//export const creatorRS = "BURST-TMSU-YBH5-RVC7-6J6WJ";

//const curOwner = creator;

/*const ownerAddress = 0;
const priceAddress = 2;
const price = 4950;
const curBlock = 636816;
 const atCreation = 636816;
*/
//export const ats = ["12311872483963501401", "3366024509486583869", "6078846274390139394",
//"11695706840893348645", "1479322154998065270"]; //testnet
export const creator = "3278233074628313816";

//const weights = [20000, 10000, 5000, 2000, 1000];

//let owners = ["", "", "", "", ""];

//let curOwner = "";

//export const EXPLORER = "http://explorer.testnet.burst.devtrue.net/address/";
export const EXPLORER = "https://explorer.burstcoin.network/?action=account&account=";

//const NODE = "http://localhost:6876";
//export const NODE = "http://testnet.getburst.net:6876";
//export const NODE = "https://test-burst.megash.it:443";
export const NODE = "https://wallet.burstcoin.ro:443";
//const NODE = 'https://burst-now-proxy.ohager.now.sh';

//let ownerAddress = 0;
//let curBlock = 55000;
//let atCreation = 55000;

export const chartOptions = {
    scales: {
      yAxes: [
        {
          scaleLabel: { display: true, labelString: "Price in k BURST" },
          ticks: {
            beginAtZero: false
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: { display: true, labelString: "Block height" },
          type: "time",
            time: {
              unit: "millisecond",
              tooltipFormat: "x",
              displayFormats: {
                millisecond: "x"
              }
            },
        }
      ]
    },
    legend: {
      display: false
    }
  };
