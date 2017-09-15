/**
 * Created by Jordan on 21-Jul-17.
 */
var exports = module.exports = {};

var schemas = require('.././database/schemas.js');
var dbs = require('.././database/dbs.js');

/* TODO : find employees which are free for the current duration */
/* TODO : find employees which have the correct skills */
/* TODO : add how long an employee has not been working to employee_list */
exports.get_unallocated_users = function (skills, start_date, end_date, budget, callback) {
    console.log("unallocated users requested");
    console.log("skills : " + skills);
    console.log("start date : " + start_date);
    console.log("end date : " + end_date);
    console.log("budget : " + budget);
    var user = schemas.user;

    console.log("Finding relevant employees");
    user.find({current_projects: [], role: "Employee", }, function (err, result) {
        if (err) {
            console.log("Error finding employees.");
        }
        else if (!result) {
            console.log("employees not found.");
        }
        else {
            console.log("Creating employee lists");
            //we make 1 list for each skill
            //all employees who have that skill are added to the list
            var employee_lists = {};
            var skills_count = [skills.length];
            for(var loop = 0; loop < skills.length; loop++)
            {
                skills_count[loop] = 0;
                employee_lists[loop] = {};
            }
            for(var loop = 0; loop < Object.keys(result).length; loop++)
            {
                var new_json_obj = {
                    _id: result[loop]._id,
                    name: result[loop].name,
                    surname: result[loop].surname,
                    position: result[loop].position,
                    employment_length: result[loop].employment_length,
                    rate: result[loop].rate,
                    skill: result[loop].skill,
                    past_projects: result[loop].past_projects
                };
                //for every skill tag
                for(var loop2 = 0; loop2 < Object.keys(skills).length; loop2++)
                {
                    //for every skill the employee has
                    for(var loop3 = 0; loop3 < result[loop].skill.length; loop3++)
                    {
                        //if the employee has the skill
                        if(result[loop].skill[loop3].name == skills[loop2])
                        {
                            //add them to that skills list
                            employee_lists[loop2][skills_count[loop2]] = new_json_obj;
                            skills_count[loop2]+=1;
                        }
                    }
                }
            }
            //console.log(return_json);
            console.log("Evaluating relevant employees");
            /* We evaluate each employee in each skill list */

            /* NOTE The employees with the highest scores, have the highest chance to get
            *  chosen for the team */
            //for each employee
            /*for(var loop = 0; loop < Object.keys(employee_list).length; loop++)
            {
                //Add an employee_value attribute to each employee in the list
                employee_list[loop].value = 0;

                //give a score to how long they have not been working for HIGH WEIGHTING APPLIED

                //give a score to employees who have worked on past projects with
            }*/
            return callback(employee_lists);
        }
    });
};