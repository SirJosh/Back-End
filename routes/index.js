var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var dbs = require('.././database/dbs.js') ;
var algorithm = require('.././database/Resource-Alocation-Algorithm.js');
var generator = require('generate-password');


function login_check(req, res, next) {
    var result=dbs.authenticate(req.body.username,req.body.password,function (result) {
        if(result)
        {
            return next();
        }
        else
        {
            res.redirect('/');
        }
    });
}

function isAuntenticated(req,res,next) {
    var result=dbs.authenticate(req.session.username,req.body.session,function (result) {
        if(result)
        {
            return next();
        }
        else
        {
            res.redirect('/');
        }
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/dashboard',login_check,function (req,res,next) {
    req.session.username=req.body.username;
    req.session.password=req.body.password;
    res.render('admin');
});

router.get("/project_creation",isAuntenticated,function (req,res,next) {
    res.render('project_creation');
});

router.post("/project_creation",isAuntenticated,function (req,res,next) {
    res.render('index',{projectname:req.body.projectname,projectdescription:req.body.projectdescription,skills:req.body.skills});

});

router.get('/test-find', function(req, res, next) {
    dbs.findEmployee('emp_id_123') ;
});

//Easy access to project creation page
router.get('/test_project_creation', function(req, res, next)
{
    res.render('project_creation');
});

router.get('/test_algorithm', function(req, res, next) {
    console.log("employee allocation requested");
    console.log("the request url is "+req.url);
    //algorithm.create_test_employees();
    algorithm.view_employees()
    algorithm.get_unallocated_users(2, function(val) {
        var result = JSON.stringify(val);
        res.send(result);
    });
    res.contentType('application/json');
});

router.get('/admin',isAuntenticated,function (req,res,next) {
    res.render("admin");
});

router.post('/register_employee',function (req,res,next) {
    var rand_password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    var today = new Date();

    var enc_pass=dbs.encrypt(rand_password,function (enc_pass) {
        var emp = {
            _id: req.body.empid,
            name: req.body.firstname,
            surname: req.body.lastname,
            password:enc_pass ,
            password_date: today,
            email: req.body.email,
            role: req.body.role,
            employment_length: req.body.emp_length,
            skill: [req.body.skills],
            past_projects:[req.body.pastprojects]} ;

        dbs.insertUser(emp) ;
        res.render('index',{valu:JSON.stringify(emp),rand:rand_password});
    });


   //Pass: :-_fBNet/R
    //u: S_D
});

router.get("/logout",function (req,res,next) {
    req.session.reset();
    res.redirect('/');
});
module.exports = router;
