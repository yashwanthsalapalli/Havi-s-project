const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const session=require('express-session');
const app=express();

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({ 
    secret: 'keyboard cat',
    resave:true,
    saveUninitialized:true
}));

app.use(cors());

const uri='mongodb://yashwanth:yash123@ds137102.mlab.com:37102/yashwanth'
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection established successfully');
})

var authRouter=require('./routes/auth');
var dashboardRouter=require('./routes/dashboard');

app.use('/',(authRouter));
app.use('/',dashboardRouter);

app.get('/',(req,res)=>{
    res.redirect('/login');
})

app.get('/yashwanth',(req,res)=>{
    res.send('hello from yash');
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

app.get('*',(req,res)=>{
    res.redirect('/logout');
})


var portNumber=process.env.PORT || 5000;

//hosting
app.listen(portNumber,()=>{
    console.log('Server is started on : '+portNumber);
})

