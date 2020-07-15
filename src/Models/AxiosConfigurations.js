
const configLogin = {
    crossdomain: true,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Type': 'application/json', // Sends JSON instead of URL Encoded data to proxy server
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36', // Chrome 81 running on macOS Catalina
    }
};

module.exports = configLogin;