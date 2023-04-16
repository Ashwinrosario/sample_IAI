const express = require('express')
const router = express.Router()
const user = require('./schema')
const bcrypt  = require('bcrypt')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const JWT_SECRET = "ciwbuconciwevccwu1229238c/idb871cb91383hc}28vwrgbw8b748{62[]()68cwv";

router.post('/', async(req, res)=>{
    console.log('hello user')
    res.send('hello world')
})
//registering the user by adding the user details in the users collection in IAI db
//before storing in to the db the pass is hashed 

router.post('/register', async(req, res)=>{
    console.log('from register api',req.body)
    const {name, email, phonenumber, flag, flagname, position, password} = req.body;
    const encryptedPassword = await bcrypt.hash(password,10);

    try {
        const olduser =await user.findOne({email});
        if(olduser){
            res.json({
                status:200,
                message:"user already exist"
            })
        }
        else{
            const data = await new user({
                name:name,
                email:email,
                phonenumber:phonenumber,
                flag:flag,
                flagname:flagname,
                position:position,
                password:encryptedPassword
            })
            const result = data.save();
            if(result){
                res.json({
                    status:"success",
                    message:"inserted succesfully"
                })
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ashwinkaranthamalai@gmail.com',
                        pass: 'erwafncksdyciqvz'
                    }
                });
                
                var mailOptions = {
                    from: 'ashwinkaranthamalai@gmail.com',
                    to: email,
                    subject: 'Registeration Succesfull',
                    text: 'You are Succesfully Registered, Welcome to Industry Academy Interaction'
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
            else{
                res.json({
                    status:"success",
                    message:"error occured in insertion"
                })
            }
        }
        } catch (error) {
        console.log('error occured in catch of register',error)
        res.json({
            status:"failure",
            message:"error occured in insertion",
            data:"error occured"
        })
    }
})

// in login the details in the db is fetched and checked for the password and the home page redirected
router.post('/login',async(req, res)=>{
    const {email, password} = req.body;
    console.log('from login api', req.body)
    const olduser = await user.findOne({email});
    if(!olduser){
        res.send({
            status:"error",
            message:"user not registered"
        })
    }
    else{
        if(await bcrypt.compare(password, olduser.password)){
            const token = jwt.sign({email:olduser.email},JWT_SECRET);
            console.log('token',token);
            //need to set this token in local storage in the website;
            // window.localStorage.setItem('token', token);
            // window.location.href = "/loginpage";
            if(res.status(201)){
                return res.json({
                    status:"success",
                    data:token
                })
            }
            else{
                return res.json({
                    error:"error occured "
                })
            }
    }
    else{
        res.json({
            status:"error",
            error:"invalid password"
        })
    }   
}
})

router.post('/redirecthome', async(req, res)=>{
    const{token} = req.body;
    try {
        const check = jwt.verify(token, JWT_SECRET);
        console.log('checking check',check)
        console.log(check.email);
        user.findOne({email: check.email}).then((data)=>{
            res.send({
                status:"success",
                data:data
            })
        }).catch((err)=>{
            console.log('error occured in redirecthome', err);
            res.send({
                status:"error",
                data:"error"
            })
        });
    } catch (error) {
        console.log('error occured in catch of redirect to home', error);
    }
})

router.post('/forgetpassword', async(req, res)=>{
    // console.log('hi from the forget')
    const {email} = req.body;
    console.log(email)
    try {
        const olduser = await user.findOne({email})
        if(!olduser){
            return res.json({
                status:"error",
                error:"user not registered to update pssword"
            })
        }
        // const secret =  JWT_SECRET + olduser.password;
        const token = jwt.sign({email:olduser.email, id:olduser._id}, JWT_SECRET);
        const link = `http://localhost:6080/resetpassword/${olduser._id}/${token}`;
        console.log(link);
        res.send({
            link:link
        })
    } catch (error) {
        console.log('eror occured in forget password', error);
    }
}),

router.get('/resetpassword/:id/:token', async(req, res)=>{
    const {id, token} = req.params;
    console.log(req.params)
    const olduser =  await user.findOne({_id: id});
    if(!olduser){
        return res.json({
            status:"cannot update forget for person who are not yet registered"
        })
    }
    const secret = JWT_SECRET + olduser.password;
    try {
        console.log('hi')
        const just = jwt.verify(secret, token);
        console.log('from verify',just)
        console.log(' verified')
        res.render('forget', {email:just.email})
    } catch (error) {
        console.log('eroor occcured in token verification' ,error)
        res.send('not verified')
    }


})



module.exports = router