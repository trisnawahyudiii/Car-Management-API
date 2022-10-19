const carServices = require('../../../services/carServices');

module.exports = {
    create(req, res) {
        carServices
            .create(req.body, req.file)
            .then((car) => {
                res.status(201).json({
                    status: 'OK',
                    data: car,
                });
            })
            .catch((err) => {
                res.status(422).json({
                    status: 'FAIL',
                    message: err.message,
                });
            });
    },
};
