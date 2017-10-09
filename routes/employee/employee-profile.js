/**
 * Created by Seonin David on 2017/09/02.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

router.get("/get_emp", function (req, res, next) {
    dbs.findUsers("_id", req.session.username, function (user) {
        res.send(user);
    });
});


router.get("/get_emp_task", function (req, res, next) {
    dbs.findTasks("employees_assigned", req.session.username, function (tasks) {
        res.send(tasks);
    });
});

router.get("/get_emp_milestone", function (req, res, next) {
    dbs.findUsers("_id", req.session.username, function (user_id) {
        dbs.findMilestones("project_id", user_id[0].current_projects[0], function (milestones) {
            res.send(milestones);
        });
    });
});

router.get("/get_user_past_projects",function(req,res,next){
    dbs.findUsers("_id",req.session.username,function(user_data){

        let past_project_ids = user_data[0].past_projects;
        dbs.get_past_projects(past_project_ids,function (past_projects) {
            res.send(past_projects);
        });

    });

});

router.get("/store_image", function (req, res, next) {
    res.send(req.param("pic"));
});

module.exports = router;