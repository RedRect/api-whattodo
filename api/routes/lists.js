const express = require('express');
const router  =  express.Router();
const mongoose = require('mongoose');

const List = require('../models/list');

/**
 * handle incomong requests to todo list
 */
router.get('/', (req,res,next) => {
    List.find()
        .exec()
        .then(lists =>{
            console.log("From db",lists);
            if (lists.length >= 0 ){
                res.status(200).json(lists);
            }
            else{
                res.status(200).json({
                    message: 'No entry'
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    // res.status(200).json({
    //
    //    message: 'Get request'
    // });
});

router.get('/:listId', (req,res,next) => {
    const id =  req.params.listId;
    List.findById(id)
        .exec()
        .then(list => {
            console.log("From db", list);
            if(list){
                res.status(200).json(list);
            }
            else{
                res.status(404).json({
                    message: 'No valid entry found for list id'
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })


});

router.post('/', (req,res,next) => {

    const list = new List({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        subtitle: req.body.subtitle,
        date: req.body.date,
        todos: req.body.todos,
        checked: req.body.checked,

    });
    list
        .save()
        .then(result =>{
            console.log(result);
            res.status(201).json({

                message: 'Post request',
                created: list
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


});

router.patch('/:listId', (req,res,next) => {
    const id =  req.params.listId;

    // const updateOps = {};
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // }

    const props = req.body;

    List.update({_id: id}, props)
        .exec()
        .then( result => {
            console.log("Updated", result);
            res.status(200).json(result);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });



});

router.delete('/:listId', (req,res,next) => {
    const id =  req.params.listId;
    List.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });

});

module.exports = router;