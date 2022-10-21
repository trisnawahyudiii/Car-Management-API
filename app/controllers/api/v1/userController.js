const userServices = require('../../../services/userServices');

const handleInput = (userName, email, password) => {
    let errMessage = 'Missing ';

    if (!userName) {
        errMessage += 'userName';
    }

    if (!email) {
        if (!userName) {
            errMessage += ', email';
        } else {
            errMessage += 'email';
        }
    }

    if (!password) {
        if (!userName || !email) {
            errMessage += ', password ';
        } else {
            errMessage += 'password ';
        }
    }

    if (errMessage.split(' ').length === 3) {
        errMessage += 'filed!';
    } else {
        errMessage += 'fields!';
    }

    return errMessage;
};

module.exports = {
    async registerAdmin(req, res) {
        if (!req.body.userName || !req.body.email || !req.body.password) {
            const errMessage = handleInput(req.body.userName, req.body.email, req.body.password);

            return res.status(422).json({
                status: 'FAIL',
                message: errMessage,
            });
        } else {
            userServices
                .registerAdmin(req.body)
                .then((user) => {
                    res.status(201).json({
                        status: 'OK',
                        data: user,
                    });
                })
                .catch((err) => {
                    res.status(422).json({
                        status: 'FAIL',
                        message: err.message,
                    });
                });
        }
    },

    currentUser(req, res) {
        const user = req.user;

        res.status(201).json({
            status: 'OK',
            data: user,
        });
    },
};
