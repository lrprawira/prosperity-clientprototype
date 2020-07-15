
const { firstLogin } = require('./LoginModel');
const homeContent = require('./HomeModel');

const cookieHandler = require('./CookieHandler');

const handleLogin = (event) => {
    event.preventDefault();
    const res = new FormData(event.target);
    firstLogin(res.get('userId'), res.get('userPwd'));
}

const handleLogout = () => {
    cookieHandler.removeCredentials();
}

const loginCheck = () => {
    return cookieHandler.getCredentials();
};

const getBasicProfile = async () => {
    return homeContent();
}

module.exports.handleLogin = handleLogin;
module.exports.handleLogout = handleLogout;
module.exports.getBasicProfile = getBasicProfile;
module.exports.loginCheck = loginCheck;