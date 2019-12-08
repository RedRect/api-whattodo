const express =  require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//
const listRouter =  require('./api/routes/lists');

mongoose.connect('mongodb+srv://whatododb:'+process.env.MONGO_DB_PW +'@whatodo-nnb4n.gcp.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Prevent CORS error
app.use((req,res,next) =>{
    res.header("Access-Control-Allow", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,DELETE')
        return res.status(200).json({});
    }
    next();
});

app.use('/lists' , listRouter);

app.use((req,res,next) =>{
    const error =  new Error('Not found');
    error.status = 404;
    next(error);

})

app.use((error, req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

});

module.exports = app;