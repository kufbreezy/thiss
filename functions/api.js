import express from "express";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import * as bodyParser from "body-parser";

const app = express();

app.use(cors("*"));

app.use(bodyParser.json());

app.post("/.netlify/functions/api", async (req, res) => {

  
  
  async function getIpAddress() {
    const response = await fetch('http://checkip.dyndns.com/');
    const data = await response.text();
    return data.split(': ')[1].split('<')[0];
}

async function isVpn(ipAddress) {
    const API_key = "2c1294b9924b42fe9eba83fcf032374d";
    const url = `https://vpnapi.io/api/${ipAddress}?key=${API_key}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.security.vpn;
}

function printHeader(title) {
    console.log(`\n${'='.repeat(title.length)}\n${title}\n${'='.repeat(title.length)}\n`);
}

(async () => {
    printHeader("VPN IP Address CHECKER");

    const ipAddress = await getIpAddress();
    // ipAddress = '104.28.230.118'; // For testing

    // console.log(`IP Address: ${ipAddress}`);
    let checkoutItems = JSON?.parse(JSON?.stringify(req?.body));
    console.log(checkoutItems);
  

    const vpnStatus = await isVpn(ipAddress);
    if (vpnStatus) {
        res.send(checkoutItems + " " + ipAddress + " This IP address is using a VPN. ");
    } else {
        res.send(checkoutItems + " " + ipAddress + " This IP address is not using a VPN. ");
    }
})()
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
