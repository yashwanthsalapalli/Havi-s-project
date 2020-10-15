const Text=require('../models/Text');
const User = require('../models/User');

exports.viewDashboard=(req,res,next)=>{ 
    Text.find({creator:req.session.user._id})
    .then((texts)=>{
        res.render('dashboard',{user:req.session.user,texts})
    })  
    .catch(err=>{
        console.log(err);
        res.render('dashboard',{user:req.session.user,texts:[]})
    })
}

exports.addMessage=(req,res,next)=>{
    const text=new Text({
        message:req.body.message,
        creator:req.session.user._id
    });
    text.save()
    .then(()=>{
        console.log('Text created successfully');
        res.redirect('/dashboard');
    })
    .catch(err=>{
        console.log(err)
        res.redirect('/dashboard');
    })
}

exports.viewAdminPage=(req,res,next)=>{
    User.find({})
    .then((users)=>{
        req.session.users=users;
        req.session.texts=[];
        res.redirect('/showadmin');
    })
    .catch(err=>{
        req.session.texts=[];
        req.session.users=[];
        res.redirect('/showadmin');
        console.log(err);
    })
}

exports.getUserTexts=(req,res,next)=>{
    User.find({})
    .then((users)=>{
        Text.find({creator:req.params.userId})
        .then((texts)=>{
            console.log(texts)
            req.session.texts=texts;
            req.session.users=users;
            res.redirect('/showadmin');
        })
    })
    .catch(err=>{
        console.log(err);
        req.session.texts=[];
        req.session.users=[];
        res.redirect('/showadmin');
    })
}


exports.showAdmin=(req,res,next)=>{
    res.render('admin',{users:req.session.users,texts:req.session.texts});
}
