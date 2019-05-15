let bcrypt = require('bcrypt');
let nodemailer = require('nodemailer');
let request = require('request');
let User = require('../models/User');
let async=require('async');
var express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const multer = require('multer');
const DIR = './uploads';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

var router = express.Router();
exports.signUp = async (req, res) => {
    try {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let password = req.body.password;
        let mobilenumber = req.body.mobilenumber;
        let gender = req.body.gender;
        let city = req.body.city;
        let state = req.body.state;
        if (!firstname) {
            return res.status(400).json({
                code: 400,
                message: 'First name is required',
                data: []
            });
        }
        else if (!lastname) {
            return res.status(400).json({
                code: 400,
                message: 'Last name is required',
                data: []
            });
        }
        else if (!email) {
            return res.status(400).json({
                code: 400,
                message: 'Email is required',
                data: []
            });
        }
        else if (!password) {
            return res.status(400).json({
                code: 400,
                message: 'Password is required',
                data: []
            });
        }
        else if(!mobilenumber){
            return res.status(400).json({
                code : 400,
                message : 'mobilenumber is required',
                data : []
            });
        }
        else if(!gender){
            return res.status(400).json({
                code : 400,
                message : 'gender is required',
                data : []
            });
        }
        else if(!state){
            return res.status(400).json({
                code : 400,
                message : 'state is required',
                data : []
            });
        }
        else if(!city){
            return res.status(400).json({
                code : 400,
                message : 'city is required',
                data : []
            });
        }
        else {
            let user = await User.findOne({ email: email });
            if (user) {
                return res.status(400).json({
                    code: 400,
                    message: 'Try with new email,user already exists',
                    data: []
                });
            }
            else {
                createNewUser();
            }
            async function createNewUser() {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                const activationnumber = Math.floor((Math.random() * 546795) + 54);
                const newUser = new User({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    mobilenumber : mobilenumber,
                    gender:gender,
                    city: city,
                    state :state,
                    salt: salt,
                    hash: hashed,
                    activationnumber: activationnumber,


                });
                let newuser = await newUser.save();
                if (!newuser) {
                    return res.status(400).json({
                        code: 400,
                        message: 'Error in creating user profile',
                        data: []
                    });
                }
                else {
                    let link = `http://localhost:3000/api/users/verifyaccount?activationnumber=${activationnumber}&email=${email}`;
                    //  NodeMailer : To send email
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'dheerajkarki27@gmail.com',
                            pass: 'dheeraj@dit123'
                        }
                    });
                    let mailOptions = {
                        from: 'dheerajkarki27@gmail.com',
                        to: email,
                        subject: ' application activation link',
                       
                        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify your account.</a>"
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            console.log('Email not sent...error');
                        }
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    
                    return res.status(200).json({
                        code: 200,
                        message: 'Your account has been created successfully.Now click on the link sent in email to verify your account',
                        data: []
                    });
                }
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: 'Something went wrong,Try after sometime',
            data: []
        })
    }
}


/////set password/////
exports.setPassword = async (req, res) => {
    try {
        // console.log(req.body, '----------------->>>>>>>>>>>');
        let email = req.body.email;
        let activationnumber = req.body.activationnumber;

        let user = await User.findOne({ email: email, isdeleted: false, activationnumber: activationnumber });
        if (user) {
            console.log(user.activationnumber, ' ----->>');
            return res.status(200).json({
                code: 200,
                message: "Set new password now",
                data: []
            });
        }
        else {
            return res.status(401).json({
                code: 401,
                message: 'Unauthorized access',
                data: []
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: 'Something went wrong,Try after sometime',
            data: []
        })
    }
}

exports.postSetPassword = async (req, res) => {
    try {
        // console.log(req.body,'=======>>>>>');
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({ email: email, isdeleted: false });
        if (user) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const activationnumber = Math.floor((Math.random() * 546795) + 54);
            let updateuser = await User.findOneAndUpdate({ email: email, isdeleted: false }, { $set: { salt: salt, hash: hash, activationnumber: activationnumber, isverified: true } });
            if (updateuser) {
                const token = user.generateAuthToken();
                return res.header('x-auth-token', token).json({
                    code: 200,
                    message: 'User signin success',
                    data: user,
                    token: token
                });
            }
            else {
                return res.status(404).json({
                    code: 404,
                    message: 'Error in creating password',
                    data: []
                });
            }
        }
        else {
            return res.status(404).json({
                code: 404,
                message: 'Email not found',
                data: []
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: 'Something went wrong,Try after sometime',
            data: []
        })
    }
}

/////verify email///////
exports.verifyAccount = async (req, res) => {
    try {
        let email = req.query.email;
        let activationnumber = parseInt(req.query.activationnumber);
        if (!email) {
            return res.status(400).json({
                code: 400,
                message: "Email cannot be blank",
                data: []
            });
        }
        if (!activationnumber) {
            return res.status(400).json({
                code: 400,
                message: "Activation number cannot be blank",
                data: []
            });
        }
        let verifyuser = await User.findOneAndUpdate({ email: email, activationnumber: activationnumber, isdeleted: false }, { $set: { isverified: true, activationnumber: null } });
        if (verifyuser) {
            return res.status(200).json({
                code: 200,
                message: 'Your account is now verified by email.Just login to the website now',
                data: []
            });
        }
        else {
            return res.status(400).json({
                code: 400,
                message: 'Something went wrong,Error in account verification',
                data: []
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: 'Something went wrong,Try after sometime',
            data: []
        })
    }
}

//////////login/////////////////////

exports.signIn = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email) {
            return res.status(400).json({
                code: 400,
                message: 'Email cannot be blank',
                data: []
            });
        }
        else if (!password) {
            return res.status(400).json({
                code: 400,
                message: 'Password cannot be blank',
                data: []
            });
        }
        else {
            let user = await User.findOne({ email: email, isdeleted: false });
            if (user) {
                if (user.provider == 'local') {
                    if (user.isverified) {
                        bcrypt.compare(password, user.hash, (err, result) => {
                            if (result) {
                                
                                if (user.isactivated) {
                                    const token = user.generateAuthToken();
                                    return res.header('x-auth-token', token).json({
                                        code: 200,
                                        message: 'User signin success',
                                        data: user,
                                        token: token
                                    });
                                }
                                else {
                                    return res.status(401).json({
                                        code: 401,
                                        message: 'Your account is deactivated,please contact admin',
                                        data: []
                                    });
                                }
                            }
                            else {
                                return res.status(401).json({
                                    code: 401,
                                    message: 'Invalid Password',
                                    data: []
                                });
                            }
                        });
                    }
                    else {
                        return res.status(401).json({
                            code: 401,
                           message: 'Your account is not verified by email.Just verify your email now',
                            data: []
                        });
                    }
                }
                if (user.provider == 'google') {
                    return res.status(422).json({
                        code: 422,
                        message: "Email registered with Google.Try using 'Login with Google' ",
                        data: []
                    });
                }
            }
            else {
                return res.status(404).json({
                    code: 404,
                    message: 'Email not found.Try login using a valid email address',
                    data: []
                });
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: 'Something went wrong,Try after sometime',
            data: []
        });
    }
}

