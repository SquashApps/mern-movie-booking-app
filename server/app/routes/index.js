import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

exports = module.exports = () => {

    const router = express();

    // enable CORS for all request
    router.use(cors());

    // Body parser
    router.use(bodyParser.json({
        limit: '10mb'
    }));

    // parse application/x-www-form-urlencoded
    router.use(bodyParser.urlencoded({ extended: false }))
 
    router.use('/movies', require('./movies.js')());
    
    return router;
}