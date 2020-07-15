const cookieHandler = require('./CookieHandler');

const postUserStr = (loginId, loginPwd) => {
    cookieHandler.postUserStr(loginId, loginPwd); // may expect validation
    cookieHandler.saveCredentials();
}

const firstLogin = (loginId, loginPwd) => {
    postUserStr(loginId, loginPwd);
};


module.exports.firstLogin = firstLogin;