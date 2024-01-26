import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors"
import indexRoute from './routes/indexRoute.js';
import adminRoute from './routes/adminRoute.js';
import userRoute from "./routes/userRoute.js";
const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';


// app.use(bodyParser.urlencoded({ extended: false }));



/**
 * App.js level configurations
*/
app.set('view options', { pretty: true });
app.use(bodyParser.json())
app.set('json spaces', 4)
app.use(express.json());
app.use(cors("*"))


/**
 * App.js level Routes middlewares
*/
app.use('/', indexRoute);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('*', (req, res) =>
{
   console.log(req.method)
   let fullUrl = req.protocol + "://" + req.get('host') + req.originalUrl
   res.status(404).json({
      code: 404,
      status: false,
      message: "Endpoint " + req.originalUrl + " does not exist, please check /api docs",
      data: {
         fullUrl: fullUrl,
         method: req.method,
         endPoint: req.originalUrl,
         code: req.code,
         isSecure: (req.protocol == 'http') ? "false" : "true",
      },
      error: false
   });
})

export default app;