//forgot password///////
exports.forgotPassword = async (req, res) => {
    try {
        console.log(req.body, '  00000====');
        let email = req.body.email;
        if (!email) {
            return res.status(404).json({
                code: 404,
                message: 'Email cannot be blank',
                data: []
            });
        }
        const activationnumber = Math.floor((Math.random() * 484216) + 54);
        let user = await User.findOne({ email: email, isdeleted: false });
        if (user) {
            let updateuser = await User.findOneAndUpdate({ email: email, isdeleted: false }, { $set: { activationnumber: activationnumber } });
            if (updateuser) {
                let link = `http://localhost:4500/users/setpassword?activationnumber=${activationnumber}&email=${email}`;
               let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'dheerajkarki27@gmail.com',
                        pass: 'dheeraj@dit123'
                    }
                });
                let mailOptions = {
                    from: 'dheerajkarki27@gmail.com',
                    to: email,
                    subject: ' application forgot password link',
                    
                    html: "Hello,<br> Please Click on the link to reset your password.<br><a href=" + link + ">Click here to reset password of your account.</a>"
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        console.log('Email not sent...error');
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                return res.status(200).json({
                    code: 200,
                    message: 'Check your email and reset your password now',
                    data: []
                });
            }
            else {
                return res.status(404).json({
                    code: 404,
                    message: 'Email not found22',
                    data: []
                });
            }
        }
        else {
            return res.status(404).json({
                code: 404,
                message: 'Email not found44',
                data: []
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: 'Something went wrong,Try after sometime',
            data: []
        })
    }
}


exports.findAllUser = (req, res) => {
    try {
        User.find()
            .then(result => {
                
                var userResponse = {
                    message: "success",
                    userId: 0,
                    statusCode: 200,
                    data: result
                }
                return res.status(200).send({ userResponse });
            })
    } catch (error) {
        var userResponse = {
            message: "error",
            userId: 0,
            statusCode: 500,
            data: null
        }
        return res.status(500).send({ userResponse });
    }

};


exports.getMyProfile = async (req,res)=>{
    try{
        
        let loggedInUser = req.user._id;
        let user = await User.findOne({_id : loggedInUser, isdeleted : false})
        if(user){
            return res.status(200).json({
                code : 200,
                message : 'User profile found',
                data : user
            });
        }
        else{
            return res.status(404).json({
                code : 404,
                message : 'User profile not found',
                data : []
            });
        }
    } catch(err){
        console.error(err);
        return res.status(500).json({
            code : 500,
            message : 'Something went wrong,Try after sometime',
            data : []
        })
    }
}

exports.editUser = async (req,res)=>{
   
    try{
        let loggedInUser = req.user._id;
        let user = await User.findOne({ _id : loggedInUser , isdeleted : false });
        if(user){
            let email = req.body.email;
            
            
            let edituser = req.body;
           let updateuser = await User.findOneAndUpdate({ email : email, isdeleted : false },{ $set : edituser },{new : true} );
            if(updateuser){
               
                return res.status(200).json({
                    code : 200,
                    message : 'User updated successfully',
                    data : []
                });
            }
            else{
                return res.status(404).json({
                    code : 404,
                    message : 'User email not found',
                    data : []
                });
            }
        }
        else{
            return res.status(404).json({
                code : 404,
                message : 'Error.You are not a valid user',
                data : []
            });
        }
    } catch(err){
        console.error(err);
        return res.status(500).json({
            code : 500,
            message : 'Something went wrong in editing user,Try after sometime',
            data : []
        });
    }
}

///////delete user by id ///////

exports.deleteUser = async(req, res) => {
    User.findOneAndRemove({ _id : req.query.id })
         .then(result => {
             User.find({}).then(resx => {
                 
                return res.status(200).json({ 
                message: "success",
               statusCode: 200,
                userData: resx });
                 
             })
             
         }).catch(err => {
             //API return type (response format)
             return res.status(500).send({ 
            message: "Something went wrong in editing user,Try after sometime",
             statusCode: 500,
             userData: nullrResponse 
            });
            
            
         });
 }
 