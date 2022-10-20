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
                res.status(200).json({
                    status: 'OK',
                    data: { cars: data },
                    meta: { total: count },
                });
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
            return res.status(422).json({
                status: 'FAIL',
                message: err.message,
            });
        } else {
            const { createdBy } = car;

            const updateArgs = {
                ...req.body,
                createdBy: createdBy,
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
            return res.status(422).json({
                status: 'FAIL',
                message: err.message,
            });
        } else {
            carServices
                .delete(id, deleteArgs)
                .then((car) => {
                    res.status(204).json({
                        status: 'OK',
                        message: `Car ${car.carName} deleted successfully!`,
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
};
