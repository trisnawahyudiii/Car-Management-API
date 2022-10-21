const cloudinary = require('cloudinary').v2;
const { Cars, carTypes } = require('../models');

cloudinary.config({
    cloud_name: 'dwqgcc3se',
    api_key: '957962481464987',
    api_secret: 'loUEwgrDzaC3wZbJd1L050gHmig',
});

module.exports = {
    async create(createArgs, imgFile) {
        const fileBase64 = imgFile.buffer.toString('base64');
        const file = `data:${imgFile.mimetype};base64,${fileBase64}`;

        try {
            const result = await cloudinary.uploader.upload(file, { folder: 'challenge_06' });
            createArgs.carImage = result.secure_url;

            return Cars.create(createArgs);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Gagal upload file!',
            });
        }
    },

    find(id) {
        return Cars.findByPk(id);
    },

    findAll() {
        return Cars.findAll({
            include: [{ model: carTypes, as: 'type' }],
        });
    },

    async update(id, updateArgs, imgFile) {
        const fileBase64 = imgFile.buffer.toString('base64');
        const file = `data:${imgFile.mimetype};base64,${fileBase64}`;

        // delete old image on cliudinary
        const car = await Cars.findByPk(id);

        const imageUrl = car.dataValues.carImage;
        const folder = imageUrl.split('/')[7];
        const publicId = imageUrl.split('/')[8].split('.')[0];

        cloudinary.uploader.destroy(`${folder}/${publicId}`);

        // upload new image
        try {
            const result = await cloudinary.uploader.upload(file, { folder: 'challenge_06' });
            updateArgs.carImage = result.secure_url;

            return Cars.update(updateArgs, {
                where: { id: id },
                returning: true,
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                status: 'FAIL',
                message: 'Gagal upload file!',
            });
        }
    },

    async delete(id, deleteArgs) {
        try {
            await Cars.update(deleteArgs, { where: { id: id } });
            return Cars.destroy({ where: { id: id } });
        } catch (error) {
            throw error;
        }
    },

    async restore(id) {
        const exist = await Cars.findByPk(id, { paranoid: false });

        if (!exist) {
            throw new Error('Car not found');
        } else if (!exist.deletedAt) {
            throw new Error('Car already exist');
        } else {
            const restoreArgs = {
                deletedBy: null,
                deletedAt: null,
            };

            Cars.update(restoreArgs, { where: { id: id } });
            return Cars.restore({ where: { id: id } });
        }
    },

    getTotalCars() {
        return Cars.count();
    },
};
