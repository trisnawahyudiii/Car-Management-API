const userServices = require('../../../services/userServices');

module.exports = {
    login(req, res) {
        const { email, password } = req.body;
        console.log('password in controller', password);
        userServices
            .login(email, password)
            .then((auth) => {
                console.log('auth');
                if (!auth) {
                    res.status(401).json({
                        status: 'FAIL1',
                        message: 'email or password is incorrect!',
                    });
                }

                res.status(200).json({
                    status: 'OK',
                    data: auth,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: 'FAIL2',
                    message: err.message,
                });
            });
    },
};
