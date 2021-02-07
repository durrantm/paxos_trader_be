const axios = require("axios");

const PAXOS_URL = 'https://api.paxos.com/v2';
const ENDPOINTS = {
  profiles: '/profiles/',
  markets: '/markets/'
};
const MARKETS = {
  ETH_IN_EUR: 'ETHEUR',
  ETH_IN_SGD: 'ETHSGD',
  ETH_IN_USD: 'ETHUSD',
  BTC_IN_EUR: 'BTCEUR',
  BTC_IN_SGD: 'BTCSGD',
  BTC_IN_USD: 'BTCUSD',
  PAXG_IN_USD: 'PAXGUSD',
  BCH_IN_USD: 'BCHUSD',
  LTC_IN_USD: 'LTCUSD'
};

class PaxosApiService {
  constructor() {
    this.paxosUrl = PAXOS_URL;
    this.endpoints = ENDPOINTS;
    this.markets = MARKETS;
  }

  /**
   * Gets the headers to be sent for API calls.
   */
  getHeaders(authToken) {
    return { 
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Gets the balances for the given profile id.
   * @param {string} profileId - Profile ID of the client.
   */
  getProfileBalances(token, profileId = 'default') {
    const headers = this.getHeaders(token);

    return axios.get(this.paxosUrl + this.endpoints.profiles + `${profileId}/balances`, { headers });
  }

  /**
   * Gets the ticker details based on the market
   * @param {string} market - Market enum string.
   */
  getTickerDetailsByMarket(market) {
    const headers = this.getHeaders();

    return axios.get(this.paxosUrl + this.endpoints.markets + `${market}/ticker`, { headers });
  }
}

module.exports = PaxosApiService;