var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoOp     =   require("./models/mongo");
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});


router.route("/patients")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        var db = new mongoOp();
        var response = {};
        db.first_name = req.body.first_name;
        db.last_name = req.body.last_name;
        db.dob = req.body.dob;
        db.age = req.body.age;
        db.phone_num = req.body.phone_num;
        db.gender = req.body.gender;
        db.status = req.body.status;
        db.patient_info = req.body.patient_info;
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        })
    });
router.route("/patients/:id")
    .get(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
            // we got data from Mongo.
            // change it accordingly.
                if(req.body.userEmail !== undefined) {
                    // case where email needs to be updated.
                    data.userEmail = req.body.userEmail;
                }
                if(req.body.userPassword !== undefined) {
                    // case where password needs to be updated
                    data.userPassword = req.body.userPassword;
                }
                // save the data
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        // find the data
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                mongoOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })
app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");



// var express     =   require("express");
// var app         =   express();
// var bodyParser  =   require("body-parser");
// var mongoOp     =   require("./models/mongo");
// var router      =   express.Router();
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({"extended" : false}));
//
// router.get("/",function(req,res){
//     res.json({"error" : false,"message" : "Hello World"});
// });
//
// router.route("/users")
//     .get(function(req,res){
//         var response = {};
//         mongoOp.find({},function(err,data){
//             if(err) {
//                 response = {"error" : true,"message" : "Error fetching data"};
//             } else {
//                 response = {"error" : false,"message" : data};
//             }
//             res.json(response);
//         });
//     })
//     .post(function(req,res){
//         var db = new mongoOp();
//         var response = {};
//         db.userEmail = req.body.email;
//         db.userPassword = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
//         db.save(function(err){
//             if(err) {
//                 response = {"error" : true,"message" : "Error adding data"};
//             } else {
//                 response = {"error" : false,"message" : "Data added"};
//             }
//             res.json(response);
//         });
//     });
//
// router.route("/users/:id")
//     .get(function(req,res){
//         var response = {};
//         mongoOp.findById(req.params.id,function(err,data){
//             if(err) {
//                 response = {"error" : true,"message" : "Error fetching data"};
//             } else {
//                 response = {"error" : false,"message" : data};
//             }
//             res.json(response);
//         });
//     })
//     .put(function(req,res){
//         var response = {};
//         mongoOp.findById(req.params.id,function(err,data){
//             if(err) {
//                 response = {"error" : true,"message" : "Error fetching data"};
//             } else {
//                 if(req.body.userEmail !== undefined) {
//                     data.userEmail = req.body.userEmail;
//                 }
//                 if(req.body.userPassword !== undefined) {
//                     data.userPassword = req.body.userPassword;
//                 }
//                 data.save(function(err){
//                     if(err) {
//                         response = {"error" : true,"message" : "Error updating data"};
//                     } else {
//                         response = {"error" : false,"message" : "Data is updated for "+req.params.id};
//                     }
//                     res.json(response);
//                 })
//             }
//         });
//     })
//     .delete(function(req,res){
//         var response = {};
//         mongoOp.findById(req.params.id,function(err,data){
//             if(err) {
//                 response = {"error" : true,"message" : "Error fetching data"};
//             } else {
//                 mongoOp.remove({_id : req.params.id},function(err){
//                     if(err) {
//                         response = {"error" : true,"message" : "Error deleting data"};
//                     } else {
//                         response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
//                     }
//                     res.json(response);
//                 });
//             }
//         });
//     })
//
// app.use('/',router);
//
// app.listen(3000);
// console.log("Listening to PORT 3000");
