const express = require('express');
const controllers = require('../app/controllers');
const middlewares = require('../app/middlewares/authorization');
const cloudStorage = require('./cloudStorage');

const apiRouter = express.Router();

// cek current user

// authorization
apiRouter.post('/api/v1/login', controllers.api.v1.authController.login);

// Cars
apiRouter.post('/api/v1/cars', middlewares.authorizeAdmin, cloudStorage.single("carImage"), controllers.api.v1.carController.create);

// swaggerUI

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

// export router
module.exports = apiRouter;
