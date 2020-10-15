var express=require('express');
var router=express.Router();
const bcrypt = require('bcrypt')
var User=require('../models/User');

router.get('/login',(req,res)=>{
    res.render('login',{error:''});
})

router.post('/login',(req,res)=>{
    if(req.body.email=='admin@123.com' && req.body.password=='admin@123'){
        req.session.user={
            email:'admin@123.com'
        }
        res.redirect('/admin');
    }else{
        User.find({email:req.body.email},async (err,users)=>{
            if(err){
                console.log(err);
                res.render('login',{error:err})
            }else{
            
                if(users.length){
                    var presentUser=users[0];
                    if(await bcrypt.compare(req.body.password, presentUser.password)){
                        req.session.user=presentUser;
                        res.redirect('/dashboard');
                    }else{
                        res.render('login',{error:'Please enter the correct password'});
                    }
                }else{
                    res.render('login',{error:'There is no email registered as such'});
                }
            }
        })    
    }
})

router.get('/signup',(req,res)=>{
    res.render('signup',{error:''});
})

router.post('/signup',(req,res)=>{
    console.log(req.body);
    // res.render('signup',{error:''});
    if(req.body.email.length){
        if(req.body.password.length<=6){
            res.render('signup',{error:'Please enter a password of more than 6 characters'});
        }else if(req.body.password!=req.body.cpassword){
            res.render('signup',{error:'Please re-enter the correct password'});
        }
        else{
            User.find({email:req.body.email},async (err,users)=>{
                if(err){
                    console.log(err);
                    res.render('signup',{error:'MongoDB ERROR.Please try after sometime'})
                }else{
                    if(users.length){
                        res.render('signup',{error:'Already the email is registered'})
                    }else{
                        var newUser={...req.body};
                        delete newUser['cpassword'];
                        const hashedPassword = await bcrypt.hash(req.body.password, 10)
                        newUser['password']=hashedPassword;
                        const user=new User(newUser);    
                        user.save()
                        .then(()=>{
                            console.log('User saved successfully');
                            res.redirect('/login');
                        })
                        .catch((e)=>{
                            console.log('Error occured',e);
                            res.redirect('/signup');
                        })  
                    }
                }
            }) 
        }
    }else{
        res.render('signup',{error:'Please enter an email'});
    }
})

module.exports=router;
