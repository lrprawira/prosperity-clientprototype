const Cookies =  require('universal-cookie').default;
const axios =  require('axios');

const PSUserCredentials = require('./PSUserCredentials');
const psKnownUri = require('./URIList');
const configLogin = require('./AxiosConfigurations');

const getProxyUri = (mode='fetchNormal') => {
    let proxyUri = psKnownUri.appProxyHost;
    let proxyPort = psKnownUri.appProxyPort;
    let proxyUriSub = '';
    if (mode === 'fetchNormal') {
        proxyUriSub = psKnownUri.appProxySub;
    }
    else if (mode === 'fetchXhr') {
        proxyUriSub = psKnownUri.appProxySubXhr;
    }
    return (`${proxyUri}:${proxyPort}${ proxyUriSub }`);
};

const postUserStr = (loginId, loginPwd) => {
    PSUserCredentials.userCredentials.userid = loginId;
    PSUserCredentials.userCredentials.pwd = loginPwd;
};

const checkCredentials = async (sendServer) => {
    return await axios.post(getProxyUri(), sendServer, configLogin)
        .catch(err => err.response.status);
};

const saveCredentials = () => {
    const aYear = (365);
    const expTime = new Date();
    expTime.setDate((new Date()).getDate() + aYear);

    const cookies = new Cookies();
    cookies.set('prosperityUserLogin', {
        userId: PSUserCredentials.userCredentials.userid,
        pwd: PSUserCredentials.userCredentials.pwd
    },
    {
        path: '/',
        expires: expTime,
        sameSite: 'strict'
    });
};

const removeCredentials = () => {
    const cookies = new Cookies();
    cookies.remove('prosperityUserLogin', {
        path: '/'
    })
}

const getCredentials = () => {
    const cookies = new Cookies();
    return cookies.get('prosperityUserLogin');
}

module.exports.postUserStr = postUserStr;
module.exports.checkCredentials = checkCredentials;
module.exports.getProxyUri = getProxyUri;
module.exports.saveCredentials = saveCredentials;
module.exports.removeCredentials = removeCredentials;
module.exports.getCredentials = getCredentials;