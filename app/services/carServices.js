const carRepository = require('../repositories/carRepository');

module.exports = {
    create(createArgs, imgFile) {
        return carRepository.create(createArgs, imgFile);
    },
};
