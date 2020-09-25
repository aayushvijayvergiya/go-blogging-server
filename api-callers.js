const axios = require('axios');

const BASE_URL = 'http://localhost:4000';

module.exports = {
    fetchData: (resourceUrl) => {
        return axios
                .get(`${BASE_URL}/${resourceUrl}`)
                .then((res) => {
                    console.log('[Controller] Reponse: ', res.data);
                    return res.data.data;
                });
    },
    postData: (resourceUrl, body) => {
        return axios
                .post(`${BASE_URL}/${resourceUrl}`, body.user)
                .then((res) => {
                    console.log('[Controller] Reponse: ', res.data);
                    return res.data.data;
                })
                .catch(err => {
                    console.log('[Controller] Post Error: ', err);
                });
    }
}