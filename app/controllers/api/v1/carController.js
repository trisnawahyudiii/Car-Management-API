const carServices = require('../../../services/carServices');

module.exports = {
    create(req, res) {
        const createArgs = req.body;
        const imgFile = req.file;
        console.log(req.user.userName);
        createArgs.createdBy = req.user.userName;

        carServices
            .create(createArgs, imgFile)
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
