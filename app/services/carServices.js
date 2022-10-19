const carRepository = require('../repositories/carRepository');

module.exports = {
    async create(createArgs, imgFile) {
        return carRepository.create(createArgs, imgFile);
    },
};
