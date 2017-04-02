var mongoose    =   require("mongoose");
mongoose.connect('mongodb://admin:admin@ds145790.mlab.com:45790/patientapp');
var mongoSchema =   mongoose.Schema;
var patientSchema  = {
    "first_name" : String,
    "last_name" : String,
    "age":Number,
    "dob":Date,
    "phone_num":Number,
    "gender":String,
    "status":Boolean,
    "patient_info":String
};
module.exports = mongoose.model('patients',patientSchema);;
