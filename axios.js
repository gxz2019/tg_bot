const axios = require('axios').default;

const { ProxyAgent } = require('./proxyAgent');

const getAxiosInstance = (url) => {
  return axios.create({
    baseURL: url, // 设置基础 URL
    httpsAgent: ProxyAgent,
  });
};

exports.getAxiosInstance = getAxiosInstance;