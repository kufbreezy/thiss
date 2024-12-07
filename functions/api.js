import express from "express";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import * as bodyParser from "body-parser";
import * as cheerio from 'cheerio';
import axios from 'axios';


const app = express();

app.use(cors("*"));

app.use(bodyParser.json());

app.get("/.netlify/functions/api", async (req, res) => {
  // let checkoutItems = JSON.parse(req.body);
  // let urlData = ['https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension1.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension2.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension3.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension4.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension5.mjs'];

  // // console.log(req.body);
  // console.log(checkoutItems);
  // console.log(checkoutItems.hey);
  
  

  // res.send(urlData);
  // let lego = false;

  // if (lego == true) {
  //   fs.readFile('./template.html', 'utf8', (err, data) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send('Error reading template.html');
  //     } else {
  //       // Modify the content here if needed
  //       res.send(data);
  //     }
  //   });

  // } else if (lego == false) {
  //   fs.readFile('./index2.html', 'utf8', (err, data) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send('Error reading template.html');
  //     } else {
  //       // Modify the content here if needed
  //       res.send(data);
  //     }
  //   });

  // }

  async function getCountryByIP() {

    try {
      const ipAddress1 = await getIpAddress();
      // const ipAddress = '104.28.230.118';
  
      console.log(`IP Address: ${ipAddress1}`);
  
      const vpnStatus = await isVpn(ipAddress1);
      if (vpnStatus) {
        console.log("This IP address is using a VPN. ✅");
        printHeader("VPN IP Address CHECKER");
        const response = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = response.data.ip;
  
        const geoResponse = await axios.get(`https://ipinfo.io/${ipAddress}`);
  
        // Check if the response is JSON
        if (geoResponse.headers['content-type'].startsWith('application/json')) {
          const country = geoResponse.data.country;
          // console.log('country', country);
          if (country == 'NG') {
            // Router.push('/leads' + '?email=bitflaws@gmail.com');
            console.log(country);
  
          }
        } else {
          // Parse HTML response
          const $ = cheerio.load(geoResponse.data);
          const country = $('body').text().trim();
          // console.log(country);
          if (country == 'NG') {
            // Router.push('/leads' + '?email=bitflaws@gmail.com');
            console.log(country);
  
          }
        }
        res.send(JSON.stringify('yes vpn'));
  
      } else {
        console.log("This IP address is not using a VPN. ❌");
        res.send(JSON.stringify('no vpn'));
      }
  
    } catch (error) {
      // console.error('Error fetching IP geolocation data:', error);
    }
  
  
  }
  
  getCountryByIP();
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
