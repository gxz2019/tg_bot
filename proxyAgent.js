const { SocksProxyAgent } = require('socks-proxy-agent');
const { PROXY_AGENT } = require('./password');

const Agent = new SocksProxyAgent(PROXY_AGENT);

exports.ProxyAgent = Agent;