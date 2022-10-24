var express = require("express");
var router = express.Router()

const credentials = {
    email:"sai@gmail.com",
    password:"sai@1234"
}



//Login
router.post('/login',(req,res)=> {
    if(req.body.email==credentials.email && req.body.password == credentials.password)
    {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login success")
    }
    else {
        res.end("Inavalid credentials")
    }
});

//dashboard
router.get('/dashboard',(req,res) =>
{
    if(req.session.user)
    {
        res.render('dashboard',{user:req.session.user})
    }
    else{
        res.send("Unauthorized user")
    }
})

//Logout
router.get('/logout',(req,res) =>
{
    req.session.destroy(function(err)
    {
        if(err) {
        console.log(err);
        res.send("Error")
        } else{
            res.render('home',{title:"Express",logout:"Logout success"})
        }
    })
})

module.exports=router;