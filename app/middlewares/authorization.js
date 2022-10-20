const userServices = require('../services/userServices');
const userRepository = require('../repositories/userRepository');

module.exports = {
    async authorize(req, res, next) {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split('Bearer ')[1];
            const payload = userServices.verifyToken(token);

            const data = await userRepository.find(payload.id);

            // username, email, role, rolename
            const user = {
                userName: data.userName,
                email: data.email,
                role: data.role,
                roleName: data.UserRole.roleName,
            };

            req.user = user;

            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({
                status: 'FAIL',
                message: err.message,
            });
        }
    },

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

            const data = await userRepository.find(payload.id);

            // extract only username, email, role, rolename
            const user = {
                userName: data.userName,
                email: data.email,
                role: data.role,
                roleName: data.UserRole.roleName,
            };

            req.user = user;

            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({
                status: 'FAIL',
                message: 'Unauthorized',
            });
        }
    },

    async authorizeSuperAdmin(req, res, next) {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split('Bearer ')[1];
            const payload = userServices.verifyToken(token);

            if (payload.role !== 1) {
                res.status(403).json({
                    message: 'Forbidden, Access denied',
                });
                return;
            }

            const data = await userRepository.find(payload.id);

            // extract only username, email, role, rolename
            const user = {
                userName: data.userName,
                email: data.email,
                role: data.role,
                roleName: data.UserRole.roleName,
            };

            req.user = user;

            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({
                status: 'FAIL',
                message: 'Unauthorized',
            });
        }
    },
};
