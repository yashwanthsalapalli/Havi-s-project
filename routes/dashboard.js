var express=require('express');
var router=express.Router();

var DashboardController=require('../controllers/dashboard');


function checkUserIsLoggedIn(req,res,next){
    if(req.session.user==undefined){
        res.redirect('/login');
    }else{
        next()
    }
}


router.get('/dashboard',checkUserIsLoggedIn,DashboardController.viewDashboard)

router.post('/addmessage',checkUserIsLoggedIn,DashboardController.addMessage);

router.get('/admin',checkUserIsLoggedIn,DashboardController.viewAdminPage);

router.get('/getTexts/:userId',checkUserIsLoggedIn,DashboardController.getUserTexts);

router.get('/showadmin',checkUserIsLoggedIn,DashboardController.showAdmin);

module.exports=router;