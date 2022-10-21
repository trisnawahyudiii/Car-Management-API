const express = require('express');
const controllers = require('../app/controllers');
const middlewares = require('../app/middlewares/authorization');
const cloudStorage = require('./cloudStorage');

const apiRouter = express.Router();

// cek current user
apiRouter.get('/api/v1/currentuser', middlewares.authorize, controllers.api.v1.userController.currentUser);

// authorization
apiRouter.post('/api/v1/login', controllers.api.v1.authController.login);
apiRouter.post('/api/v1/register', controllers.api.v1.authController.register);
apiRouter.post('/api/v1/createAdmin', middlewares.authorizeSuperAdmin, controllers.api.v1.userController.registerAdmin);

// Cars
apiRouter.post('/api/v1/cars', middlewares.authorizeAdmin, cloudStorage.single('carImage'), controllers.api.v1.carController.create);
apiRouter.put('/api/v1/updateCar/:id', middlewares.authorizeAdmin, cloudStorage.single('carImage'), controllers.api.v1.carController.update);
apiRouter.get('/api/v1/cars', controllers.api.v1.carController.list);
apiRouter.delete('/api/v1/cars/:id', middlewares.authorizeAdmin, controllers.api.v1.carController.delete);

// swaggerUI OpenAPI

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

// export router
module.exports = apiRouter;
