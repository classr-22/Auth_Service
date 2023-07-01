const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const db = require('./models/index');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json()); 
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,async()=>{
        console.log(`server is running at port : ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
        // const service = new UserService();
        // const newToken = service.createToken({email: 'sumit@admin.com', id:1});
        // console.log("new token is",newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bWl0QGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE2ODgxNDc5MTgsImV4cCI6MTY4ODE1MTUxOH0.mwEQuqaozU4bBxdC_FLbIL8NXOJSC_KN7xaUEEI4m3Q'
        // const response=service.verifyToken(token);
        // console.log(response);
    });
}


prepareAndStartServer();