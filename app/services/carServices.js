const carRepository = require('../repositories/carRepository');

module.exports = {
    async create(createArgs, imgFile) {
        return carRepository.create(createArgs, imgFile);
    },

    async list() {
        try {
            const cars = await carRepository.findAll();
            const carsCount = await carRepository.getTotalCars();

            return {
                data: cars,
                count: carsCount,
            };
        } catch (error) {
            throw error;
        }
    },

    get(id) {
        return carRepository.find(id);
    },

    update(id, updateArgs, imgFile) {
        return carRepository.update(id, updateArgs, imgFile);
    },

    delete(id) {
        return carRepository.delete(id);
    },
};
