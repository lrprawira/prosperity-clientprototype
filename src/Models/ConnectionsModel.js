const LoginModel = require('./LoginModel');

const handleLogin = (event) => {
    for (let i=0; i<100; i++)
        console.log(i);
    const res = new FormData(event.target);
    console.log(console.log(res));
    // LoginModel.firstLogin(res.get('userId'), res.get('userPwd'));
    console.log('Done');
}

module.exports.handleLogin = handleLogin;