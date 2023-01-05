const db=require('../models/index')
const multer = require("multer");
const fs = require("fs");
const path = require("path");
let uploadPath = "";
let storage;
let imageName;
imageDbpath = [];
 

exports.CreateDirectory = async (req, res, next) => {
    const DirName = req.body.dirname;
    uploadPath = `public/profile/${DirName}/`;
    try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
        res.send({
          status: "Ok",
          message: "Directory Created successfully!",
        });
      } else {
        res.send({
          status: "Ok",
          message: "Already exists!",
          Directory: uploadPath,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  storage = multer.diskStorage({
    destination: function (req, _file, cb) {
      cb(null, `${uploadPath}`);
    },
    filename: function (req, file, cb) {
      imageName = Date.now() + "-" + file.originalname;
      cb(null, imageName);
      imageDbpath = uploadPath + imageName;
      console.log("upload file path:-", imageDbpath);
    },
  });
  
  exports.upload = multer({ storage: storage });
  
  exports.FileUpload = async (req, res, next) => {
    res.send({
      status: "Ok",
      message: "upload file successfully!",
    });
  };
  


exports.get=async(req,res)=>{
    try {
        
        const data=await db.tbl_user.findAll().then(result=>{
            res.send({
                status:200,
                message:'fetch all records successfully!',
                data:result
            })
        })

    } catch (error) {
        res.send({
            status:500,
            message:`Error:${error.message}`
            
        })
    }
}
exports.create=async(req,res)=>{
    try {
        let x=imageName.replace(" ","-")
        const create={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            image:imageDbpath
        }
        console.log('post',imageDbpath.length)
        const data=await db.tbl_user.create(create).then(result=>{
            res.send({
                status:200,
                message:'user created successfully!',
                data:result
            })
        })

    } catch (error) {
        res.send({
            status:500,
            message:`Error:${error.message}`            
        })
    }
}

exports.userDelete=async(req,res)=>{
    try {
    const {id}=req.query 
    console.log('delete',id)
    const data=await db.tbl_user.destroy({
        where:{
            id:id
        }
    }).then(result=>{
        res.send({
            status:200,
            message:'user delete successfully!',
            data:result
        })
    })
    
    } catch (error) {
         res.send({
            status:500,
            message:`Error:${error.message}`            
        })
    }
}

