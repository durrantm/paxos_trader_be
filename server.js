const PaxosApiService = require('./paxos-api-service');
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require("axios");
const port = 8000;

app.use(cors());

const paxosApi = new PaxosApiService();

app.get("/wallet_balance", async (req, res) => {
  const { token } = req.query;
  try {
    const balancesResp = await paxosApi.getProfileBalances(token);
    res.send(JSON.stringify(balancesResp.data));
  } catch(e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
});

app.listen(port, () => {
  console.log(`Paxos Trader Backend app listening at http://localhost:${port}`);
});