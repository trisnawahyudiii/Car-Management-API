const userServices = require('../../../services/userServices');

module.exports = {
    login(req, res) {
        const { email, password } = req.body;
        userServices
            .login(email, password)
            .then((auth) => {
                if (!auth) {
                    res.status(401).json({
                        status: 'FAIL',
                        message: err.message,
                    });
                }

                res.status(200).json({
                    status: 'OK',
                    data: auth,
                });
            })
            .catch((err) => {
                res.status(404).json({
                    status: 'FAIL',
                    message: err.message,
                });
            });
    },

    async register(req, res) {
        if (!req.body.userName || !req.body.email || !req.body.password) {
            const errMessage = handleInput(req.body.userName, req.body.email, req.body.password);

            return res.status(422).json({
                status: 'FAIL',
                message: errMessage,
            });
        } else {
            userServices
                .registerMember(req.body)
                .then((user) => {
                    res.status(201).json({
                        status: 'OK',
                        data: {
                            id: user.id,
                            userName: user.userName,
                            email: user.email,
                            role: user.UserRole.roleName,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                        },
                    });
                })
                .catch((err) => {
                    res.status(409).json({
                        status: 'FAIL',
                        message: err.message,
                    });
                });
        }
    },
};
