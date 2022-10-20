const userServices = require('../../../services/userServices');

module.exports = {
    async registerMember(req, res) {
        userServices
            .registerMember(req.body)
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
    },

    async registerAdmin(req, res) {
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
    },

    currentUser(req, res) {
        const user = req.user;

        res.status(201).json({
            status: 'OK',
            data: user,
        });
    },
};
