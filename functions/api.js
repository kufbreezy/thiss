import express from "express";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import * as bodyParser from "body-parser";
import * as fs from 'fs';

const app = express();

app.use(cors("*"));

app.use(bodyParser.json());

app.post("/.netlify/functions/api", async (req, res) => {
  // let checkoutItems = JSON.parse(req.body);
  // let urlData = ['https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension1.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension2.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension3.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension4.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension5.mjs'];

  // // console.log(req.body);
  // console.log(checkoutItems);
  // console.log(checkoutItems.hey);
  
  

  // res.send(urlData);
  let lego = false;

  if (lego == true) {
    fs.readFile('./template.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading template.html');
      } else {
        // Modify the content here if needed
        res.send(data);
      }
    });

  } else if (lego == false) {
    fs.readFile('./index2.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading template.html');
      } else {
        // Modify the content here if needed
        res.send(data);
      }
    });

  }
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
