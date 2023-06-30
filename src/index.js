const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig')
const app = express();

const prepareAndStartServer = () => {



    app.listen(PORT,()=>{
        console.log(`server is running at port : ${PORT}`);
    });
}


prepareAndStartServer();