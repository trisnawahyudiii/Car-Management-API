const userServices = require('../services/userServices');
const userRepository = require('../repositories/userRepository');

module.exports = {
    async authorizeAdmin(req, res, next) {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split('Bearer ')[1];
            const payload = userServices.verifyToken(token);

            if (payload.role !== 2 && payload.role !== 1) {
                res.status(403).json({
                    message: 'Forbidden, Access denied',
                });
                return;
            }

            req.user = await userRepository.find(payload.id);

            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({
                message: 'Unauthorizedhere',
            });
        }
    },
};
