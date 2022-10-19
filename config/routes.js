const express = require('express');
const controllers = require('../app/controllers');
const middlewares = require('../app/middlewares/authorization');

const apiRouter = express.Router();

// cek current user

// authorization

// Cars
apiRouter.post(
    '/api/v1/cars',
    // middleware here,
    controllers.api.v1.carController.create
);

// swaggerUI

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

// export router
module.exports = apiRouter;
