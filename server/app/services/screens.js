import mongoose from 'mongoose';
import Screens from '../models/screens';
import screenSeed  from '../seed/screenSeed.js';
import status from 'statuses';
import async from 'async';

/**
 * API's for further enhancement of features
 */

export const getScreens = async (req, res) => {
    
    const { movieID } = req.params || req.query;

    if(!movieID) {
        res.status(400).send(status[400]);
        return;
    }

    Screens.find({ movieID }, (err, screens) => {

        if(err || !screens) {
            res.status(500).send(err);
            return;
        }

        res.status(200).send(screens);
    });
}

export const createScreens = (req, res) => {

    const { movieID } = req.body;
    
    if(!movieID){
        res.status(400);
        return;
    } 

    let newScreens = [];


    async.each(screenSeed, (screen, cb) => {
        let cloneScreen = {...screen, movieID: mongoose.Types.ObjectId(movieID) };
        const Screen = new Screens(cloneScreen);
        Screen.save((err, newScreen) => {
            if (err || !newScreen) {
                return cb(err);
            }
            newScreens = [...newScreens, ...[newScreen]]
            return cb();
        });
    }, (err) => {

        if(err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).send(newScreens);
    });
}
