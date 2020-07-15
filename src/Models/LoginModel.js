export
const Querystring = require('querystring');
const axios = require('axios');
const psKnownUri = require('./URIList');
const configLogin = require('./AxiosConfigurations');

const userCredentials: {loginId: String, loginPwd: String} = {
    loginId: '',
    loginPwd: ''
};

const postUserStr = (loginId: String, loginPwd: String) => {

}

const getUserStr = () => {
    return Querystring.stringify({
        userid: userCredentials.loginId,
        pwd: userCredentials.loginPwd
    });
};

// Return Cookies
const getCookie =  async() => {
    return await axios.post(psKnownUri.loginPortal, getUserStr(), configLogin)
        .catch((err: Error) => console.log(`Error occurred ${err}`));
};


module.exports = getCookie;