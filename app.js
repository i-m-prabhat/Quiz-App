const express = require('express');

const bodyParser = require('body-parser');

const indexRoute = require('./routes/indexRoute');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

/**
 * App.js level configurations
*/
app.set('view options', { pretty: true });
app.use(bodyParser.json())
app.set('json spaces', 4)
app.use(express.json());


/**
 * App.js level Routes middlewares
*/
app.use('/',indexRoute);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/admin',adminRoute);
app.use('/user',userRoute);
app.use('*',(req,res)=>{
    let fullUrl =  req.protocol + "://"+req.get('host') + req.originalUrl
   res.status(404).json({
     code : 404,
     status : false,
     message:"Endpoint "+req.originalUrl+" does not exist, please check /api docs",
     data:{
        fullUrl : fullUrl,
        method:"GET",
        endPoint : req.originalUrl,
        code : req.code,
        isSecure : (req.protocol == 'http') ? "false":"true",
     },
     error:false
   });
})

module.exports = app;