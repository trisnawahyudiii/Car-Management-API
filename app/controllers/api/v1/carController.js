const carServices = require('../../../services/carServices');

module.exports = {
    create(req, res) {
        const createArgs = req.body;
        const imgFile = req.file;

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

    list(req, res) {
        carServices
            .list()
            .then(({ data, count }) => {
                if (count === 0) {
                    res.status(404).json({
                        status: 'FAIL',
                        message: 'No car found on database',
                    });
                } else {
                    res.status(200).json({
                        status: 'OK',
                        data: { cars: data },
                        meta: { total: count },
                    });
                }
            })
            .catch((err) => {
                res.status(400).json({
                    status: 'FAIL',
                    message: err.message,
                });
            });
    },

    update(req, res) {
        const id = req.params.id;
        const imgFile = req.file;
        const car = carServices.get(id);

        if (!car) {
            return res.status(404).json({
                status: 'FAIL',
                message: 'Car not found!',
            });
        } else {
            const updateArgs = {
                ...req.body,
                updatedBy: req.user.userName,
            };

            carServices
                .update(id, updateArgs, imgFile)
                .then((car) => {
                    console.log(car);
                    res.status(200).json({
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
        }
    },

    delete(req, res) {
        const deleteArgs = {
            deletedBy: req.user.userName,
        };
        const id = req.params.id;

        const car = carServices.get(id);

        if (!car) {
            return res.status(404).json({
                status: 'FAIL',
                message: '  ',
            });
        } else {
            carServices
                .delete(id, deleteArgs)
                .then(() => {
                    res.status(200).json({
                        status: 'OK',
                        message: 'Car deleted successfully!',
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

    restore(req, res) {
        const id = req.params.id;
        carServices
            .restore(id)
            .then(() => {
                res.status(200).json({
                    status: 'OK',
                    message: `Car restored successfully!`,
                });
            })
            .catch((err) => {
                if (err.message === 'Car not found') {
                    res.status(404).json({
                        status: 'FAIL',
                        message: err.message,
                    });
                } else if (err.message === 'Car already exist') {
                    res.status(409).json({
                        status: 'FAIL',
                        message: err.message,
                    });
                } else {
                    res.status(422).json({
                        status: 'FAIL',
                        message: err.message,
                    });
                }
            });
    },
};
