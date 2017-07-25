var exports = module.exports = {} ;

var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var connection = require('.././database/connect.js') ;
var bcrypt = require('bcrypt') ;
var generator = require('generate-password');

exports.insertUser = function(_json) {

    var user = schemas.user ;

    var _user = new user(_json) ;

    _user.save(function (err) {
        if (err) {
            console.log(_user.role + " could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted " + _user.role + ".") ;
        }
    }) ;

};

//other search templates could be added

exports.findUser = function(Id, callback) {

    var user = schemas.user;

    user.findOne({_id: Id}, function (err, doc) {
        if (err) {
            console.log("Error finding User.");
        }
        else if (!doc) {
            console.log("User not found.");
        }
        else {
            console.log("User found.") ;
            return callback(doc) ;
        }
    });
};

exports.insertProject = function(_json) {

    var project = schemas.project ;

    var project1 = new project(_json) ;

    project1.save(function (err) {
        if (err) {
            console.log("Project could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted project.") ;
        }
    });
};

exports.findProject = function(Id, callback) {

    var project = schemas.project;

    project.findOne({_id: Id}, function (err, doc) {
        if (err) {
            console.log("Error finding Project.");
        }
        else if (!doc) {
            console.log("Project not found.");
        }
        else {
            console.log("Project found.") ;
            return callback(doc) ;
        }
    });
};

// exports.encrypt = function(value, callback) {
//     return bcrypt.hashSync(value, 10)
//
// }

exports.encrypt = function(value, callback) {
    bcrypt.hash(value, 10, function(err, hash) {
        return callback(hash) ;
    });
};

exports.authenticate = function(user_id, password, callback) {
    console.log("Authenticate Running with user_id: "+user_id+" and password : "+password); //must remove
    module.exports.findUser(user_id, function(user) {
        console.log("User details "+user);  //must remove
        var hash = user.password;
        console.log("Hashed password found is : "+hash);
        bcrypt.compare(password, hash, function (err, res) {
            if (err) {
                console.log("Authentication error.") ;
                console.log(err) ;
            }
            console.log("authenticated: " + res);
            return callback(res);
        });
    })
};

exports.get_user = function(user_id, callback) {
    module.exports.findUser(user_id, function(user) {
        if (!user) {
            console.log("User not found.") ;
        }
        else {
            console.log(user.name + " found.") ;
            return callback(user) ;
        }
    })
};

//Functions made for testing purposes
//A function to statically create employees into the db
exports.create_test_employees = function() {
    console.log("creating a user");

    var today = new Date();
    module.exports.encrypt("test", function (enc_pass) {
        var emp = {
            _id: "emp1",
            name: "employee1",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee1@gmail.com",
            role: "System test",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };

        var emp2 = {
            _id: "emp2",
            name: "employee2",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee2@gmail.com",
            role: "System test",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };

        var emp3 = {
            _id: "emp3",
            name: "employee3",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee3@gmail.com",
            role: "System test",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };

        var emp4 = {
            _id: "emp4",
            name: "employee4",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee4@gmail.com",
            role: "System test",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };

        var emp5 = {
            _id: "emp5",
            name: "employee5",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee5@gmail.com",
            role: "System test",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };
        //dbs.remove({name: "Testy"});  /*THIS deletes all previous users in the db*/
        module.exports.insertUser(emp);
        module.exports.insertUser(emp2);
        module.exports.insertUser(emp3);
        module.exports.insertUser(emp4);
        module.exports.insertUser(emp5);
        console.log("employees added to data base")
    });
};

//A function to statically remove employees from the db
exports.remove_test_employees = function() {
    console.log("removing users");
    var user = schemas.user;
    user.remove({role: "System test"}, function (err, result) {
        if (err) {
            console.log("Error removing users.");
        }
        else if (!result) {
            console.log("database is empty.");
        }
        else {
            console.log("Users removed");
            console.log(JSON.stringify(result));
        }
    });
};


//A function to display the db in the terminal
exports.view_employees = function()
{
    console.log("viewing all employees in user db");
    var user = schemas.user;
    user.find(function (err, result) {
        if (err) {
            console.log("Error displaying users.");
        }
        else if (!result) {
            console.log("database is empty.");
        }
        else {
            console.log("employees found");
            console.log(JSON.stringify(result));
        }
    });
};

//A function to statically create projects into the db
exports.create_test_employees = function(_id, name, description, project_duration, owner_name, owner_contact, owner_email, manager_name, manager_contact, manager_email, employees_assigned) {
    console.log("creating project");

};

//A function to return the projects for a user
exports.get_role = function(user_id, callback) {
    module.exports.findUser(user_id, function(user) {
        if (!user) {
            console.log("User not found.") ;
        }
        else {
            console.log(user.role + " found.") ;
            return callback(user.role) ;
        }
    })
};

//A function to display a project