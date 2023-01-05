const express = require('express')
const router = express()
const userController=require('../controllers/userControllers')

router
    .post('/user/create',userController.create)
    .get('/user/get',userController.get)
    .delete('/user/delete',userController.userDelete)
    .post(`/user/upload`,userController.upload.array('images')) 
    .post('/user/create/directory',userController.CreateDirectory)
module.exports=router